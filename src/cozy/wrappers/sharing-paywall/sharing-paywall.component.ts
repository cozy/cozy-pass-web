import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    AngularWrapperComponent,
    AngularWrapperProps,
} from '../angular-wrapper.component';
// @ts-ignore
import SharingPaywall from './sharing-paywall.jsx';

interface SharingPaywallProps extends AngularWrapperProps {
    onClose: () => void;
    showDialog: boolean;
}

@Component({
    selector: 'app-sharing-paywall',
    templateUrl: '../angular-wrapper.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SharingPaywallComponent extends AngularWrapperComponent implements OnChanges {

    @Input() showDialog: boolean = false;
    @Output() onClosed = new EventEmitter();

    /******************/
    /* Props Bindings */
    /******************/

    protected onClose() {
        this.onClosed.emit();
    }

    protected async getProps(): Promise<SharingPaywallProps> {
        const reactWrapperProps = await this.getReactWrapperProps(true);

        return {
            reactWrapperProps: reactWrapperProps,
            onClose: this.onClose.bind(this),
            showDialog: this.showDialog,
        };
    }

    /**********/
    /* Render */
    /**********/

    protected async renderReact() {
        ReactDOM.render(
            React.createElement(SharingPaywall, await this.getProps()),
            this.getRootDomNode()
        );
    }
}
