import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LogingWelcomeComponent } from "../../login/loging-welcome/loging-welcome.component";

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [TranslateModule, LogingWelcomeComponent],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss'
})
export class SlideshowComponent {
  translate: TranslateService = inject(TranslateService);
}
