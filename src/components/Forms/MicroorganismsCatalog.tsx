import React from 'react';
import {Link, Route, Switch, useParams, useRouteMatch} from 'react-router-dom';
import {getAllGenera, getAllStrains, getAllStrainTypes} from '../../utils/data_fetch';
import Strain, {Genus, StrainType} from '../../models/strain/strain';
import {useAsync} from 'react-async';
import {join} from 'path';

const fetchData = () =>
    Promise.all([getAllStrains(), getAllStrainTypes(), getAllGenera()]);

export default function MicroorganismsCatalog() {
    const {path} = useRouteMatch();
    const {data, error, isPending} = useAsync(fetchData);

    if (isPending) {
        return <p>Загрузка данных...</p>;
    }
    if (error) {
        return <p>`Ошибка при получении данных: ${error.message}`</p>;
    }

    const [strainList, typeList, genusList] = data!;

    return (
        <Switch>
            <Route exact path={path}>
                <GenusList genusList={genusList}/>
            </Route>
            <Route exact path={join(path, ':genusId')}>
                <TypeList typeList={typeList}/>
            </Route>
            <Route exact path={join(path, ':genusId/:typeId')}>
                <StrainList strainList={strainList}/>
            </Route>
        </Switch>
    );
}

interface UrlParams {
    genusIdStr?: string;
    typeIdStr?: string;
}

function GenusList({genusList}: { genusList: Genus[] }) {
    const {url} = useRouteMatch();
    const {length: listNumber} = genusList;
    return (
        <div className="genus-list-block">
            <ul className="genus-list">
                {genusList.map((genus) => (
                    <li className="genus-list__item genus-item" key={genus.id}>
                        <Link className="genus-list__link genus-link" to={join(url, genus.id.toString())}>
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


function TypeList({typeList}: { typeList: StrainType[] }) {
    const {url} = useRouteMatch();
    const {genusIdStr} = useParams<UrlParams>();

    return (
        <div className="type-list-block">
            <ul className="type-list">
                {typeList
                    .filter((type) => type.genus.id.toString() === genusIdStr)
                    .map((type) => (
                        <li className="type-list__item type-item" key={type.id}>
                            <Link className="type-list__link type-link" to={join(url, type.id.toString())}>
                                {type.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

function StrainList({strainList}: { strainList: Strain[] }) {
    const {typeIdStr} = useParams<UrlParams>();

    return (
        <nav>
            <ul>
                {strainList
                    .filter((strain) => strain.type?.id.toString() === typeIdStr)
                    .map((strain) => (
                        <li key={strain.id}>
                            <Link
                                to={join('/strain', strain.id!.toString(), 'edit')}
                            >
                                {strain.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}
