export default function(state, action) {
  switch(action.type) {
    case 'ADD_ITEM':
      const existingIndex = state.findIndex(craft => craft.item.name === action.item.name)
      const newState = state.slice()
      if(existingIndex < 0) {
        newState.push({
          item: action.item,
          count: 1
        })
        return newState
      } else {
        return newState.map(craft => 
          craft.item.name === action.item.name ? {
            ...craft,
            count: craft.count + 1
          } : craft)
      }
    case 'SET_COUNT':
      if(action.count > 0) {
        const newState = state.slice()
        return newState.map(craft => 
          craft.item.name === action.name ? {
            ...craft,
            count: action.count
          } : craft)
      }
    case 'REMOVE_ITEM':
      return state.slice().filter(craft => craft.item.name !== action.name)
    default:
      throw new Error('Reached default state of CraftingReducer ' + JSON.stringify(action))
  }
}
