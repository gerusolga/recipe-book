import {Router} from '@angular/router';

import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut} from 'firebase/auth';

import {Injectable} from '@angular/core';

const firebaseConfig = {

  apiKey: "AIzaSyA0tn961cGEcQCehJJWV-EPvVOOzy2tZDA",
  authDomain: "recipe-book-angular-a0e86.firebaseapp.com",
  projectId: "recipe-book-angular-a0e86",
  storageBucket: "recipe-book-angular-a0e86.appspot.com",
  messagingSenderId: "718445145919",
  appId: "1:718445145919:web:10988242cabed1efe0ad8a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string | null = null;

  constructor(private router: Router) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          this.token = token;
          console.log('User token:', this.token);
          this.router.navigate(['/recipes']);
        });
      } else {
        this.token = null;
        console.log('User is not authenticated');
      }
    });
  }

  signupUser(email: string, password: string): Observable<string> {
    return from(
      createUserWithEmailAndPassword(auth, email, password).then(result => {
        return result.user.getIdToken().then(token => {
          this.token = token;
          this.router.navigate(['/recipes']);
          return token;
        });
      })
    );
  }

  signinUser(email: string, password: string): Observable<string> {
    return from(
      signInWithEmailAndPassword(auth, email, password).then(result => {
        return result.user.getIdToken().then(token => {
          this.token = token;
          this.router.navigate(['/recipes']);
          return token;
        });
      })
    );
  }

  logout() {
    signOut(auth).then(() => {
      this.token = null;
      this.router.navigate(['/signin']);
    }).catch(error => {
      console.error('Logout error:', error);
    });
  }

  isAuthenticated() {
    return this.token != null;
  }
}

