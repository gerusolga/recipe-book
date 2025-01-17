import {Component} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
   constructor(private dataStorageService: DataStorageService,
               private authService: AuthService) {

   }

  onSaveData(){
    this.dataStorageService.storeRecipes()
    subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }
  onFetchData(){
   this.dataStorageService.fetchRecipes();
  }
  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
