import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService) {
  }

  // Ang will run the resolver before entering the route we attached it to. It is used for getting needed data before the page route is loaded
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // no need to subscribing here 'cause Resolve'll subscribe for you to find out when the data is there
    // no need to load recipes from a server if we already have ones
    const recipes = this.recipesService.getRecipes();
    if(recipes.length == 0) {
      return this.dataStorageService.fetchRecipes();
    }
    else {
      return recipes;
    }
  }
}
