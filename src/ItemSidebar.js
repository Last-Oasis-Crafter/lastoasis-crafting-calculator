import React, { useState, useEffect } from 'react'
import { Sidebar, Segment, List, Input, Button } from 'semantic-ui-react'
import escapeRegExp from 'lodash.escaperegexp'
import useDebounce from './useDebounce'
import { items as itemJson } from './Items'
import Craftable from './Craftable'
import './ItemSidebar.css'

export default function ItemSidebar({children, dispatch}) {
  const craftables = itemJson.filter(item => item.crafting && item.crafting.length > 0)
  // Search states
  const [searchResult, setSearchResult] = useState(craftables)
  const [searchValue, setSearchValue] = useState('')
  const [isSearchLoading, setSearchLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [onlyShowCraftables, setOnlyShowCraftables] = useState(true)

  const debouncedSearchValue = useDebounce(searchValue, 100)

  useEffect(() => {
    setSearchLoading(true)
    let results = onlyShowCraftables ? craftables :  itemJson
    if(searchValue) {

      const regExTerms = escapeRegExp(searchValue).split(' ').map(term => new RegExp(term, 'i'))
      const isMatch = (result) => regExTerms.reduce((prev, term) => prev && term.test(result.name + result.category), true)
      results = results.filter(isMatch)
    }

    setSearchLoading(false)
    setSearchResult(results)
  }, [debouncedSearchValue, onlyShowCraftables])

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
      width='wide'
      animation='push'
      direction='left'
      icon='labeled'
    >
      <Segment inverted>
        <div style={{textAlign: 'right'}}>
          <span style={{
              padding: '5px',
              marginBottom: '30px',
              //backgroundColor: onlyShowCraftables ? '#1b1c1d' : 'white',
              color: onlyShowCraftables ? 'white' : 'rgba(150,150,150,.87)',
              lineHeight: '0',
              borderRadius: '10px',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => {setOnlyShowCraftables(!onlyShowCraftables)}}>
            {onlyShowCraftables ? 'Show all items' : 'Only show craftables'}
          </span>
        </div>
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
