import { Link } from 'react-router-dom';

export function ButtonLink<S>(props: Parameters<Link<S>>[0]) {
    const { className = 'disabled-a', ...rest } = props;
    return <Link className={className} {...rest}></Link>;
}
