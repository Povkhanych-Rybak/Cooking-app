import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params, Router} from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //switch to edit mode if true
        this.editMode = params['id'] !=null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.recipeForm.valid) {
      if(this.editMode) {
        this.recipesService.updateRecipe(this.id, newRecipe);
      } else {
        this.recipesService.addRecipe(newRecipe);
      }
    }
    //as our form is similar to our recipe Model => \
    // newRecipe = this.recipeForm.value
    this.onCancel();
  }

  onAddIngrediet() {
    // inform TS about the type of our control which we want to add
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index: number) {
    // removeAt() removes a spec FormControl at the ment pos
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipesService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                // custom regex valid. should be exec as Ang should configure it with an arg
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter for controls
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    //this.router.navigate(['']);
    // navigate(['../'], {relativeTo: this.route}) will take us 1 step up
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
