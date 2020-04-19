import React, { useReducer } from 'react';

import './App.css';
import ItemSidebar from './ItemSidebar'
import CraftingReducer from './CraftingReducer';
import CraftingSection from './CraftingSection';

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
