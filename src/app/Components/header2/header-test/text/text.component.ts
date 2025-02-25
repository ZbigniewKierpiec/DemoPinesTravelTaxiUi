import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-text',
  imports: [CommonModule , NgFor],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  standalone: true,
  animations: [
    trigger('letterAnimation', [
      transition(':enter', [
        query('span:not([class="space"])', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          stagger(100, [
            animate('0.6s cubic-bezier(0.25, 1, 0.5, 1)',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]


})
export class TextComponent {

  letters: { letter: string, isSpace: boolean }[] = [];
  fullText = 'Pines Executive Travel';

  constructor() {

      this.splitText();


  }
  delay = 700;
  splitText() {
    this.letters = [];

    this.fullText.split('').forEach((char) => {

      this.letters.push({ letter: char, isSpace: char === ' ' });
    });
  }




}
