import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'jslib/abstractions/api.service';
import { AuthService } from 'jslib/abstractions/auth.service';
import { CipherService } from 'jslib/abstractions/cipher.service';
import { CollectionService } from 'jslib/abstractions/collection.service';
import { CryptoService } from 'jslib/abstractions/crypto.service';
import { EnvironmentService } from 'jslib/abstractions/environment.service';
import { FolderService } from 'jslib/abstractions/folder.service';
import { I18nService } from 'jslib/abstractions/i18n.service';
import { PasswordGenerationService } from 'jslib/abstractions/passwordGeneration.service';
import { PlatformUtilsService } from 'jslib/abstractions/platformUtils.service';
import { SyncService } from 'jslib/abstractions/sync.service';
import { UserService } from 'jslib/abstractions/user.service';
import { VaultTimeoutService } from 'jslib/abstractions/vaultTimeout.service';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MessagingService } from '../../../../jslib/src/abstractions/messaging.service';
import { CozyClientService } from '../../services/cozy-client.service';
import { VaultInstallationService } from '../../services/installation-guard.service';
import {
    AngularWrapperComponent,
    AngularWrapperProps,
} from '../angular-wrapper.component';
// @ts-ignore
import InstallationPage from './installation-page.jsx';

interface InstallationPageProps extends AngularWrapperProps {
    onSkipExtension: () => void;
    navigate: () => void;
}

@Component({
    selector: 'app-installation-page',
    templateUrl: '../angular-wrapper.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class InstallationPageComponent extends AngularWrapperComponent implements OnInit, OnDestroy {
    constructor(
        protected clientService: CozyClientService,
        protected apiService: ApiService,
        protected environmentService: EnvironmentService,
        protected authService: AuthService,
        protected syncService: SyncService,
        protected cryptoService: CryptoService,
        protected cipherService: CipherService,
        protected userService: UserService,
        protected collectionService: CollectionService,
        protected passwordGenerationService: PasswordGenerationService,
        protected vaultTimeoutService: VaultTimeoutService,
        protected folderService: FolderService,
        protected i18nService: I18nService,
        protected platformUtilsService: PlatformUtilsService,
        private vaultInstallationService: VaultInstallationService,
        private messagingService: MessagingService,
        private router: Router,
        private location: Location,
    ) {
        super(
            clientService,
            apiService,
            environmentService,
            authService,
            syncService,
            cryptoService,
            cipherService,
            userService,
            collectionService,
            passwordGenerationService,
            vaultTimeoutService,
            folderService,
            i18nService,
            platformUtilsService
        );
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.renderReact();
    }

    /******************/
    /* Props Bindings */
    /******************/

    protected async onSkipExtension() {
        await this.vaultInstallationService.completeVaultConfiguration();
        this.messagingService.send('installed');
    }

    protected navigate(params: { goBack: true; route: string; }) {
        if (params.goBack) {
            this.location.back();
        } else {
            this.router.navigate([params.route]);
        }
    }

    protected async getProps(): Promise<InstallationPageProps> {
        const reactWrapperProps = await this.getReactWrapperProps(true);

        return {
            reactWrapperProps: reactWrapperProps,
            onSkipExtension: this.onSkipExtension.bind(this),
            navigate: this.navigate.bind(this),
        };
    }

    /**********/
    /* Render */
    /**********/

    protected async renderReact() {
        ReactDOM.render(
            React.createElement(InstallationPage, await this.getProps()),
            this.getRootDomNode()
        );
    }
}
