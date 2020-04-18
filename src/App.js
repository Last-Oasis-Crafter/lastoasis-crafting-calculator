import React, { useReducer, useEffect } from 'react';

import './App.css';
import ItemSidebar from './ItemSidebar'
import CraftingReducer from './CraftingReducer';
import CraftingDisplay from './CraftingDisplay';

function App() {
  const [crafting, craftingDispatch] = useReducer(CraftingReducer, [])

  // useEffect(() => {
  //   console.log(JSON.stringify(crafting, null, 2))
  // }, [crafting])

  return (
    <React.Fragment>
      <ItemSidebar dispatch={craftingDispatch}>
        <CraftingDisplay crafting={crafting} dispatch={craftingDispatch}/>
      </ItemSidebar>
    </React.Fragment>
  );
}

export default App;
