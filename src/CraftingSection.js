import React from 'react'
import { Container, Header } from 'semantic-ui-react'

import CraftingPlan from './CraftingPlan'
import CraftingRequirements from './CraftingRequirements'

export default function CraftingSection({recipes, dispatch}) {
  return (
    <Container textAlign='left' style={{paddingTop: '30px'}}>
    {recipes.length === 0 ? 
      <Header size='huge'>Add recipes to craft...</Header>
      :
      <React.Fragment>
        <CraftingPlan items={recipes} dispatch={dispatch} />
        <CraftingRequirements items={recipes} />
      </React.Fragment>
    }
    </Container>
  )
}
