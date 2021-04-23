interface Props {
    title: string;
    children: React.ReactNode;
}

export default function PropertyItem(props: Props) {
    return (
        <div className='property'>
            <div className='property__title'>
                <span>{props.title}</span>
            </div>
            {props.children}
        </div>
    );
}
