import './App.scss';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import React, {useCallback, useState} from 'react';
import Header from './Header';
import BlockMenu, {MenuItemInfo} from './Forms/BlockMenu';
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
    '/catalog',
    '/strain/add',
    '/strain/search',
    '/properties',
    '/strain/2/edit',
].map((url, i) => ({id: i, label: menuLabels[i], url}));

export default function App() {
    const [isBlockMenuActive, setIsBlockMenuActive] = useState(true);

    const onMenuButtonClick = useCallback(
        () => setIsBlockMenuActive((isActive) => !isActive),
        [isBlockMenuActive]
    );

    return (
        <BrowserRouter>
            <Header
                onMenuButtonClick={onMenuButtonClick}
                isMenuButtonActive={isBlockMenuActive}
            />

            <main className='main container'>
                <div className='main__content main-content'>
                    <div className='main-content__menu'>
                        {isBlockMenuActive && <BlockMenu items={menuButtonsInfo}/>}
                    </div>

                    <div className="main-content__data">
                        <Switch>
                            <Route path='/catalog' component={MicroorganismsCatalog}/>
                            <Route path='/strain/add' component={StrainSavingForm}/>
                            <Route path='/strain/search' component={undefined}/>
                            <Route path='/properties' component={undefined}/>
                            <Route path='/strain/:id/edit' component={StrainSavingForm}/>

                            <Redirect from='/' to='/catalog'/>
                        </Switch>
                    </div>
                </div>
            </main>
        </BrowserRouter>
    );
}
