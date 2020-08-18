import { Component, OnInit } from '@angular/core';
//import { Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
//@Output() featureSelected = new EventEmitter<string>();
  constructor(
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
  }

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}

//my solution of pseudo-routing
// export class HeaderComponent implements OnInit {
//   feature: string;
// @Output() selectPage = new EventEmitter<string>();
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
//   onSelect(feature: string) {
//     this.feature = feature;
//     this.selectPage.emit(this.feature);
//   }
