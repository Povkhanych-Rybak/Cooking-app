import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map , tap} from 'rxjs/operators';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}


  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://cooking-app-50980.firebaseio.com/recipes.json', recipes)
      .subscribe( (response) => {
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://cooking-app-50980.firebaseio.com/recipes.json')
      .pipe(
        map( (recipes) => {
          return recipes.map( recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          })
        }
        ),
        //tap enables to receive data w/o changing it
        tap( (recipes) => {
          // to refresh the recipe storage with the data from DB
          this.recipesService.setRecipes(recipes);
        })
      )
  }
}

//my option
// .pipe(
//   map( (recipes) => {
//     for(let recipe of recipes) {
//       if(!recipe['ingredients']) {
//         recipe['ingredients'] = [];
//       }
//     };
//     return recipes;
//   }
//   )
// )

// put() method is avail on Firebase API and gives oportunit to send all items and rewrite their values
