export default function(state, action) {
  switch(action.type) {
    case 'ADD_ITEM':
      const existingIndex = state.findIndex(item => item.name === action.item.name)
      const newState = state.slice()
      if(existingIndex < 0) {
        newState.push({
          ...action.item,
          count: 1
        })
        return newState
      } else {
        return newState.map(item => 
          item.name === action.item.name ? {
            ...item,
            count: item.count + 1 > 999 ? 999 : item.count + 1
          } : item)
      }
    case 'SET_COUNT':
      let count = action.count
      count = count > 999 ? 999 : count
      count = count < 1 ? 1 : count
      if(count > 0 ) {
        const newState = state.slice()
        return newState.map(item => 
          item.name === action.name ? {
            ...item,
            count: count
          } : item)
      }
    case 'REMOVE_ITEM':
      return state.slice().filter(item => item.name !== action.name)
    default:
      throw new Error('Reached default state of CraftingReducer ' + JSON.stringify(action))
  }
}
