import React from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { getAllGenera, getAllStrains, getAllStrainTypes } from '../../utils/data_fetch';
import Strain, { Genus, StrainType } from '../../models/strain/strain';
import { ObscureLink } from '../utils/ObscureLink';
import { useAsync } from 'react-async';
import { join } from 'path';

const fetchData = () =>
    Promise.all([getAllStrains(), getAllStrainTypes(), getAllGenera()]);

export default function MicroorganismsCatalog() {
    const { path } = useRouteMatch();
    const { data, error, isPending } = useAsync(fetchData);

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
                <GenusList genusList={genusList} />
            </Route>
            <Route exact path={join(path, ':genusId')}>
                <TypeList typeList={typeList} />
            </Route>
            <Route exact path={join(path, ':genusId/:typeId')}>
                <StrainList strainList={strainList} />
            </Route>
        </Switch>
    );
}

interface UrlParams {
    genusIdStr?: string;
    typeIdStr?: string;
}

function GenusList({ genusList }: { genusList: Genus[] }) {
    const { url } = useRouteMatch();
    return (
        <nav>
            <h1>GENUS LIST</h1>
            <ul>
                {genusList.map((genus) => (
                    <li key={genus.id}>
                        <ObscureLink to={join(url, genus.id.toString())}>
                            {genus.name}
                        </ObscureLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function TypeList({ typeList }: { typeList: StrainType[] }) {
    const { url } = useRouteMatch();
    const { genusIdStr } = useParams<UrlParams>();

    return (
        <nav>
            <h1>TYPE LIST</h1>
            <ul>
                {typeList
                    .filter((type) => type.genus.id.toString() === genusIdStr)
                    .map((type) => (
                        <li key={type.id}>
                            <ObscureLink to={join(url, type.id.toString())}>
                                {type.name}
                            </ObscureLink>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}

function StrainList({ strainList }: { strainList: Strain[] }) {
    const { typeIdStr } = useParams<UrlParams>();

    return (
        <nav>
            <h1>SRAIN LIST</h1>
            <ul>
                {strainList
                    .filter((strain) => strain.type?.id.toString() === typeIdStr)
                    .map((strain) => (
                        <li key={strain.id}>
                            <ObscureLink
                                to={join('/strain', strain.id!.toString(), 'edit')}
                            >
                                {strain.name}
                            </ObscureLink>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}
