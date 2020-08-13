import { Component, OnInit, OnDestroy, ViewChild,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  // to find out if we create a new comp or edit an exisitng
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(index);
            // needed to set/update form data if we make changes in a form(template);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount,
            })
          }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    // value.name , value.amount are controls name
      const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
        this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
