import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../services/authentication.service'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.registerForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        // CustomValidators.passwordContainsNumber
      ]],
      passwordConfirm: [null, [Validators.required]],
    }, {
      // validators: CustomValidators.passwordMatches
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }
    console.log(this.registerForm.value)
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login'])),
    ).subscribe()
  }

}
