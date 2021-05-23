import React from 'react';
import FormalParameter from '../../../models/FormalParameter';
import FormalProperty from '../../../models/Property/FormalProperty';
import List from '../Items/List';

interface PropOrParamListProps {
    title: string;
    cssPrefix: 'properties' | 'parameters';
    name: string;
    itemList?: (FormalProperty | FormalParameter)[];
}

export default function PropOrParamList(props: PropOrParamListProps) {
    const { title, cssPrefix, name, itemList } = props;
    const className = `${cssPrefix}-list__property-item list-item`;

    return (
        <div className='property-edit__property-parameters property-edit--list'>
            <div className={`${cssPrefix}-list list`}>
                <div className={`${cssPrefix}-list__title list-title`}>
                    <span>{title}</span>
                </div>
                <List
                    className={`${cssPrefix}-list__data list-data`}
                    name={name}
                    valueList={(itemList ?? []).map(({ name }) => name)}
                >
                    {itemList?.map(({ id, name }) => (
                        <div key={id} className={className}>
                            <span>{name}</span>
                        </div>
                    ))}
                </List>
            </div>
        </div>
    );
}
