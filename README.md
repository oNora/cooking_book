Description
============

###Simple HTML / JS application that allows user to manage cooking recipes.
<br />Demo link: http://onora.github.io/cooking_book/

Features:
- entering and storing recipes - each recipe has a name and a set of ingredients
- entering list of available ingredients
- search for recipes based on the available ingredients. The search returns the 
  list of recipes that can be prepared using the available ingredients.

###Example

If the known recipes are:
  
      Boiled eggs -> Eggs; 
      BLT Sandwich -> Bacon, Lettuce, Tomato, Bread; 
      American Breakfast -> Eggs, Bacon, Bread;
      French Fries -> Potatoes;

and the available ingredients are:

      Bread, Bacon and Potatoes

The search results are:

      BLT Sandwich
      American Breakfast
      French Fries

Recipes are entering and storing in one view of the application. Entering list of available ingredients and search on another.

This application is a prototype, so it may use localStorage to store the recipes, but it is designed so that changing the storage to a RESTful server requires almost no changes at all.
