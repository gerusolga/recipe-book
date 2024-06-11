import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'recipe-book';
  loadedFeature = 'recipe';


  ngOnInit() {
    firebase.initializeApp( {
      apiKey: "AIzaSyA0tn961cGEcQCehJJWV-EPvVOOzy2tZDA",
      authDomain: "recipe-book-angular-a0e86.firebaseapp.com"
    });

  }

  onNavigate(feature:string) {
    this.loadedFeature = feature;
  }
}
