import React, { useState, useEffect, useMemo } from 'react'
import { Sidebar, Segment, List, Icon, Accordion, Dropdown } from 'semantic-ui-react'
import { items as itemJson, getCategories } from './Items'
import Craftable from './Craftable'

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
      visible='true'
      as={Segment}
      animation='uncover'
      direction='left'
      icon='labeled'
    >
      <Segment inverted>
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
