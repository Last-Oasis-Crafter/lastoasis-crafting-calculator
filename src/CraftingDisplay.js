import React, { useState, useEffect } from 'react'
import { Segment, Header, List, Dropdown, Button, Icon, Image, Label, Container, Input } from 'semantic-ui-react'
import NumberInput from 'semantic-ui-react-numberinput';
import './crafting.css'

export default function CraftingDisplay({crafting, dispatch}) {
  // const [materials, setMaterials] = useState({})
  const [header, setHeader] = useState('')

  useEffect(() => {
    setHeader(crafting.length > 0 ? 'Crafting:' : 'Add recipes to craft...')
    // const mats = items.reduce((mats, item) => {
    //   item.
    // }, {})
  }, [crafting])


  // TODO refactor this now that json is updated
  // TODO refactor this to smaller components
  // TODO use cards for crafting items
  // TODO separate display of recipe, and the dropdown
  return (
    <Container>
      <Header style={{paddingTop: '30px'}} size='huge'>{header}</Header>
      <List divided style={{}}>
        {crafting.map( craft => {
          const item = craft.item
          const count = craft.count
          const recipes = item.crafting || []
          // []
          let recipeOptions = recipes
          recipeOptions = recipeOptions.map((recipeOption, index) => ({
            ...recipeOption,
            text: (
              <List>
                {recipeOption.ingredients.map(ingredient => 
                  <List.Item>{ingredient.count}x {ingredient.name}</List.Item>
                )}
                {recipeOption.station &&
                  <List.Description>Crafted at {recipeOption.station}</List.Description>
                }
              </List>),
            value: index,
          }))

          return (
            <List.Item key={item.name} style={{paddingTop: '10px'}}>
              <List.Header className='selectable'>
                <Button basic icon='trash' onClick={() => dispatch({type: 'REMOVE_ITEM', name: item.name})}/>
                <NumberInput
                  className='countInput'
                  buttonPlacement='right'
                  minValue={1}
                  maxValue={999}
                  allowEmptyValue={false} onChange={(value) =>
                    dispatch({type: 'SET_COUNT', name: item.name, count: value})
                  }
                  value={count}/>
                  {item.name}
                </List.Header>
              <List.Content>
              {item.crafting && ((item.crafting.length > 1 &&
                <React.Fragment>
                  <div style={{paddingTop: '10px'}}>Recipes:</div>
                  <Dropdown
                    inline
                    scrolling
                    labeled
                    renderLabel={() => 'Requires: '}
                    defaultValue={recipeOptions[0].value}
                    options={recipeOptions}>
                  </Dropdown>
                </React.Fragment>
              ) || (
                <Container>
                  {recipeOptions[0].text}
                </Container>
              ))}
              </List.Content>
            </List.Item>
          )
        })}
      </List>
    </Container>
  )
}
