import React from 'react'
import { Accordion, Button, Header, Segment } from 'semantic-ui-react'

import CraftingCard from './CraftingCard'

export default function CraftingPlan ({ items, dispatch }) {

  return (
    <Segment basic>
      <Header
        style={{
          'max-width': '600px'
        }}>
        Crafting:
        <Button content='Clear All' floated='right' size='mini' compact onClick={e => dispatch({ type: 'REMOVE_ALL' })} />
      </Header>
      <Accordion styled>
        {items.map((item, index) =>
          <CraftingCard
            key={item.name}
            item={item}
            dispatch={dispatch}
            index={index} />
        )}
      </Accordion>
    </Segment >
  )
}
