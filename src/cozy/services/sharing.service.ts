import { Injectable } from '@angular/core';

import { ApiService } from 'jslib/abstractions/api.service';
import { CryptoService } from 'jslib/abstractions/crypto.service';
import { I18nService } from 'jslib/abstractions/i18n.service';
import { PlatformUtilsService } from 'jslib/abstractions/platformUtils.service';
import { UserService } from 'jslib/abstractions/user.service';

import { BroadcasterService } from 'jslib/angular/services/broadcaster.service';

import { OrganizationUserStatusType } from 'jslib/enums/organizationUserStatusType';
import { OrganizationUserType } from 'jslib/enums/organizationUserType';

import { OrganizationUserConfirmRequest } from 'jslib/models/request/organizationUserConfirmRequest';
import { OrganizationUserUserDetailsResponse } from 'jslib/models/response/organizationUserResponse';

import { Utils } from 'jslib/misc/utils';

import { Q } from 'cozy-client';

import { CozyClientService } from '../services/cozy-client.service';

export interface User {
    name: string;
    id: string;
    email: string;
    publicKey: string;
    fingerprint: string[];
    fingerprintPhrase: string;
}

// interface from cozy-sharing
interface SharinRecipientEmail {
    address: string;
    primary: boolean;
}

// interface from cozy-sharing
interface SharinRecipient {
    email: SharinRecipientEmail[];
}

@Injectable({ providedIn: 'root' })
export class SharingService {
    constructor(
        protected apiService: ApiService,
        protected broadcasterService: BroadcasterService,
        protected clientService: CozyClientService,
        protected cryptoService: CryptoService,
        protected i18nService: I18nService,
        protected platformUtilsService: PlatformUtilsService,
        protected userService: UserService
    ) {}

    async loadOrganizationUsersToBeConfirmed(organizationId: string) {
        const invitedUsers = await this.loadAcceptedUsersForOrganization(organizationId);

        const finalUsers: User[] = [];
        for (const user of invitedUsers) {
            const publicKey = (await this.apiService.getUserPublicKey(user.id)).publicKey;

            const fingerprint = await this.cryptoService.getFingerprint(user.id, Utils.fromB64ToArray(publicKey).buffer);

            finalUsers.push({
                name: user.name,
                id: user.id,
                email: user.email,
                publicKey: publicKey,
                fingerprint: fingerprint,
                fingerprintPhrase: fingerprint.join('-'),
            });
        }

        return finalUsers;
    }

    async loadAllUsersToBeConfirmed(): Promise<User[]> {
        const organizationsWithoutCozy = await this.getSharedOrganizations();

        const users: OrganizationUserUserDetailsResponse[] = [];
        for (const organization of organizationsWithoutCozy) {
            const organizationUsers = await this.apiService.getOrganizationUsers(organization.id);

            users.push(...organizationUsers.data);
        }

        const uniqueUsers = users.filter((value, index, self) => {
            return self.findIndex(element => element.id === value.id) === index;
        });

        const currentUserId = await this.userService.getUserId();
        const uniqueUsersToBeConfirmed = uniqueUsers.filter(user => {
            return user.type === OrganizationUserType.User
                && user.status === OrganizationUserStatusType.Accepted
                && user.id !== currentUserId;
        });

        const finalUsers: User[] = [];
        for (const user of uniqueUsersToBeConfirmed) {
            const publicKey = (await this.apiService.getUserPublicKey(user.id)).publicKey;

            const fingerprint = await this.cryptoService.getFingerprint(user.id, Utils.fromB64ToArray(publicKey).buffer);

            finalUsers.push({
                name: user.name,
                id: user.id,
                email: user.email,
                publicKey: publicKey,
                fingerprint: fingerprint,
                fingerprintPhrase: fingerprint.join('-'),
            });
        }

        return finalUsers;
    }

    async loadAcceptedUsersForOrganization(organizationId: string) {
        const organizationUsers = await this.apiService.getOrganizationUsers(organizationId);

        const currentUserId = await this.userService.getUserId();

        const isOwner = organizationUsers.data.find(user => {
            return user.type === OrganizationUserType.Owner
                && user.id === currentUserId;
        });

        if (!isOwner) {
            return [];
        }

        const invitedUsers = organizationUsers.data.filter(user => {
            return user.type === OrganizationUserType.User
                && user.status === OrganizationUserStatusType.Accepted
                && user.id !== currentUserId;
        });

        return invitedUsers;
    }

    async autoConfirmTrustedUsers(organizationId: string, recipientsToConfirm: SharinRecipient[]) {
        const trustedUsers = await this.loadTrustedUsers();

        const recipientsToConfirmEmails = recipientsToConfirm
            .map(recipient => recipient.email.find(email => email.primary === true)?.address);

        const trustedUsersToConfirm = trustedUsers.filter(user => recipientsToConfirmEmails.includes(user.email));

        for (const trustedUserToConfirm of trustedUsersToConfirm) {
            const orgKey = await this.cryptoService.getOrgKey(organizationId);
            const key = await this.cryptoService.rsaEncrypt(orgKey.key, Utils.fromB64ToArray(trustedUserToConfirm.publicKey).buffer);
            const request = new OrganizationUserConfirmRequest();
            request.key = key.encryptedString;

            await this.apiService.postOrganizationUserConfirm(organizationId, trustedUserToConfirm.id, request);
        }
    }

    async confirmUser(user: User) {
        const organizationsWithoutCozy = await this.getSharedOrganizations();

        for (const organization of organizationsWithoutCozy) {
            const organizationUsers = await this.apiService.getOrganizationUsers(organization.id);

            const userInOrganization = organizationUsers.data
                .filter(organizationUser => organizationUser.status === OrganizationUserStatusType.Invited || organizationUser.status === OrganizationUserStatusType.Accepted)
                .map(organizationUser => organizationUser.id)
                .includes(user.id);

            if (userInOrganization) {
                const orgKey = await this.cryptoService.getOrgKey(organization.id);
                const key = await this.cryptoService.rsaEncrypt(orgKey.key, Utils.fromB64ToArray(user.publicKey).buffer);
                const request = new OrganizationUserConfirmRequest();
                request.key = key.encryptedString;

                await this.apiService.postOrganizationUserConfirm(organization.id, user.id, request);
            }
        }

        this.broadcasterService.send({command: 'confirmedUser', userId: user.id});
    }

    async rejectUser(user: User) {
        try {
            const client = this.clientService.GetClient();

            await client.stackClient.fetchJSON(
                'DELETE',
                `/bitwarden/contacts/${user.id}`,
                []
            );
        } catch {
            this.platformUtilsService.showToast('error', this.i18nService.t('errorOccurred'),
                this.i18nService.t('unexpectedError'));
        }
    }

    protected async getSharedOrganizations() {
        const organizations = await this.userService.getAllOrganizations();

        const ownedOrganization = organizations.filter(organization => organization.isOwner);

        const organizationsWithoutCozy = ownedOrganization.filter(organization => organization.name !== 'Cozy');

        return organizationsWithoutCozy;
    }

    protected async loadTrustedUsers() {
        const queryDefinition = Q('com.bitwarden.contacts')
            .select(['email', 'public_key', 'confirmed'])
            .where({confirmed: true})
            .indexFields(['confirmed']);

        const { data } = await this.clientService.GetClient().query(queryDefinition);

        const trustedUsers: User[] = [];
        for (const user of data) {
            const publicKey = user.public_key;

            const fingerprint = await this.cryptoService.getFingerprint(user.id, Utils.fromB64ToArray(publicKey).buffer);

            trustedUsers.push({
                name: user.email,
                id: user.id,
                email: user.email,
                publicKey: publicKey,
                fingerprint: fingerprint,
                fingerprintPhrase: fingerprint.join('-'),
            });
        }

        return trustedUsers;
    }
}