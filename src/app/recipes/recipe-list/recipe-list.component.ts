import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // recipesChanged will track recipes after changes in a form
    this.subscription = this.recipesService.recipesChanged
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      })
    //we get only the copy of the array
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    //this.router.navigate(['/recipes', 'new']);
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
