import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // recipesChanged will track recipes after changes in a form
    this.recipesService.recipesChanged
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

}
