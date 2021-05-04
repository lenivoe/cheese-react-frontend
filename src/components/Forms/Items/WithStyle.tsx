import { StyleProps } from './FormItemProps';

export default function withStyle<P extends StyleProps>(
    Component: React.ComponentType<P>,
    cssClassPrefix: string
) {
    const wrap = cssClassPrefix + '__item';
    const label = cssClassPrefix + '__label';
    const input = cssClassPrefix + '__input';

    return (props: P) => {
        const { wrapClass = wrap, labelClass = label, inputClass = input } = props;

        return (
            <Component
                {...props}
                wrapClass={wrapClass}
                labelClass={labelClass}
                inputClass={inputClass}
            />
        );
    };
}
