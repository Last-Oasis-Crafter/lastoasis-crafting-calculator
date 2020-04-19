import React from 'react'
import { Header, Container } from 'semantic-ui-react'
import CraftingPlan from './CraftingPlan'
import CraftingRequirements from './CraftingRequirements'

export default function CraftingSection({crafting, dispatch}) {
  if(crafting.length === 0) return (
    <Container textAlign='left'>
      <Header style={{paddingTop: '30px'}} size='huge'>Add recipes to craft...</Header>
    </Container>
  ) 
  else return (
    <Container textAlign='left'>
      <Header style={{paddingTop: '30px'}} size='huge'>Crafting:</Header>
      <CraftingPlan items={crafting} dispatch={dispatch} />
      <CraftingRequirements items={crafting} />
    </Container>
  )
}
