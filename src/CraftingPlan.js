import React from 'react'
import { Accordion, Segment, Header } from 'semantic-ui-react'
import CraftingCard from './CraftingCard'

export default function CraftingPlan({items, dispatch}) {

  return (
    <Segment basic>
      <Header>Crafting:</Header>
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
