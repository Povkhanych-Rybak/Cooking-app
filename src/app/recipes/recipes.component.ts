import { Component, OnInit } from '@angular/core';

//import { Recipe } from "./recipe.model";
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']

})

export class RecipesComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  }

  // import { Recipe } from "./recipe.model";
  // import { RecipesService } from './recipes.service';

// export class RecipesComponent implements OnInit {
//   selectedRecipe: Recipe;
//
//   constructor(private recipesService: RecipesService) { }
//
//   ngOnInit() {
//     this.recipesService.recipeSelected
//       .subscribe( (recipe: Recipe) => {
//         this.selectedRecipe = recipe;
//     })
//   }
// }
