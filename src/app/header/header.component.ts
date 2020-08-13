import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@Output() featureSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
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
