import React from 'react'
import { Accordion } from 'semantic-ui-react'
import CraftingCard from './CraftingCard'

export default function CraftingPlan({items, dispatch}) {

  return (
    <Accordion styled>
    {items.map((item, index) =>
      <CraftingCard
        key={item.name}
        item={item}
        dispatch={dispatch}
        index={index} />
    )}
    </Accordion>
  )
}
