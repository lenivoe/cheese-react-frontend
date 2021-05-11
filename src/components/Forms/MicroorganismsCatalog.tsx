import React, {useCallback} from 'react';
import {Link, Route, Switch, useParams, useRouteMatch} from 'react-router-dom';
import {getAllGenera, getStrainTypeByGenus, getStrainsByType} from '../../utils/data_fetch';
import {useAsync} from 'react-async';
import {join} from 'path';

export default function MicroorganismsCatalog() {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <GenusList/>
            </Route>
            <Route exact path={join(path, ':genusId')}>
                <TypeList/>
            </Route>
            <Route exact path={join(path, ':genusId/:typeId')}>
                <StrainList/>
            </Route>
        </Switch>
    );
}

interface UrlParams {
    genusId?: string;
    typeId?: string;
}

function GenusList() {
    const {url} = useRouteMatch();
    const fetchData = useCallback(() => getAllGenera(), [])
    const {data, error, isPending} = useAsync(fetchData)

    if (isPending) {
        return <p>Загрузка данных...</p>;
    }
    if (error) {
        return <p>`Ошибка при получении данных: ${error.message}`</p>;
    }

    const genusList = data!;

    const {length: listNumber} = genusList;
    return (
        <div className="genus-list-block">
            <ul className="genus-list">
                {genusList.map((genus) => (
                    <li className="genus-list__item genus-item" key={genus.id}>
                        <Link className="genus-list__link genus-link" to={join(url, genus.id!.toString())}>
                            <span
                                className="genus-link__name genus-name">{genus.name.length >= 50 ?
                                genus.name.substr(1, 49) + "..." : genus.name}</span>
                            <span className="genus-link__number genus-strains-number">{listNumber}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


function TypeList() {
    const {url} = useRouteMatch();
    const genusId = Number(useParams<UrlParams>().genusId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = useCallback(() => getStrainTypeByGenus(genusId), [genusId])
    const {data, error, isPending} = useAsync(fetchData)

    if (isPending) {
        return <p>Загрузка данных...</p>;
    }
    if (error) {
        return <p>`Ошибка при получении данных: ${error.message}`</p>;
    }

    const typeList = data!;

    return (
        <div className="types-list-block">
            {typeList
                .map((type) => (
                    <ul className="types-list big-list">

                        <li className="types-list__item big-list__item" key={type.id}>
                            <Link className="types-list__link types-link" to={join(url, type.id!.toString())}>
                                {"Type name here"}
                            </Link>
                        </li>
                        <li className="types-list__item big-list__item" key={type.id}>
                            <Link className="types-list__link types-link" to={join(url, type.id!.toString())}>
                                {type.name}
                            </Link>
                        </li>
                        <li className="types-list__item big-list__item" key={type.id}>
                            <Link className="types-list__link types-link" to={join(url, type.id!.toString())}>
                                {"Type name here"}
                            </Link>
                        </li>
                        <li className="types-list__item big-list__item" key={type.id}>
                            <Link className="types-list__link types-link" to={join(url, type.id!.toString())}>
                                {type.name}
                            </Link>
                        </li>
                        <li className="types-list__item big-list__item" key={type.id}>
                            <Link className="types-list__link types-link" to={join(url, type.id!.toString())}>
                                {"Type name here"}
                            </Link>
                        </li>
                        <li className="types-list__item big-list__item" key={type.id}>
                            <Link className="types-list__link types-link" to={join(url, type.id!.toString())}>
                                {type.name}
                            </Link>
                        </li>
                        <li className="types-list__item big-list__item" key={type.id}>
                            <Link className="types-list__link types-link" to={join(url, type.id!.toString())}>
                                {"Type name here"}
                            </Link>
                        </li>
                        <li className="types-list__item big-list__item" key={type.id}>
                            <Link className="types-list__link types-link" to={join(url, type.id!.toString())}>
                                {type.name}
                            </Link>
                        </li>

                    </ul>

                ))}
        </div>
    );
}

function StrainList() {

    const typeId = Number(useParams<UrlParams>().typeId);
    const fetchData = useCallback(() => getStrainsByType(typeId), [typeId])
    const {data, error, isPending} = useAsync(fetchData)

    if (isPending) {
        return <p>Загрузка данных...</p>;
    }
    if (error) {
        return <p>`Ошибка при получении данных: ${error.message}`</p>;
    }

    const strainList = data!;

    return (
        <nav>

            {strainList
                .map((strain) => (
                    <ul className="strains-list big-list">
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strain-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strains-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strains-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strains-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strains-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strains-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strains-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strains-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                        <li className="big-list__item strains-list__item" key={strain.id}>
                            <Link className="strains-list__link strains-link"
                                  to={join('/strain', strain.id!.toString(), 'edit')}>
                                {strain.name}
                            </Link>
                        </li>
                    </ul>
                ))}

        </nav>
    );
}
