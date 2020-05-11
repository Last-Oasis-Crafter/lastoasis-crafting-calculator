import './App.css';

import React, { useReducer } from 'react';
import ReactGA from 'react-ga';

import CraftingReducer from './CraftingReducer';
import CraftingSection from './CraftingSection';
import ItemSidebar from './ItemSidebar'

const trackingId = "UA-63206624-2";
ReactGA.initialize(trackingId);
ReactGA.set({
  page: '/',
  anonymizeIp: true
});
ReactGA.pageview('/');

function App() {
  const [recipes, craftingDispatch] = useReducer(CraftingReducer, [])

  return (
    <React.Fragment>
      <ItemSidebar dispatch={craftingDispatch}>
        <CraftingSection recipes={recipes} dispatch={craftingDispatch}/>
      </ItemSidebar>
    </React.Fragment>
  );
}

export default App;
