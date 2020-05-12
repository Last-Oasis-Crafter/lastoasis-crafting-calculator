import React, { useState, useEffect, useMemo } from 'react'
import { Sidebar, Segment, List, Input, Button } from 'semantic-ui-react'
import escapeRegExp from 'lodash.escaperegexp'
import useDebounce from '../hooks/useDebounce'
import Craftable from './Craftable'
import './ItemSidebar.css'
import useItems from '../hooks/useItems'

export default function ItemSidebar({children, dispatch}) {
  // Search states
  const [{ items, isLoading }, fetchItems] = useItems() 
  const craftables = useMemo(() => items.filter(item => item.crafting && item.crafting.length > 0), [items])
  const [searchValue, setSearchValue] = useState('')
  const [isSearchLoading, setSearchLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [onlyShowCraftables, setOnlyShowCraftables] = useState(true)
  
  const debouncedSearchValue = useDebounce(searchValue, 400)

  const searchResult = useMemo(() => {
    setSearchLoading(true)
    let results = onlyShowCraftables ? craftables :  items

    if(searchValue) {

      const regExTerms = escapeRegExp(searchValue).split(' ').map(term => new RegExp(term, 'i'))
      const isMatch = (result) => regExTerms.reduce((prev, term) => prev && term.test(result.name + result.category), true)
      results = results.filter(isMatch)
    }
    
    setSearchLoading(false)
    return results
  }, [debouncedSearchValue, onlyShowCraftables, items])
  
  useEffect(() => {
    fetchItems()
  }, [])
  
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
          loading={isSearchLoading || isLoading}
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
