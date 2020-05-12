export default function (state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingIndex = state.findIndex(item => item.name === action.item.name)
      const newState = state.slice()
      if (existingIndex < 0) {
        newState.push({
          ...action.item,
          count: 1
        })
        return newState
      } else {
        return newState.map(item =>
          item.name === action.item.name ? {
            ...item,
            count: item.count + 1 > 999999 ? 999999 : item.count + 1
          } : item)
      }
    case 'SET_COUNT':
      let count = action.count
      count = count > 999999 ? 999999 : count
      count = count < 1 ? 1 : count
      if (count > 0) {
        const newState = state.slice()
        return newState.map(item =>
          item.name === action.name ? {
            ...item,
            count: count
          } : item)
      }
      break;
    case 'REMOVE_ITEM':
      return state.slice().filter(item => item.name !== action.name)
    case 'REMOVE_ALL':
      return state.slice(0, 0)
    default:
      throw new Error('Reached default state of CraftingReducer ' + JSON.stringify(action))
  }
}
