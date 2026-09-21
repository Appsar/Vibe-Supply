import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { MobileMenuService } from '../../../../core/services/mobile-menu.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;
  private router = inject(Router);
  searchTerm = signal('');

  mobileMenuService = inject(MobileMenuService);

  logout(): void {
    this.authService.logout();
  }

  onSearch(): void {
    this.router.navigate(['/products'], { queryParams: { search: this.searchTerm() } });
    this.searchTerm.set('');
    this.mobileMenuService.close();
  }
}
