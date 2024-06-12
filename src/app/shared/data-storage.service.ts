import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/resipe.service";
import {Recipe} from "../recipes/recipe.model";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})

export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes(): Observable<any> {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://recipe-book-yt-16a79-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes);

  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://recipe-book-yt-16a79-default-rtdb.europe-west1.firebasedatabase.app/recipes.' +
      'json');
  }

}
