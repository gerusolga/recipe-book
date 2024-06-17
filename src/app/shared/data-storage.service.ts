import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {map, Observable} from "rxjs";


@Injectable({providedIn: 'root'})

export class DataStorageService {
  constructor(private http: HttpClient) {
  }

  storeRecipes(recipes: Recipe[]): Observable<any> {
    return this.http.put('https://recipe-book-yt-16a79-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes);

  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://recipe-book-yt-16a79-default-rtdb.europe-west1.firebasedatabase.app/recipes.')
      .pipe(map((responseData: Recipe[])=>{
        return responseData;
      })
    );
  }

}
