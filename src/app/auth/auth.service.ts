import {Router} from '@angular/router';

import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
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
        });
      } else {
        this.token = null;
      }
    });
  }

  signupUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  signinUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth).then(() => {
      this.token = null;
      this.router.navigate(['/']);
    });
  }

  getToken() {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return currentUser.getIdToken().then((token) => {
        this.token = token;
        return token;
      });
    } else {
      return Promise.resolve(null);
    }
  }

  isAuthenticated() {
    return this.token != null;
  }
}
