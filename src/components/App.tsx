import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import BlockMenu, { MenuItemInfo } from './Forms/BlockMenu';
import StrainSavingForm from './Forms/StrainSavingForm';
import MicroorganismsCatalog from './Forms/MicroorganismsCatalog';

const menuLabels = [
    'Каталог микроорганизмов',
    'Добавить штамм микроорганизма',
    'Поиск и редактирование штаммов микроорганизмов',
    'Редактирование свойств и параметров микроорганзимов',
    '[Тест] редактирование штамма',
];

const menuButtonsInfo: MenuItemInfo[] = [
    '/',
    '/add_strain',
    '/strain_search',
    '/edit_properties',
    '/edit_strain/2',
].map((url, i) => ({ id: i, label: menuLabels[i], url }));

const routesInfo: [string, React.ComponentType | undefined][] = [
    ['/', MicroorganismsCatalog],
    ['/add_strain', StrainSavingForm],
    ['/strain_search', undefined],
    ['/edit_properties', undefined],
    ['/edit_strain/:id', StrainSavingForm],
];

interface State {
    isBlockMenuActive: boolean;
}

export default class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = { isBlockMenuActive: true };
    }

    render() {
        const { isBlockMenuActive } = this.state;

        return (
            <Router>
                <Header
                    onMenuButtonClick={this.onMenuButtonClick}
                    isMenuButtonActive={this.state.isBlockMenuActive}
                />

                <main className='main container'>
                    <div className='main__content main-content'>
                        {isBlockMenuActive && <BlockMenu items={menuButtonsInfo} />}

                        <Switch>
                            {routesInfo.map(([path, component], i) => (
                                <Route
                                    key={i}
                                    exact={path === '/'}
                                    path={path}
                                    component={component}
                                />
                            ))}
                        </Switch>
                    </div>
                </main>
            </Router>
        );
    }

    private onMenuButtonClick = () => {
        this.setState((prevState, _) => ({
            isBlockMenuActive: !prevState.isBlockMenuActive,
        }));
    };
}
