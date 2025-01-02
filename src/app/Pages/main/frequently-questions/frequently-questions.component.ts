import { Component, inject } from '@angular/core';
import { AcordionComponent } from '../../../Components/Acordion/acordion/acordion.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NgClass, NgFor } from '@angular/common';
import { Acordion2Component } from '../../../Components/Acordion/acordion2/acordion2.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-frequently-questions',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    AcordionComponent,
    Acordion2Component,
    TranslateModule,
  ],
  templateUrl: './frequently-questions.component.html',
  styleUrl: './frequently-questions.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '10rem', opacity: 1 })),
      state('out', style({ height: '0', opacity: 0 })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class FrequentlyQuestionsComponent {
  translate: TranslateService = inject(TranslateService);
  // sections = [
  //   {
  //     id: 0,
  //     title: ' How do I book a taxi? ',
  //     content:
  //       'You can book a taxi through our mobile app, by calling our dispatch center, or through our website. Simply enter your pickup location and destination, and we’ll send a taxi to you. ',

  //     expanded: false,
  //   },
  //   {
  //     id: 1,
  //     title: 'What payment methods do you accept?',
  //     content:
  //       'We accept various payment methods, including cash, credit/debit cards, and mobile payment options like Apple Pay and Google Pay. ',

  //     expanded: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Are your drivers licensed and insured?',
  //     content:
  //       'Yes, all our drivers are fully licensed, insured, and have undergone thorough background checks to ensure your safety. ',

  //     expanded: false,
  //   },

  //   {
  //     id: 3,
  //     title: 'What should I do if I left something in the taxi?',
  //     content:
  //       'If you left an item in the taxi, please contact our customer service as soon as possible with your trip details. We will do our best to help you retrieve your belongings.',

  //     expanded: false,
  //   },
  // ];
}
