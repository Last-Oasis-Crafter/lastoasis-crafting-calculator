# Last Oasis Crafter
The crafting tool can be found here: https://www.lastoasiscrafter.com

# Contributing
## Adding/Updating Items
I am using [ObjGen](https://beta5.objgen.com/json/) for now because it's an easier format to type up the object data in. Sort the resulting json by name, then category. Sorting the list saves me from doing it at runtime on every client's page load.

To update the [`src/items.json`](src/items.json) file please follow these steps.
1. Update [`src/itemObjGen.txt`](src/itemObjGen.txt).
2. Run [`src/itemObjGen.txt`](src/itemObjGen.txt) through https://beta5.objgen.com/json/local/design.
3. Copy resulting json to https://codeshack.io/json-sorter/.
4. Sort using *Sort Method* `Key Value`, and *Key Name* `name`.
5. Copy resulting json from *Output Text* and sort again with *Sort Method* `Key Value` and *Key Name* `category`.
6. Locally commit `items.json` and perform a search for the items added, and some other items with the resulting json.
	* Make sure no items are sticking in the search results. I've seen items that had bad values will stick around in the results object each time I cleared search and did another search.
7. Commit, Push and [Create a Pull Request](https://github.com/Last-Oasis-Crafter/lastoasis-crafting-calculator/compare).
	* In the PR description mention where you got the data you are adding. Screenshots or links are helpful.