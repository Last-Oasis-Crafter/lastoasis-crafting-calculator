import React, { useEffect, useState, useRef } from 'react'
import { Segment, List, Header, Icon, Popup } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'

export default function CraftingRequirements({items}) {
  const [materials, setMaterials] = useState({})
  const [copyOpen, setCopyOpen] = useState(false)
  const listDiv = useRef(null)

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
    <Segment basic id="requirements">
      <List>
        <Header>
        <Popup
          content='Copied!'
          size='tiny'
          inverted
          open={copyOpen}
          trigger={<Icon
            name='copy'
            onClick={(e) => setCopyOpen(true)}
            style={{
              fontSize: '16px',
              cursor: 'pointer'
            }} />}
        />Crafting will require:
        </Header>
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
