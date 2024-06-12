import {Component, OnInit} from '@angular/core';


const firebaseConfig = {

  apiKey: "AIzaSyA0tn961cGEcQCehJJWV-EPvVOOzy2tZDA",
  authDomain: "recipe-book-angular-a0e86.firebaseapp.com",
  projectId: "recipe-book-angular-a0e86",
  storageBucket: "recipe-book-angular-a0e86.appspot.com",
  messagingSenderId: "718445145919",
  appId: "1:718445145919:web:10988242cabed1efe0ad8a"
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

  // loadedFeature = 'recipe';


  async ngOnInit() {
    const {initializeApp} = await import('firebase/app');
    const {getAuth} = await import('firebase/auth');
    const {getFirestore} = await import('firebase/firestore');
    const {getStorage} = await import('firebase/storage');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

  }


}
