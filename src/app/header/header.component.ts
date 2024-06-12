import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Recipe} from "../recipes/recipe.model";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {

  }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
