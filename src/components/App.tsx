import './App.scss';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './Header';
import BlockMenu from './Forms/BlockMenu';
import StrainSavingForm from './Forms/StrainSavingForm/StrainSavingForm';
import MicroorganismsCatalog from './Forms/MicroorganismsCatalog';
import PropertyEditForm from './Forms/PropertyEditForm';
import useMenuState from '../hooks/useMenuState';

function App() {
    const { items, active, visible, toggleVisible } = useMenuState();

    return (
        <>
            <Header
                onMenuButtonClick={toggleVisible}
                isMenuButtonActive={visible}
                title={active.label}
            />

            <main className='main container'>
                <div className='main__content main-content'>
                    <BlockMenu active={active} items={items} visible={visible} />

                    <div className='main-content__data'>
                        <Switch>
                            <Route path='/catalog' component={MicroorganismsCatalog} />
                            <Route path='/strain/add' component={StrainSavingForm} />
                            <Route path='/strain/search' component={undefined} />
                            <Route path='/properties' component={PropertyEditForm} />
                            <Route
                                path='/strain/:strainId/edit'
                                component={StrainSavingForm}
                            />
                            <Redirect from='/' to='/catalog' />
                        </Switch>
                    </div>
                </div>
            </main>
        </>
    );
}

const AppConfigurator = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

export default AppConfigurator;
