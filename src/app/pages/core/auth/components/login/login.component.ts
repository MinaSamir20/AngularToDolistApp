import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../shared/Modules/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/authService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private spinner = inject(NgxSpinnerService);
  private service = inject(AuthService);

  loginForm!: FormGroup;
  hide = true;

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.service.login(this.loginForm.value).subscribe({
        next: (user) => {
          this.service.setToken(user.token);
          this.toastr.success('Success', 'Login Successfully', {closeButton: true, timeOut: 500});
          this.router.navigate(['/todo']);
          this.spinner.hide();
        },
        error: () => this.toastr.error('something wrong,\n please check your email and password', 'Error', {closeButton: true, timeOut: 500}),
        complete: () => this.spinner.hide(),
      });
    }
  }
  register() {
    this.router.navigate(['account/register']);
  }
}
