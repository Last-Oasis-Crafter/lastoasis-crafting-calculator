import React from 'react'
import Craftable from './Craftable'
import { List } from 'semantic-ui-react'
import VirtualList from 'react-tiny-virtual-list'
import useWindowDimensions from './useWindowDimensions'

export default function SearchResults({results, dispatch, mobile}) {
  const {height} = useWindowDimensions()

  if(mobile) return (
    <List inverted verticalAlign='middle' style={{height: '100%'}}>
      <VirtualList
        width='100%'
        height={height/2}
        itemCount={results.length}
        itemSize={30}
        renderItem={({index, style}) => 
        <Craftable
          key={results[index].name}
          item={results[index]}
          handle={() => {
            dispatch({type: 'ADD_ITEM', item: results[index]})
          }}
          style={style}
          mobile={mobile}/>
        }
      />
    </List>
  )
  else return (
    <List inverted divided verticalAlign='middle'>
      {results.map(item => (
        <Craftable
          key={item.name}
          item={item}
          handle={() => {
            dispatch({type: 'ADD_ITEM', item: item})
          }}/>
      ))}
    </List>
  )
}
