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

  mobileMenuService = inject(MobileMenuService); // Mobile version to toggle menu dropdown

  //Logout function in navbar and only displays when you are logged in
  logout(): void {
    this.authService.logout();
  }

  //Search function that navigate to products and display products based on searched input in navbar
  onSearch(): void {
    this.router.navigate(['/products'], { queryParams: { search: this.searchTerm() } });
    this.searchTerm.set('');
    this.mobileMenuService.close();
  }
}
