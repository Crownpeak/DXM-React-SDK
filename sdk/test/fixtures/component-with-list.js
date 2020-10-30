import React from 'react';
import { CmsComponent, CmsField } from 'crownpeak-dxm-react-sdk';

export default class ComponentWithList extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.list = new CmsField("Field", "ListItem", null);
    }

    render () {
        return (
            <div>
                {/* <List name="List" type="ListItem" itemName="Field"> */}
                {this.list.value.map(item => {
                    return <ListItem data={item.ListItem} key={i++}/>
                })}
                {/* </List> */}
            </div>
        )
    }
}