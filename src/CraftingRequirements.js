import copy from 'copy-to-clipboard'
import React, { useEffect, useRef, useState } from 'react'
import { Header, Icon, List, Popup, Segment } from 'semantic-ui-react'

export default function CraftingRequirements({items}) {
  const [materials, setMaterials] = useState({})
  const [copyOpen, setCopyOpen] = useState(false)
  const listDiv = useRef(null)

  useEffect(() => {
    const mats = {}

    items.forEach(item => {
      const ingredients = item.recipes ? item.recipes[0].ingredients : [{name: item.name, count: 1}]
      ingredients.forEach(ingredient => {
        mats[ingredient.name] = (mats[ingredient.name] || 0) + (ingredient.count * item.count)
      })
    })
    setMaterials(mats)
  }, [items])

  useEffect(() => {
    if(copyOpen) {
      copy(Object.keys(materials).reduce(
        (prev, key) =>`${prev}\r\n${materials[key]}x ${key}`,
        '').replace('\r\n', '')
      )
      const timeout = setTimeout(() => {
        setCopyOpen(false)
      }, 500);
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copyOpen])

  return (
    <Segment basic>
      <List>
        <Popup
          content='Copied!'
          size='small'
          inverted
          open={copyOpen}
          trigger={<Icon
            name='copy'
            onClick={(e) => setCopyOpen(true)}
            style={{
              float: 'left',
              cursor: 'pointer'
            }} />}
        />
        <Header>Crafting will require:</Header>
        <div ref={listDiv}>
        {Object.keys(materials).map(key => (
          <List.Item className='recipe' key={key}>
            <div style={{display: 'inline-block'}}>
              <span className='ingredientQty'>{materials[key]}x&nbsp;</span>
              <span className='ingredientName'>{key}</span>
            </div>
          </List.Item>
        ))}
        </div>
      </List>
    </Segment>
  )
}
