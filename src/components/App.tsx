import './App.scss';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './Header';
import BlockMenu from './BlockMenu';
import StrainSavingForm from './Forms/StrainSavingForm/StrainSavingForm';
import MicroorganismsCatalog from './Forms/MicroorganismsCatalog';
import PropertyEditForm from './Forms/PropertyEditForm/PropertyEditForm';
import { store } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectFormFrame } from '../store/formFrame/formFrameSlice';
import API from '../utils/API';
import {
  getAllDataTypes,
  selectPropertyState,
} from '../store/property/propertySlice';

function App() {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector(selectFormFrame);
  const { typeList } = useAppSelector(selectPropertyState);
  const fromLeftClass = menu.isVisible ? ' data-from-left' : '';

  useEffect(() => {
    if (typeList.length === 0) {
      dispatch(getAllDataTypes());
    }
  });

  return (
    <>
      <Header />

      <main className="main container">
        <div className="main__content main-content">
          <BlockMenu />

          <div className={'main-content__data' + fromLeftClass}>
            <Switch>
              <Route path="/catalog" component={MicroorganismsCatalog} />
              <Route path="/strain/add" component={StrainSavingForm} />
              {/* <Route path='/strain/search' component={undefined} /> */}
              <Route path="/properties" component={PropertyEditForm} />
              <Route
                path="/strain/:strainId/edit"
                component={StrainSavingForm}
              />

              <Route path="/test">
                <div>
                  <button
                    onClick={async () => {
                      const strains = await API.strain.getAll();
                      console.log('all strains', strains);
                      strains.forEach((strain) =>
                        API.strain.delete(strain.id!)
                      );
                    }}
                  >
                    delete all strains
                  </button>

                  <button
                    onClick={async () => {
                      const props = await API.property.getAll();
                      console.log('all properties', props);
                      if (props.length >= 0) API.property.delete(props[0].id);
                    }}
                  >
                    delete first formal property
                  </button>
                </div>
              </Route>

              <Redirect from="/" to="/catalog" />
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
