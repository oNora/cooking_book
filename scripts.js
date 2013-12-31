var clObject = {
	// Tracking of different clicks on the page
	init : function(){
		//event for search button on left side
		$("body").on('click', '#SearchButton', function (e) {
			e.preventDefault();
			$("#right_wrapper").html('<h1 class="title_right">Search for Recipes</h1><form id="search_form"><label for="search_field">White the ingredients, separated by ", ": </label><input type="text" id="search_field"/><input type="submit" value="Search"/></form>')
			
			//If you already have recipes to show the relevant ingredients
			var allIngredients = [];
			if(localStorage.length>0){
	  			for(var i=0;  i<localStorage.length; i++) {
					var currentID = parseInt(localStorage.key(i));
			    	var recipeInfo = $.parseJSON(localStorage[currentID]);
			    	var currentIngredients = recipeInfo.ingredients;
			    	// console.log(currentIngredients);
			    	var arrayIngredients = currentIngredients.split(', ');
			    	// console.log(arrayIngredients);

			    	var arrayIngredientsLen = arrayIngredients.length;

			    	for(var y=0; y<arrayIngredientsLen; y++){
			    		var valueIngredient = arrayIngredients[y];
			    		// console.log(valueIngredient);
						var statusIng = allIngredients.indexOf(valueIngredient);
						if(statusIng == -1){
							allIngredients.push(valueIngredient);
							// console.log(allIngredients);
						}
			    	}
						    
				}
				var resultIng = allIngredients.join(", ");
				$("#right_wrapper").append('<div><span class="choose">Choose from available  ingredients: </span><span class="ingredients">'+resultIng+'</span></div>')
			}
			else{
				$("#right_wrapper").append('<span class="wrong">There are not available ingredients. First enter recipes.</span>')
			}
		});

		//event for add button on the left side
		$("body").on('click', '#AddButton', function (e) {
			e.preventDefault();
			$("#right_wrapper").html('<h1 class="title_right">Add a new Recipe</h1><form  id="add_form"><label for="title_field">Write a title: </label><input type="text" id="title_field" /><br /><label for="ingredients_field">White the ingredients, separated by ", ": </label><textarea rows="4" cols="50" id="ingredients_field"></textarea><input type="submit" value="Add"/></form>')
		});

		//event for submit button in add form on right side
		$("body").on('submit', 'form#add_form', function (e) {
			e.preventDefault(e);
			var recipeTitle = $("input:first").val();
			var recipeIngredients = $("textarea").val();
			// console.log(recipeTitle);
			// console.log(recipeIngredients);

			// for unique ID for each new recipe
			var recipeId = 0;
			var oldIdValue= 0;
			if (localStorage.length == 0){
				recipeId =1;
			}
			else{

				for(var i=0;  i<localStorage.length; i++) {
			    	var currentValue = parseInt(localStorage.key(i));
			    	// console.log(currentValue);
			    	// console.log(recipeId);
			    	// console.log(oldIdValue);
			    	if (currentValue>oldIdValue) {
			    		recipeId=currentValue;
			    	}
			    
				}
				recipeId = recipeId + 1;
			}
			// console.log(recipeId);
			if((recipeTitle.length>0) && (recipeIngredients.length>0)) {
				clObject.recipePost(recipeId, recipeTitle, recipeIngredients);
				$("#right_wrapper span.wrong").remove();
			}
			else {
				$("#right_wrapper").append('<span class="wrong">Please enter Title and  Ingredients!</span>');
			}

			return false;
		});

		//To show the recipe's content, after click on "li" list on the left side
		$("body").on('click', 'ul li a', function (e) {
			e.preventDefault();
			var clickRecipeClass = $(this).parent().attr("class");
			// console.log(clickRecipeClass);
			clObject.recipeGet(clickRecipeClass);
		});

		//search for recipes by ingredients
		$("body").on('submit', 'form#search_form', function (e) {
			e.preventDefault(e);
			var enteryIng = $("input:first").val();
			//console.log(enteryIng);
			var enteryArr = enteryIng.split(", ");
			//console.log(enteryArr);

			//function for the loop "for" on 130 line
			var allRecipes = [];
			function checkRecipe(enteryVal){
				if(localStorage.length>0){
		  			for(var i=0;  i<localStorage.length; i++) {
						var currentID = parseInt(localStorage.key(i));
				    	var recipeInfo = $.parseJSON(localStorage[currentID]);
				    	var currentIngredients = recipeInfo.ingredients;
				    	// console.log(currentIngredients);
				    	var arrayIngredients = currentIngredients.split(', ');
				    	// console.log(arrayIngredients);

							var statusIng = arrayIngredients.indexOf(enteryVal);
							if(statusIng > -1){
								var statusRecp = allRecipes.indexOf(currentID);
								if(statusRecp == -1){
									allRecipes.push(currentID);
									console.log(allRecipes);
								}

							}		    
					}
				}
			}
			//console.log(enteryIng);
			//checking each recipe by ingredient
			if(enteryIng!=""){
				for(var x=0; x<enteryArr.length; x++){
					var enteryValue = enteryArr[x];
					checkRecipe(enteryValue);
				}
				$("#right_wrapper span.wrong").remove();
			}
			else{
				$("#right_wrapper").append('<span class="wrong">Please enter some of the available Ingredients!</span>');
			}	

			// creating a list with result of recipes
			var resultRecipes = ""; 
			for(var y=0; y<allRecipes.length; y++){
				var resultRecipeId = allRecipes[y];
				var r



				esultRecipeInfo = $.parseJSON(localStorage.getItem(resultRecipeId));
				resultRecipes += "<li class='"+resultRecipeId+"'><a href='#'>"+resultRecipeInfo.title+"</a></li>";

			}
			$("#right_wrapper ul").remove();
			$("#right_wrapper").append("<ul>"+resultRecipes+"</ul>");

		});


	},

	// Create -> Post
	recipePost : function (rId, rTitle, rIngredients) {
		// console.log(rId);
		// console.log(rTitle);
		// console.log(rIngredients);

		var recipeObject = {};
		recipeObject= {title: rTitle, ingredients: rIngredients};
		// console.log(recipeObject);
		localStorage.setItem(rId, JSON.stringify(recipeObject));

		$('#list_cooking_recipes ul').append('<li class="'+rId+'"><a href="#">'+rTitle+'</a></li>');
	},

	// Update -> Put
	recipePut : function (){

	},

	// Delete -> Delete
	recipeDelete : function(){

	},

	// Read   -> Get
	recipeGet : function(cRecipeClass){
		var selectedRecipeInfo = $.parseJSON(localStorage.getItem(cRecipeClass));
		// console.log(selectedRecipeInfo);
		$("#right_wrapper").html('<h1>'+selectedRecipeInfo.title+'</h1><div>ingredients:<br /><p>'+selectedRecipeInfo.ingredients+'</p></div>')

	}
}

$(document).ready(function() {
  	clObject.init();

  	// If have already recipes, to show them
  	if(localStorage.length>0){
	  	for(var i=0;  i<localStorage.length; i++) {
			var currentID = parseInt(localStorage.key(i));
	    	var recipeInfo = $.parseJSON(localStorage[currentID]);
	    	$('#list_cooking_recipes ul').append('<li class="'+currentID+'"><a href="#">'+recipeInfo.title+'</a></li>');
				    
		}
	}
});