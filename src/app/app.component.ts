import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./Layout/layout/layout.component";
import { SocialComponent } from "./Layout/social/social.component";
import { LogingWelcomeComponent } from "./Pages/login/loging-welcome/loging-welcome.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, SocialComponent, LogingWelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
}
