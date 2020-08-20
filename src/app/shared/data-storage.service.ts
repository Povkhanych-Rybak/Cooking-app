import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map , tap, take, exhaustMap } from 'rxjs/operators';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}


  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://cooking-app-50980.firebaseio.com/recipes.json', recipes)
      .subscribe( (response) => {
      });
  }

  fetchRecipes() {
    // take 1 value from the info the Subject emits and unsubscribe
    // we get the token of the curr logined user. exhaustMap will merge the Observable once the 1st Obs is completed
    return this.http.get<Recipe[]>
    ('https://cooking-app-50980.firebaseio.com/recipes.json')
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

//exhaustMap() waits for the 1st Observable to complete and when it is completed the whole method will have the last Observable to return

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
