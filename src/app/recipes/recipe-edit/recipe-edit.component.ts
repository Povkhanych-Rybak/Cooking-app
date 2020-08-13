import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  // check if new recipe vs. edit mode
  editMode = false;
  recipeForm: FormGroup;

  constructor( private route: ActivatedRoute,
    private recipesService: RecipesService) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //switch to edit mode if true
        this.editMode = params['id'] !=null;
        this.initForm();
        this.onSubmit();
      }
    );


  }

  onSubmit() {
    if (this.recipeForm.valid) {
    console.log('Form  submitted', this.recipeForm);
    const formData = {... this.recipeForm.value};
    }
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if(this.editMode) {
      const recipe = this.recipesService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }


}
