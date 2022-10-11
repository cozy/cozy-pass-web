import { Component, EventEmitter, Output } from '@angular/core';
import { CAN_SHARE_ORGANIZATION } from '../../cozy/flags';
import { SharingService } from '../../cozy/services/sharing.service';

import { CipherService } from 'jslib/abstractions/cipher.service';
import { CollectionService } from 'jslib/abstractions/collection.service';
import { FolderService } from 'jslib/abstractions/folder.service';
import { StorageService } from 'jslib/abstractions/storage.service';
import { UserService } from '../../services/user.service';

import { GroupingsComponent as BaseGroupingsComponent } from 'jslib/angular/components/groupings.component';
import { BroadcasterService } from 'jslib/angular/services/broadcaster.service';
import { CollectionView } from 'jslib/models/view/collectionView';

import { ServiceUtils } from 'jslib/misc/serviceUtils';

const NestingDelimiter = '/';

@Component({
    selector: 'app-vault-groupings',
    templateUrl: 'groupings.component.html',
})
export class GroupingsComponent extends BaseGroupingsComponent {
    @Output() onOrganizationWithoutKeyClicked = new EventEmitter<CollectionView>();
    @Output() onImportClicked = new EventEmitter<void>();
    importSelected = false;
    CAN_SHARE_ORGANIZATION = CAN_SHARE_ORGANIZATION;
    collectionsWithUsersToValidateIds: { [id: string]: string[] } = {};

    hasNotes: boolean;
    private prevSelection: any = new Object();

    constructor(collectionService: CollectionService, folderService: FolderService,
        storageService: StorageService, private localUserService: UserService,
        private broadcasterService: BroadcasterService, private cipherService: CipherService, private sharingService: SharingService) {
        super(collectionService, folderService, storageService, localUserService);
    }

    async load(setLoaded = true) {
        // check if there are notes to display
        const ciphers = await this.cipherService.getAllDecrypted();
        const noteIndex = ciphers.findIndex(c => {
            return (c.type === 2 && !c.isDeleted);
        });
        this.hasNotes = (noteIndex > -1) ;
        // run super
        super.load(setLoaded);
    }

    lock() {
        this.broadcasterService.send({command: 'lockVault'});
    }

    logout() {
        this.broadcasterService.send({command: 'logout'});
    }
    clearSelections() {
        this.prevSelection.selectedAll          = this.selectedAll         ;
        this.prevSelection.selectedFavorites    = this.selectedFavorites   ;
        this.prevSelection.selectedTrash        = this.selectedTrash       ;
        this.prevSelection.selectedType         = this.selectedType        ;
        this.prevSelection.selectedFolder       = this.selectedFolder      ;
        this.prevSelection.selectedFolderId     = this.selectedFolderId    ;
        this.prevSelection.selectedCollectionId = this.selectedCollectionId;
        this.importSelected = false;
        super.clearSelections();
    }

    selectImport() {
        this.clearSelections();
        this.importSelected = true;
        this.onImportClicked.emit();
    }

    revertSelection() {
        this.selectedAll          = this.prevSelection.selectedAll         ;
        this.selectedFavorites    = this.prevSelection.selectedFavorites   ;
        this.selectedTrash        = this.prevSelection.selectedTrash       ;
        this.selectedType         = this.prevSelection.selectedType        ;
        this.selectedFolder       = this.prevSelection.selectedFolder      ;
        this.selectedFolderId     = this.prevSelection.selectedFolderId    ;
        this.selectedCollectionId = this.prevSelection.selectedCollectionId;
    }

    async showFingerprint() {
        this.broadcasterService.send({command: 'showFingerprintPhrase'});
    }

    async deleteCollection(collection: CollectionView) {
        this.broadcasterService.send({
            command: 'deleteOrganization',
            organizationId: collection.organizationId,
        });
    }

    async loadCollections(organizationId?: string) {
        await super.loadCollections(organizationId);

        const organizationWithouKey = await this.localUserService.getOrganizationsWithoutKey();

        organizationWithouKey.forEach(organization => {
            const collectionCopy = new CollectionView();
            collectionCopy.id = organization.id;
            collectionCopy.organizationId = organization.id;
            const parts = organization.name != null ? organization.name.replace(/^\/+|\/+$/g, '').split(NestingDelimiter) : [];

            ServiceUtils.nestedTraverse(
                this.nestedCollections,
                0,
                parts,
                collectionCopy,
                null,
                NestingDelimiter
            );
        });

        await this.checkCollectionsWithUsersToValidate();
    }

    selectCollection(collection: CollectionView) {
        if (this.isOrgWithNoKey(collection)) {
            this.showConfirmIdentityForOrganization(collection.organizationId);
        } else {
            super.selectCollection(collection);
        }
    }

    showConfirmIdentityForOrganization(organizationId: string) {
        this.broadcasterService.send({
            command: 'showConfirmYourIdentityDialog',
            organizationId: organizationId,
        });
    }

    // Cozy customization, display a red badge on folder icon
    // when sharing recipients are waiting for validation
    // /*

    // check if the specified collection has users waiting for validation
    isCollectionWithUsersToValidate(collection: CollectionView) {
        return Object.keys(this.collectionsWithUsersToValidateIds).includes(collection.id);
    }

    // retrieve collections that have users waiting for validation
    async checkCollectionsWithUsersToValidate() {
        for (const collection of this.collections) {
            if (collection.name === 'Cozy Connectors') {
                continue;
            }

            const usersToBeConfirmed = await this.sharingService.loadAcceptedUsersForOrganization(collection.organizationId);

            if (usersToBeConfirmed.length > 0) {
                const userIds = usersToBeConfirmed.map(user => user.id);
                this.collectionsWithUsersToValidateIds[collection.id] = userIds;
            }
        }
    }

    // */

    protected isOrgWithNoKey(collection: CollectionView) {
        // in loadCollections() we set collection.id = collection.organization.id for organizations with no key
        return collection.id === collection.organizationId;
    }
}
