import { Component, OnChanges, ViewEncapsulation } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    AngularWrapperComponent,
    AngularWrapperProps,
} from '../angular-wrapper.component';
// @ts-ignore
import Bar from './bar.jsx';

interface BarProps extends AngularWrapperProps {}

@Component({
    selector: 'app-bar',
    templateUrl: '../angular-wrapper.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class BarComponent extends AngularWrapperComponent implements OnChanges {

    /******************/
    /* Props Bindings */
    /******************/

    protected async getProps(): Promise<BarProps> {
        const reactWrapperProps = await this.getReactWrapperProps(true);

        return {
            reactWrapperProps: reactWrapperProps
        };
    }

    /**********/
    /* Render */
    /**********/

    protected async renderReact() {
        ReactDOM.render(
            React.createElement(Bar, await this.getProps()),
            this.getRootDomNode()
        );
    }
}
