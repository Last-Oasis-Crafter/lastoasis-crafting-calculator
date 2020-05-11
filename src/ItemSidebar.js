import './ItemSidebar.css'

import escapeRegExp from 'lodash.escaperegexp'
import React, { useEffect, useState } from 'react'
import { Button, Input, List, Segment, Sidebar } from 'semantic-ui-react'

import Craftable from './Craftable'
import { items as itemJson } from './Items'
import useDebounce from './useDebounce'

export default function ItemSidebar({children, dispatch}) {
  const craftables = itemJson.filter(item => item.recipes && item.recipes.length > 0)
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
    {sidebarOpen && (
    <Button
        color='black'
        floated='left'
        attached='right'
        onClick={() => setSidebarOpen(!sidebarOpen)}
        icon={sidebarOpen ? 'caret left' : 'caret right'}
        className="bartoggle"
        />)}
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
        <span>Can't find what you're looking for? Let me know on Discord: <a href='https://discord.gg/HXmmwrb' target='_blank' rel='noopener noreferrer'>https://discord.gg/HXmmwrb</a></span>
      </Segment>
    </Sidebar>
    <Sidebar.Pusher
      style={{
        height: '100%',
        overflowY: 'auto'
      }}
    >
      {!sidebarOpen && (
      <Button
        color='black'
        floated='left'
        attached='right'
        onClick={() => setSidebarOpen(!sidebarOpen)}
        icon={sidebarOpen ? 'caret left' : 'caret right'}
        className="bartoggle"
        />
      )}
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  )
}
