import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button, ButtonModule} from 'primeng/button';
import {LandingPageComponentComponent} from "./components/landing-page-component/landing-page-component.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, LandingPageComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ui-app';
}
