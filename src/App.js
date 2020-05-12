import React, { useReducer } from 'react';
import ReactGA from 'react-ga';


import './App.css';
import ItemSidebar from './components/ItemSidebar'
import CraftingReducer from './reducers/CraftingReducer';
import CraftingSection from './components/CraftingSection';

const trackingId = "UA-63206624-2";
ReactGA.initialize(trackingId);
ReactGA.set({
  page: '/',
  anonymizeIp: true
});
ReactGA.pageview('/');

function App() {
  const [crafting, craftingDispatch] = useReducer(CraftingReducer, [])

  return (
    <React.Fragment>
      <ItemSidebar dispatch={craftingDispatch}>
        <CraftingSection crafting={crafting} dispatch={craftingDispatch}/>
      </ItemSidebar>
    </React.Fragment>
  );
}

export default App;
