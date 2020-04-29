import React from 'react'
import { List, Button, Icon } from 'semantic-ui-react'

export default function Craftable({item, handle, style, mobile}) {
  if(mobile) return (
  <List.Item style={style}>
    <List.Content>
      <Button icon size='mini' compact onClick={handle}>
        <Icon name='plus' />
      </Button>{item.name}
    </List.Content>
  </List.Item>
  )
  else return (
    <List.Item>
      <List.Content floated='right'>
        <Button icon size='mini' compact onClick={handle}>
          <Icon name='plus' />
        </Button>
      </List.Content>
      <List.Content>{item.name}</List.Content>
    </List.Item>
  )
}
