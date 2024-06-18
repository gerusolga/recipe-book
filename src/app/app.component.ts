import {Component, OnInit} from '@angular/core';
import {initializeApp} from "firebase/app";


const firebaseConfig = {

  apiKey: "AIzaSyA0tn961cGEcQCehJJWV-EPvVOOzy2tZDA",
  authDomain: "recipe-book-angular-a0e86.firebaseapp.com",
  projectId: "recipe-book-angular-a0e86",
  storageBucket: "recipe-book-angular-a0e86.appspot.com",
  messagingSenderId: "718445145919",
  appId: "1:718445145919:web:10988242cabed1efe0ad8a"
};

const app = initializeApp(firebaseConfig);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA0tn961cGEcQCehJJWV-EPvVOOzy2tZDA",
      authDomain: "recipe-book-angular-a0e86.firebase.com",
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  }
