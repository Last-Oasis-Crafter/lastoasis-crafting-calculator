import React, { useState, useEffect } from 'react'
import { Sidebar, Segment, List, Icon, Accordion } from 'semantic-ui-react'
import axios from 'axios'
import Craftable from './Craftable'

export default function ItemSidebar({children}) {
  const [activeCategories, setActiveCategories] = useState([])
  const [items, setItems] = useState([])
  
  const toggleAccordion = (e, titleProps) => {
    const { category } = titleProps
    const activeIndex = activeCategories.indexOf(category)
    const tempCat = [...activeCategories]

    if(activeIndex < 0) {
      tempCat.push(category)
      setActiveCategories(tempCat)
    } else {
      tempCat.splice(activeIndex, 1)
      setActiveCategories(tempCat)
    }
  }

  useEffect(() => {
    axios.get('https://api.jsonbin.io/b/5e93f885e41a7f4da62c37c5', {
        headers: {
          'secret-key': '$2b$10$gkFNwwjKAaw61xUStD721OuXFtDEb1zQVQeQwC9O0/X084gXh7.ny'
        }
      })
      .then(result => setItems(result.data))
  }, [])
  
  const categorized = items.reduce((obj, item) => {
    if(!obj.hasOwnProperty(item.category)) obj[item.category] = [];
    obj[item.category].push(item)
    return obj
  }, {})

  const categorizedItemList = Object.keys(categorized).map((category, index) => (
    <React.Fragment>
      <Accordion.Title
        active={activeCategories.indexOf(category) > -1}
        index={index}
        category={category}
        onClick={toggleAccordion}
      >
        <Icon name='dropdown' />
        {category.toUpperCase()}
      </Accordion.Title>
      <Accordion.Content active={activeCategories.indexOf(category) > -1}>
        <List divided inverted verticalAlign='middle'>
          { categorized[category].map(item => (
            
              <Craftable item={item}/>
          ))}
        </List>
      </Accordion.Content>
    </React.Fragment>
  ))

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
          <Accordion inverted>
            {categorizedItemList}
          </Accordion>
      </Segment>
    </Sidebar>
    <Sidebar.Pusher>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  )
}
