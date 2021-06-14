import './App.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './Header';
import BlockMenu from './BlockMenu';
import StrainSavingForm from './Forms/StrainSavingForm/StrainSavingForm';
import MicroorganismsCatalog from './Forms/MicroorganismsCatalog';
import PropertyEditForm from './Forms/PropertyEditForm/PropertyEditForm';
import { store } from '../store/store';
import { useAppSelector } from '../store/hooks';
import { selectFormFrame } from '../store/formFrame/formFrameSlice';

function App() {
    const { menu } = useAppSelector(selectFormFrame);
    const fromLeftClass = menu.isVisible ? ' data-from-left' : '';

    return (
        <>
            <Header />

            <main className='main container'>
                <div className='main__content main-content'>
                    <BlockMenu />

                    <div className={'main-content__data' + fromLeftClass}>
                        <Switch>
                            <Route
                                path='/catalog'
                                component={MicroorganismsCatalog}
                            />
                            <Route
                                path='/strain/add'
                                component={StrainSavingForm}
                            />
                            {/* <Route path='/strain/search' component={undefined} /> */}
                            <Route
                                path='/properties'
                                component={PropertyEditForm}
                            />
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
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default AppConfigurator;
