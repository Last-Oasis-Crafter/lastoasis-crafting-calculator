import React, { useState, useEffect } from 'react'
import { List, Header } from 'semantic-ui-react'
import './Recipe.css'

export default function Recipe({recipe, qty=1}) {
  const [showSingle, setShowSingle] = useState(false)
  const [singleIcon, setSingleIcon] = useState()

  useEffect(() => {
    if(!showSingle) {
      setSingleIcon(
        <span
          className='singleIcon'
          onClick={e => setShowSingle(!showSingle)}
          link
          >all</span>
      )
    } else {
      setSingleIcon(
        <span
          className='singleIcon'
          onClick={e => setShowSingle(!showSingle)}
          link
          >1x</span>
      )
    }
  }, [showSingle])
  
  // TODO add dropdown to select the recipe to use

  if(recipe === undefined) return <React.Fragment />
  else return (
    <div className='recipe'>
      <Header size='tiny'>
        Selected Recipe
        {qty > 1 && singleIcon}
      </Header>
      <List >
        {recipe.ingredients.map(ingredient => (
          <List.Item>
            <span className='ingredientQty'>{ingredient.count * (showSingle ? 1 : qty)}x</span>
            <span className='ingredientName'>{ingredient.name}</span>
          </List.Item>
        ))}
      </List>
      {recipe.station && <span>Crafted at {recipe.station}</span>}
    </div>
  )
}
