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

  signupUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  .then(result => {
      return result.user.getIdToken().then(token => {
        this.token = token;
        console.log('Signup successful, token:', this.token);
        this.router.navigate(['/recipes']);
      });
    })
      .catch(error => {
        console.error('Signup error:', error);
      });
  }

  signinUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        return result.user.getIdToken().then(token => {
          this.token = token;
          console.log('Signin successful, token:', this.token);
          this.router.navigate(['/recipes']); // Перенаправление после успешного входа
        });
      })
      .catch(error => {
        console.error('Signin error:', error);
      });
  }

  logout() {
    signOut(auth).then(() => {
      console.log('Logged out successfully');
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
