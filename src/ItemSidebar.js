import React, { useState, useEffect, useMemo } from 'react'
import { Sidebar, Segment, List, Icon, Accordion, Dropdown } from 'semantic-ui-react'
import { items as itemJson, getCategories } from './Items'
import Craftable from './Craftable'
import './ItemSidebar.css'

export default function ItemSidebar({children}) {
  const [items, setItems] = useState(itemJson)
  const categoryTree = useMemo(() => getCategories(), [])

  return (
  <Sidebar.Pushable
    as={Segment}
    style={{height: '100vh'}}
  >
    <Sidebar
      vertical
      inverted
      visible
      as={Segment}
      animation='uncover'
      direction='left'
      icon='labeled'
    >
      <Segment inverted>
        {categoryDropdown(categoryTree)}
        <List inverted divided verticalAlign='middle'>
        {items.map(item => (
          <Craftable item={item} />
        ))}
        </List>
      </Segment>
    </Sidebar>
    <Sidebar.Pusher>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  )
}

function categoryDropdown(tree) {
  let children = []
  const topLevel = tree.model.id === 'categories'
  const idText = tree.model.id.split(' ')
    .map(word => word.replace(/^\w/, c => c.toUpperCase()))
    .join(' ')

  if(tree.hasChildren()) {
    children = tree.children.map(child => categoryDropdown(child))
    return (
      <Dropdown text={idText} pointing='top left' clearable compact className='link item'>
        <Dropdown.Menu id={topLevel ? 'categoryMenuTop' : 'categoryMenu'}>
          <Dropdown.Header className='link item'>{topLevel ? 'Clear Filter' : `Show ${idText}`}</Dropdown.Header>
          <Dropdown.Divider />
          {children}
        </Dropdown.Menu>
      </Dropdown>
    )
  } else {
    return <Dropdown.Item>{idText}</Dropdown.Item>
  }
}
