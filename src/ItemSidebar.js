import React, { useState, useEffect } from 'react'
import { Sidebar, Segment, List, Input, Button } from 'semantic-ui-react'
import './ItemSidebar.css'
import ItemSearch from './ItemSearch'

export default function ItemSidebar({children, dispatch}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
      <ItemSearch dispatch={dispatch} />
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
