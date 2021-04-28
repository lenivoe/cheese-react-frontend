import { Link } from 'react-router-dom';

export function ObscureLink<S>(props: Parameters<Link<S>>[0]) {
    const { className = 'obscure-a', ...rest } = props;
    return <Link className={className} {...rest}></Link>;
}
