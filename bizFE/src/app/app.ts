import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Businesses } from './businesses/businesses';
import { Navigation } from './navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Businesses, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Business review';
}
