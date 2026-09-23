import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  readonly isOpen = signal(false);

  //Toogles hamburger menu in mobile view
  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  //Close hamburger menu
  close(): void {
    this.isOpen.set(false);
  }

  //Open hamburger menu
  open(): void {
    this.isOpen.set(true);
  }
}
