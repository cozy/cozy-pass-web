import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    NgZone,
    OnChanges,
    Output,
} from '@angular/core';

import { ApiService } from 'jslib/abstractions/api.service';
import { AuditService } from 'jslib/abstractions/audit.service';
import { CipherService } from 'jslib/abstractions/cipher.service';
import { CollectionService } from 'jslib/abstractions/collection.service';
import { CryptoService } from 'jslib/abstractions/crypto.service';
import { EventService } from 'jslib/abstractions/event.service';
import { I18nService } from 'jslib/abstractions/i18n.service';
import { MessagingService } from 'jslib/abstractions/messaging.service';
import { PasswordRepromptService } from 'jslib/abstractions/passwordReprompt.service';
import { PlatformUtilsService } from 'jslib/abstractions/platformUtils.service';
import { StorageService } from 'jslib/abstractions/storage.service';
import { TokenService } from 'jslib/abstractions/token.service';
import { TotpService } from 'jslib/abstractions/totp.service';
import { UserService } from 'jslib/abstractions/user.service';

import { BroadcasterService } from 'jslib/angular/services/broadcaster.service';

import { ViewComponent as BaseViewComponent } from 'jslib/angular/components/view.component';

import { CipherView } from 'jslib/models/view/cipherView';

const BroadcasterSubscriptionId = 'ViewComponent';

@Component({
    selector: 'app-vault-view',
    templateUrl: 'view.component.html',
})
export class ViewComponent extends BaseViewComponent implements OnChanges {
    @Output() onViewCipherPasswordHistory = new EventEmitter<CipherView>();

    isReadOnly = false;

    constructor(cipherService: CipherService, totpService: TotpService,
        tokenService: TokenService, i18nService: I18nService,
        cryptoService: CryptoService, platformUtilsService: PlatformUtilsService,
        auditService: AuditService, broadcasterService: BroadcasterService,
        ngZone: NgZone, changeDetectorRef: ChangeDetectorRef,
        userService: UserService, eventService: EventService, apiService: ApiService,
        private messagingService: MessagingService, passwordRepromptService: PasswordRepromptService,
        private collectionService: CollectionService) {
        super(cipherService, totpService, tokenService, i18nService, cryptoService, platformUtilsService,
            auditService, window, broadcasterService, ngZone, changeDetectorRef, userService, eventService,
            apiService, passwordRepromptService);
    }
    ngOnInit() {
        super.ngOnInit();
        this.broadcasterService.subscribe(BroadcasterSubscriptionId, (message: any) => {
            this.ngZone.run(() => {
                switch (message.command) {
                    case 'windowHidden':
                        this.onWindowHidden();
                        break;
                    default:
                }
            });
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.broadcasterService.unsubscribe(BroadcasterSubscriptionId);
    }

    async ngOnChanges() {
        await super.load();

        if (this.cipher.collectionIds?.length > 0) {
            let readOnly = true;

            // in Bitwarden's protocol a cipher is writable if part of at least one writable collection
            for (const collectionId of this.cipher.collectionIds) {
                const collection = await this.collectionService.get(collectionId);
                if (!collection.readOnly) {
                    readOnly = false;
                    break;
                }
            }

            this.isReadOnly = readOnly;
        } else {
            this.isReadOnly = false;
        }
    }

    viewHistory() {
        this.onViewCipherPasswordHistory.emit(this.cipher);
    }

    async copy(value: string, typeI18nKey: string, aType: string) {
        super.copy(value, typeI18nKey, aType);
        this.messagingService.send('minimizeOnCopy');
    }

    onWindowHidden() {
        this.showPassword = false;
        this.showCardCode = false;
        if (this.cipher !== null && this.cipher.hasFields) {
            this.cipher.fields.forEach(field => {
                field.showValue = false;
            });
        }
    }
}
