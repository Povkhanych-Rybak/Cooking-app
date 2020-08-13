import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
//if we replace EventEmitter with a Subject => unsubscribe()
  private igChangedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangedSub = this.shoppingListService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  // goal=> to pass index to shopping-edit comp
  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangedSub.unsubscribe();
  }
}
