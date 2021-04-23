import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import {
    getAllGenera,
    getAllStrains,
    getAllStrainTypes as getAllTypes,
} from '../../utils/data_fetch';
import RequestError from '../../utils/request_error';
import Strain, { Genus, StrainType } from '../../models/strain/strain';

interface State {
    requestError?: RequestError;
    isLoading: boolean;

    strainList: Strain[];
    typeList: StrainType[];
    genusList: Genus[];
}

export default class MicroorganismsCatalog extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = { isLoading: false, strainList: [], typeList: [], genusList: [] };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const [strainList, typeList, genusList] = await Promise.all([
                getAllStrains(),
                getAllTypes(),
                getAllGenera(),
            ]);
            this.setState({ strainList, typeList, genusList });
        } catch (error) {
            this.setState({ requestError: error });
        }
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading, requestError } = this.state;

        if (isLoading) {
            return <p>Загрузка данных...</p>;
        }
        if (requestError) {
            return `Ошибка при получении данных: ${requestError.message}`;
        }

        const { strainList, typeList, genusList } = this.state;

        return (
            <div>
                catalog
                <Switch>
                    <Route path='/catalog'>
                        <GenusList genusList={genusList} />
                    </Route>

                    {strainList.map((strain) => {
                        return (
                            <Route key={strain.id} path={`/${strain.type?.genus.name}`}>
                                <TypeList />
                            </Route>
                        );
                    })}
                </Switch>
            </div>
        );

        return (
            <div>
                штаммы
                <pre>{JSON.stringify(strainList, null, 2)}</pre>
                виды
                <pre>{JSON.stringify(typeList, null, 2)}</pre>
                рода
                <pre>{JSON.stringify(genusList, null, 2)}</pre>
            </div>
        );
    }
}

function GenusList({ genusList }: { genusList: Genus[] }) {
    return (
        <nav>
            <ul>
                {genusList.map((genus) => {
                    return (
                        <li>
                            <Link className='disabled-a' to={`/${genus.name}`}>
                                {genus.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

function TypeList() {
    return <p>{'pop'}</p>;
}
