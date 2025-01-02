import { Component } from '@angular/core';
import { SlideshowComponent } from "./slideshow/slideshow.component";
import { PromiseComponent } from "./promise/promise.component";
import { CarsComponent } from "./cars/cars.component";
import { CarsTestComponent } from "./cars-test/cars-test.component";
import { PlanComponent } from "./plan/plan.component";
import { TimerComponent } from "./timer/timer.component";
import { SocialComponent } from "../../Layout/social/social.component";
import { FrequentlyQuestionsComponent } from "./frequently-questions/frequently-questions.component";
import { TextBannerComponent } from "../airport-transfer-component/text-banner/text-banner.component";
import { DividersComponent } from "../../Components/dividers/dividers.component";
import { DividerDownComponent } from "../../Components/dividers/divider-down/divider-down.component";
import { BookNowMobileComponent } from "../../Layout/book-now-mobile/book-now-mobile.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SlideshowComponent, PromiseComponent, CarsComponent, CarsTestComponent, PlanComponent, TimerComponent, SocialComponent, FrequentlyQuestionsComponent, TextBannerComponent, DividersComponent, DividerDownComponent, BookNowMobileComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
