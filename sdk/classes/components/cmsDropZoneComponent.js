import React from 'react';
import CmsComponent from './cmsComponent';

export default class CmsDropZoneComponent extends CmsComponent
{
    constructor(props) {
        super(props);
        this.data = (window.cmsDataCache[window.cmsDataCache.cmsAssetId].DropZones || {})[this.props.name] || [];
    }

    getComponents() {
        let components = [], i = 0;
        this.data.map((component) => {
            const key = Object.keys(component)[0];
            components.push(
                React.createElement(this.components[key], {
                    key: this.props.name + i++,
                    data: component[key]
                })
            );
        })
        return components;
    }

    render() {
        return React.createElement('div', null,
            this.getComponents()
        );
    }
}