import React, { useState, useEffect } from 'react'
import { Sidebar, Segment, List, Input, Button } from 'semantic-ui-react'
import escapeRegExp from 'lodash.escaperegexp'
import useDebounce from './useDebounce'
import { items as itemJson } from './Items'
import Craftable from './Craftable'
import './ItemSidebar.css'

export default function ItemSidebar({children, dispatch}) {
  //const [items, setItems] = useState(itemJson)

  // Search states
  const [searchResult, setSearchResult] = useState(itemJson)
  const [searchValue, setSearchValue] = useState('')
  const [isSearchLoading, setSearchLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const debouncedSearchValue = useDebounce(searchValue, 100)

  useEffect(() => {
    if(searchValue) {
      setSearchLoading(true)

      const data = itemJson
      const regExTerms = escapeRegExp(searchValue).split(' ').map(term => new RegExp(term, 'i'))
      const isMatch = (result) => regExTerms.reduce((prev, term) => prev && term.test(result.name + result.category), true)
      const results = data.filter(isMatch)

      setSearchLoading(false)
      setSearchResult(results)
    } else {
      setSearchResult(itemJson)
    }
  }, [debouncedSearchValue])

  return (
  <Sidebar.Pushable
    style={{
      height: '100vh',
      overflowY: 'auto'
    }}
  >
    <Sidebar
      vertical
      inverted
      visible={sidebarOpen}
      as={Segment}
      animation='push'
      direction='left'
      icon='labeled'
    >
      <Segment inverted>
        <Input
          fluid
          icon='search'
          placeholder='Search...'
          onChange={e => setSearchValue(e.target.value)}
          loading={isSearchLoading}
          />
        <List inverted divided verticalAlign='middle'>
        {searchResult.map(item => (
          <Craftable
            key={item.name}
            item={item}
            handle={() => {
              dispatch({type: 'ADD_ITEM', item: item})
            }}/>
        ))}
        </List>
      </Segment>
    </Sidebar>
    <Sidebar.Pusher
      style={{
        height: '100%',
        overflowY: 'auto'
      }}
    >
      <Button
        color='black'
        floated='left'
        attached='right'
        onClick={() => setSidebarOpen(!sidebarOpen)}
        icon={sidebarOpen ? 'caret left' : 'caret right'}
        style={{
          width: '23px',
          height: '40px',
          textAlign: 'left',
          paddingTop: '10px',
          paddingLeft: '0',
          fontSize: '20px'
        }}
        />
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  )
}
