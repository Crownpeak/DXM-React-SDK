import React from 'react';
import { CmsComponent, CmsField } from 'crownpeak-dxm-react-sdk';

export default class ComponentWithFragment extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.list = new CmsField("Field", "ListItem", null);
    }

    render () {
        return (
            <>
                {/* delete */}
                { /* delete */ }
                {/* 
                delete
                 */}
                {/* delete
                 */}
                {/* 
                delete */}
                {/* <List name="List" type="ListItem" itemName="Field"> */}
                {this.list.value.map(item => {
                    return <ListItem data={item.ListItem} key={i++}/>
                })}
                {/* </List> */}
                <p>keep {/* delete */} keep</p>
            </>
        )
    }
}