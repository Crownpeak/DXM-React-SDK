import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes, CmsIndexedField } from 'crownpeak-dxm-react-sdk';

export default function SimpleComponentWithComments(props)
{
    CmsDataCache.setComponent("SimpleComponentWithComments");

    return (
        <div>
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
        </div>
    )
}