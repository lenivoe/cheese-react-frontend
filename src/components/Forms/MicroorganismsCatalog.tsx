import React, { useCallback } from 'react';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import API from '../../utils/API';
import { useAsync } from 'react-async';
import { join } from 'path';
import { useAppDispatch } from '../../store/hooks';
import {
    MenuKey,
    setActiveMenuItemByKey,
    setTitleByActiveItem,
} from '../../store/formFrame/formFrameSlice';
import { useEffect } from 'react';

export default function MicroorganismsCatalog() {
    const { path } = useRouteMatch();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setActiveMenuItemByKey(MenuKey.CATALOG));
        dispatch(setTitleByActiveItem());
    });

    return (
        <Switch>
            <Route exact path={path}>
                <GenusList />
            </Route>
            <Route exact path={join(path, ':genusId')}>
                <TypeList />
            </Route>
            <Route exact path={join(path, ':genusId/:typeId')}>
                <StrainList />
            </Route>
        </Switch>
    );
}

interface UrlParams {
    genusId?: string;
    typeId?: string;
}

function GenusList() {
    const { url } = useRouteMatch();
    const fetchData = useCallback(() => API.genus.getAll(), []);
    const { data, error, isPending } = useAsync(fetchData);

    const fetchAllTypes = useCallback(() => API.type.getAll(), []);
    const types = useAsync(fetchAllTypes);
    const countTypes = useCallback(
        (genusId: number) => {
            return types.data?.filter((type) => type.genus.id === genusId).length;
        },
        [types]
    );

    if (isPending) {
        return <p>Загрузка данных...</p>;
    }
    if (error) {
        return <p>`Ошибка при получении данных: ${error.message}`</p>;
    }

    const genusList = data!;
    const maxLen = 50;

    // const { length: listNumber } = genusList;
    return (
        <div className='genus-list-block'>
            <ul className='genus-list'>
                {genusList.map((genus) => (
                    <li className='genus-list__item genus-item' key={genus.id}>
                        <Link
                            className='genus-list__link genus-link'
                            to={join(url, genus.id!.toString())}
                        >
                            <span className='genus-link__name genus-name'>
                                {trim(genus.name, maxLen)}
                            </span>
                            <span className='genus-link__number genus-strains-number'>
                                {`видов: ${countTypes(genus.id!)}`}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TypeList() {
    const { url } = useRouteMatch();
    const genusId = Number(useParams<UrlParams>().genusId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = useCallback(() => API.genus.getTypes(genusId), [genusId]);
    const { data, error, isPending } = useAsync(fetchData);

    if (isPending) {
        return <p>Загрузка данных...</p>;
    }
    if (error) {
        return <p>`Ошибка при получении данных: ${error.message}`</p>;
    }

    const typeList = data!;

    return (
        <div className='types-list-block'>
            <ul className='types-list big-list'>
                {typeList.map((type) => (
                    <li className='types-list__item big-list__item' key={type.id}>
                        <Link
                            className='types-list__link types-link'
                            to={join(url, type.id!.toString())}
                        >
                            {type.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function StrainList() {
    const typeId = Number(useParams<UrlParams>().typeId);
    const fetchData = useCallback(() => API.type.getStrains(typeId), [typeId]);
    const { data, error, isPending } = useAsync(fetchData);

    if (isPending) {
        return <p>Загрузка данных...</p>;
    }
    if (error) {
        return <p>`Ошибка при получении данных: ${error.message}`</p>;
    }

    const strainList = data!;

    return (
        <nav>
            <ul className='strains-list big-list'>
                {strainList.map((strain) => (
                    <li className='big-list__item strains-list__item' key={strain.id}>
                        <Link
                            className='strains-list__link strains-link'
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

function trim(str: string, maxLen: number) {
    return str.length >= maxLen ? str.substr(0, maxLen - 3) + '...' : str;
}
