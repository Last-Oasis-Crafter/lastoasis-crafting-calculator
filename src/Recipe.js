import React, { useState, useEffect } from 'react'
import { List, Header, Icon } from 'semantic-ui-react'
import './Recipe.css'

export default function Recipe({recipe, qty=1}) {
  const [showSingle, setShowSingle] = useState(false)
  const [singleIcon, setSingleIcon] = useState()

  useEffect(() => {
    if(!showSingle) {
      setSingleIcon(
        <Icon
          className='singleIcon'
          name='sort numeric ascending'
          onClick={e => setShowSingle(!showSingle)}
          link
          size='mini'
          />
      )
    } else {
      setSingleIcon(
        <Icon
          className='singleIcon'
          onClick={e => setShowSingle(!showSingle)}
          link
          size='mini'
          name='sort numeric descending'
          />
      )
    }
  }, [showSingle])

  if(recipe === undefined) return <React.Fragment />
  else return (
    <div className='recipe'>
      <Header size='tiny'>
        {qty > 1 && singleIcon}
        Selected Recipe:
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
