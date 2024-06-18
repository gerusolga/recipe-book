import {Component} from "@angular/core";
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import {RecipeService} from "../../recipes/resipe.service";
import {Recipe} from "../../recipes/recipe.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private recipeService: RecipeService) {
  }

  onSaveData() {
    const recipes = this.recipeService.getRecipes();
    this.dataStorageService.storeRecipes(recipes)
      .subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe(
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
