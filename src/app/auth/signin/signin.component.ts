import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private authService: AuthService, private router: Router) {
  }


  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password)
      .then(() => {
        console.log('Signin complete'); // Отладочное сообщение
      })
      .catch(error => {
        console.error('Signin error:', error);
      });
  }
}
