const fs = require('fs');
const ObjGen = require('objgen/objgen').ObjGen;

const itemObjGen = fs.readFileSync('./src/itemObjGen.txt', 'utf8');

const itemsJSON = ObjGen.xJson(itemObjGen, {numSpaces: 2});

fs.writeFileSync('./src/items.json', itemsJSON, 'utf8');