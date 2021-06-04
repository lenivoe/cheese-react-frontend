import React from 'react';

export interface PropertyItemProps {
    title: string;
    children: React.ReactNode;
}

function PropertyItem(props: PropertyItemProps) {
    return (
        <div className='property'>
            <div className='property__title'>
                <span>{props.title}</span>
            </div>
            {props.children}
            <div className='property__buttons-block'>
                <button className='property__delete-button delete-button'>
                    Удалить свойство
                </button>
            </div>
        </div>
    );
}

export default PropertyItem;
