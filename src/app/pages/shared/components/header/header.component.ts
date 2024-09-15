import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/components/auth/services/authService/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private logout = inject(AuthService);
  logoutUser() {
    this.logout.logout();
  }
}
