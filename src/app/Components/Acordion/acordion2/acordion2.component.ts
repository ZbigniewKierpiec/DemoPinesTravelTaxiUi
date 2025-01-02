import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-acordion2',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './acordion2.component.html',
  styleUrl: './acordion2.component.scss',

  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class Acordion2Component {
  translate: TranslateService = inject(TranslateService);

  sections = [
    { title: 'book_e-1', content: 'book_e-2' ,expanded:false},
    { title: 'book_f-1', content: 'book_f-2' ,expanded:false},
    { title: 'book_g-1', content: 'book_g-2' ,expanded:false},
    { title: 'book_h-1', content: 'book_h-2' ,expanded:false},
  ];
  expandedSectionIndex: number | null = null;
  active: boolean = true;

  toggleSection(index: number): void {
    if (this.expandedSectionIndex === index) {
      // Clicked on the already expanded section, so collapse it
      this.expandedSectionIndex = null;
      this.sections.forEach((f) => (f.expanded = true));
    } else {
      // Collapse the previously expanded section
      this.expandedSectionIndex = index;
      this.sections.forEach((f) => (f.expanded = false));
    }
  }

  isSectionExpanded(index: number): boolean {
    return this.expandedSectionIndex === index;
  }


}
