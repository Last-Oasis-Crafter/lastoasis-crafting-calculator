import React, { useState, useEffect } from 'react'
import { Segment, Input, List } from 'semantic-ui-react'
import Craftable from './Craftable'
import escapeRegExp from 'lodash.escaperegexp'
import useDebounce from './useDebounce'
import { items as itemJson } from './Items'
import { useMedia } from 'react-use-media'

export default function ItemSearch({dispatch, maxHeight}) {
  const craftables = itemJson.filter(item => item.crafting && item.crafting.length > 0)
  // Search states
  const [searchResult, setSearchResult] = useState(craftables)
  const [searchValue, setSearchValue] = useState('')
  const [isSearchLoading, setSearchLoading] = useState(false)
  const [onlyShowCraftables, setOnlyShowCraftables] = useState(true)

  const isWide = useMedia({minWidth: 1100})
  const debouncedSearchValue = useDebounce(searchValue, isWide ? 400 : 1000)

  useEffect(() => {
    setSearchLoading(true)
    let results = onlyShowCraftables ? craftables :  itemJson
    if(debouncedSearchValue) {
      const regExTerms = escapeRegExp(debouncedSearchValue).split(' ').map(term => new RegExp(term, 'i'))
      const isMatch = (result) => regExTerms.reduce((prev, term) => prev && term.test(result.name + result.category), true)
      results = results.filter(isMatch)
    }

    setSearchLoading(false)
    setSearchResult(results)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue, onlyShowCraftables, isWide])

  return (
    <Segment inverted style={{
      maxHeight: maxHeight ? maxHeight : 'auto',
      overflowX: 'auto'}}>
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
        {debouncedSearchValue &&
        <span>Can't find what you're looking for? Let me know on Discord: <a href='https://discord.gg/ufDWKCS' target='_blank' rel='noopener noreferrer'>https://discord.gg/ufDWKCS</a></span>
        }
      </Segment>
  )
}
