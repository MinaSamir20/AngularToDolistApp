import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../shared/Modules/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private spinner = inject(NgxSpinnerService);
  private service = inject(AuthService);

  registerUserForm!: FormGroup;
  hide = true;

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.registerUserForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{11}$/),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
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

  register() {
    if (this.registerUserForm.valid) {
      this.spinner.show();
      this.service.register(this.registerUserForm.value).subscribe({
        next: (user) => {
          this.toastr.success('Success', 'Register Successfully', {closeButton: true, timeOut: 500});
          this.spinner.hide();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastr.error('something wrong', 'Error', {closeButton: true, timeOut: 500});
          alert(error.message);
          this.spinner.hide();
        },
      });
    }
  }

  OnlyNumbersAllowed($event: any): boolean {
    const charCode = $event.which ? $event.which : $event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
