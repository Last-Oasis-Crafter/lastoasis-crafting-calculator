const fs = require('fs');
const ObjGen = require('objgen/objgen').ObjGen;

const itemObjGen = fs.readFileSync('./src/itemObjGen.txt', 'utf8');

const itemsJSON = JSON.parse(ObjGen.xJson(itemObjGen, {numSpaces: 2}));

// Sort Alphabetically by item.name
itemsJSON.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));

// Sort Alphabetically by item.category
itemsJSON.sort((itemA, itemB) => itemA.category.localeCompare(itemB.category));

fs.writeFileSync('./src/items.json', JSON.stringify(itemsJSON, null, '\t'), 'utf8');
