import itemsJson from './items.json'
import TreeModel from 'tree-model'
var tree = new TreeModel()

export const items = itemsJson

export function getCategories() {
  const categories = []

  const categoryLists = [...new Set(
    items.map( item => item.category)
  )].map( category => category.split('/'))

  let t = tree.parse({id: 'categories'})

  categoryLists.forEach( categoryList => {
    let parent = t
    categoryList.forEach( category => {
      const current = parent.first(node => node.model.id === category)
      if(!current) {
        parent = parent.addChild(tree.parse({id: category}))
      } else {
        parent = current
      }
    })
  })

  return t
}
