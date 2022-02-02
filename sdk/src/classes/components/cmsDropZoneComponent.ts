import * as React from 'react';
import { ReactNode } from "React";
import { CmsDataCache } from 'crownpeak-dxm-sdk-core';
import CmsComponent from './cmsComponent';
import IDropZoneProps from './IDropZoneProps';

export default class CmsDropZoneComponent<T extends IDropZoneProps = IDropZoneProps> extends CmsComponent<T> {
    data: any[];
    components: {[key: string]: React.ClassType<any, React.Component, React.ComponentClass>} = {};

    constructor(props: IDropZoneProps) {
        super(props);
        this.data = (CmsDataCache.get(CmsDataCache.cmsAssetId).DropZones || {})[props.name] || [];
    }

    getComponents() {
        const components : any[] = [];
        let i = 0;
        this.data.map((component: any) => {
            const key = Object.keys(component)[0];
            components.push(
                React.createElement(this.components[key], {
                    key: (this.props as IDropZoneProps).name + i++,
                    data: component[key]
                })
            );
        })
        return components;
    }

    render(attributes?: object):ReactNode {
        return React.createElement('div', attributes,
            this.getComponents()
        );
    }
}