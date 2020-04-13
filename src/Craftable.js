import React from 'react'
import { List, Button, Icon } from 'semantic-ui-react'

export default function Craftable({item}) {
  return (
  <List.Item>
    <List.Content floated='right'>
      <Button icon size='mini' compact>
        <Icon name='plus' />
      </Button>
    </List.Content>
    <List.Content>{item.name}</List.Content>
  </List.Item>
  )
}
