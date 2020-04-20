import React, { useEffect, useState } from 'react'
import { Segment, List, Header } from 'semantic-ui-react'

export default function CraftingRequirements({items}) {
  const [materials, setMaterials] = useState({})

  useEffect(() => {
    const mats = {}

    items.forEach(item => {
      const ingredients = item.crafting ? item.crafting[0].ingredients : [{name: item.name, count: 1}]
      ingredients.forEach(ingredient => {
        mats[ingredient.name] = (mats[ingredient.name] || 0) + (ingredient.count * item.count)
      })
    })
    setMaterials(mats)
  }, [items])

  return (
    <Segment basic>
      <List>
          <Header>Crafting will require:</Header>
        {Object.keys(materials).map(key => (
          <List.Item className='recipe'>
            <span className='ingredientQty'>{materials[key]}x</span>
            <span className='ingredientName'>{key}</span>
          </List.Item>
        ))}
      </List>
    </Segment>
  )
}
