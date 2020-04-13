# Contributing
This doc explains how you can contribute

## Adding/Updating Items
Make a pull request with your additions or updates to src/items.json and leave a comment to explain why you've made the change.

Follow the following format:
```
{
  "name": "Bonebreaker", // capitolized with spaces
  "category": "item/vitamin", // category heirarchy top down
  "crafting": { // for multiple crafting recipes, see purified water as an example, omit section if no recipes
    "ingredients": {
      "sulfur": 30, // list each ingredient name in lowercase, then the quantity
      "glass": 1,
      "ceramic_shard": 15 // replace spaces with underscores
    },
    "station": "camp fire", // teh station this crafting recipe is built at. omit field if there is no station is used
    "unlock": { // if unlocked, include this section
      "tree": "vitamins", // the tree name it is unlocked under
      "node": "bonebreaker", // the name of the node
      "uses": "tablets", // "fragments" or "tablets"
      "cost": 10 // number of frags or tablets
    }
  }
},
```

I may make a form to fill out in the future, but use existing items for reference in the meantime.
