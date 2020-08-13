
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipesService {
  // we have to track changes after the form is submitted
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  private recipes: Recipe[] = [
    new Recipe(
      'Lasagna',
      "An Italia dish with a magical taste",
      'https://p0.pikrepo.com/preview/757/253/pizza-on-white-ceramic-plate-thumbnail.jpg',
      [
        new Ingredient('Meat',1),
        new Ingredient('Tomatoes', 10),
      ]
    ),

    new Recipe(
      'Spagetti',
      "An Italia dish",
      'https://p0.pikist.com/photos/919/679/pasta-spaghetti-italian-food-tomato-sauce-bread-antipasti.jpg',
      [
        new Ingredient('Pasta', 1),
        new Ingredient('Cheese', 1),
      ]
    )
  ];

    getRecipes() {
      //return [...this.recipes]; my solution
      return this.recipes.slice(); //to copy an array
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }



}
