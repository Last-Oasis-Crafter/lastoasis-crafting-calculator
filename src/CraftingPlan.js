import React from 'react'
import { Accordion, Button, Header, Segment } from 'semantic-ui-react'

import CraftingCard from './CraftingCard'

export default function CraftingPlan({items, dispatch}) {

  return (
    <Segment basic>
      <Header>Crafting:<Button content='Clear All' floated='right' size='mini' compact onClick={e => dispatch({type: 'REMOVE_ALL'})}></Button></Header>
      <Accordion styled>
      {items.map((item, index) =>
        <CraftingCard
          key={item.name}
          item={item}
          dispatch={dispatch}
          index={index} />
      )}
      </Accordion>
    </Segment>
  )
}
