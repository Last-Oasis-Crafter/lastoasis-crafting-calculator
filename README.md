# Last Oasis Crafter
The crafting tool can be found here: https://www.lastoasiscrafter.com

# Contributing
## Adding/Updating Items
I am using [ObjGen](https://beta5.objgen.com/json/) for now because it's an easier format to type up the object data in. Sort the resulting json by name, then category. Sorting the list saves me from doing it at runtime on every client's page load.

To update the [`public/items.json`](public/items.json) file please follow these steps.
1. Update [`data/itemObjGen.txt`](data/itemObjGen.txt).
2. Run `npm run objgen`.
3. Commit, Push and [Create a Pull Request](https://github.com/Last-Oasis-Crafter/lastoasis-crafting-calculator/compare).
	* In the PR description mention where you got the data you are adding. Screenshots or links are helpful.