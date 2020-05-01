import React, { useState, useEffect } from 'react'
import { Accordion, Icon, Image } from 'semantic-ui-react'
import EditableNumberText from './EditableNumberText';
import Recipe from './Recipe';

export default function CraftingCard({item, dispatch, index}) {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(0)
  const [active, setActive] = useState(true)

  // set recipes
  useEffect(() => {
    if(item.crafting && item.crafting.length > 0) {
      setRecipes(item.crafting)
    }
  }, [item])
  
  // TODO add dropdown to select the recipe to use

  return (
    <React.Fragment>
      <Accordion.Title
        active={true}
        index={index}
        onClick={e => setActive(!active)}
      >
        {recipes.length > 0 &&
        <Icon name={active ? 'caret down' : 'caret right'}/>
        }
        <EditableNumberText
          key={item.name+item.count}
          initialValue={item.count}
          min={1}
          max={999999}
          save={count => dispatch({
            type: 'SET_COUNT',
            count: parseInt(count) || item.count,
            name: item.name
          })}
          suffix='x'
        /> {item.name}
        <Image floated='right'>
          <Icon
            name='trash'
            onClick={e => dispatch({type: 'REMOVE_ITEM', name: item.name})}
          />
        </Image>
      </Accordion.Title>
      {recipes.length > 0 &&
      <Accordion.Content active={active}>
        <Recipe recipe={recipes[selectedRecipe]} qty={item.count} />
      </Accordion.Content>}
    </React.Fragment>
  )
}
