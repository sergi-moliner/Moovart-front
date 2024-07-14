import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  validateField(fieldName: string) {
    const field = this.loginForm.get(fieldName);
    field?.markAsTouched();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          const userId = response.data.user.id; // Accede al ID del usuario
          console.log('User ID:', userId);
          console.log('Login successful', response);
          this.router.navigate(['/home']); // Redirigir al perfil del usuario
        },
        error => {
          console.log('Login failed', error);
          this.loginError = 'Invalid email or password'; // Mensaje de error
        }
      );
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    this.loginForm.markAllAsTouched();
  }
}
