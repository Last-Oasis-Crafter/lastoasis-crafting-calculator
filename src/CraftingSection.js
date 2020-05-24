import React from 'react'
import { Header, Container } from 'semantic-ui-react'
import CraftingPlan from './CraftingPlan'
import CraftingRequirements from './CraftingRequirements'
import './crafting.css'

export default function CraftingSection({crafting, dispatch}) {
  return (
    <Container id='crafting' textAlign='left' style={{paddingTop: '30px'}}>
    {crafting.length === 0 ? 
      <Header size='huge'>Add recipes to craft...</Header>
      :
      <React.Fragment>
        <CraftingPlan items={crafting} dispatch={dispatch} />
        <CraftingRequirements items={crafting} />
      </React.Fragment>
    }
    </Container>
  )
}
