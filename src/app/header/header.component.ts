import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //to be notified about the changes in user auth status: if (user != null) we have an auth user
    this.userSub = this.authService.user.subscribe( (user) => {
      this.isAuthenticated = !user ? false : true;
      //this.isAuthenticated = !!user;
    });
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

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
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
