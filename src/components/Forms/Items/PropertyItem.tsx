export interface PropertyItemProps {
    title: string;
    children: React.ReactNode;
}

export default function PropertyItem(props: PropertyItemProps) {
    return (
        <div className='property'>
            <div className='property__title'>
                <span>{props.title}</span>
            </div>
            {props.children}
        </div>
    );
}
