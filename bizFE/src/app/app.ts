import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Businesses } from './businesses/businesses';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Businesses],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Business review';
}
