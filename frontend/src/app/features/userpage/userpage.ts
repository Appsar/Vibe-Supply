import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userpage',
  imports: [RouterLink],
  templateUrl: './userpage.html',
  styleUrl: './userpage.css',
})
export class Userpage {}
// Scraped component just an extra step before going to admin page. Displays if you are logged in
