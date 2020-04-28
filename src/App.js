import React, { useReducer } from 'react';
import ReactGA from 'react-ga';
import { useMedia } from 'react-use-media'

import './App.css';
import ItemSidebar from './ItemSidebar'
import CraftingReducer from './CraftingReducer';
import CraftingSection from './CraftingSection';

const trackingId = "UA-63206624-2";
ReactGA.initialize(trackingId);
ReactGA.set({
  page: '/',
  anonymizeIp: true
});
ReactGA.pageview('/');

function App() {
  const [crafting, craftingDispatch] = useReducer(CraftingReducer, [])
  const isWide = useMedia({ minWidth: 1100 })

  if(isWide) return (
    <React.Fragment>
      <ItemSidebar dispatch={craftingDispatch}>
        <CraftingSection crafting={crafting} dispatch={craftingDispatch}/>
      </ItemSidebar>
    </React.Fragment>
  )
  else return (
    <React.Fragment>
      <CraftingSection crafting={crafting} dispatch={craftingDispatch}/>
    </React.Fragment>
  )
}

export default App;
