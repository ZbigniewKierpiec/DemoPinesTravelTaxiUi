import { Component, inject, Input, input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { expand } from 'rxjs';
@Component({
  selector: 'app-acordion',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './acordion.component.html',
  styleUrl: './acordion.component.scss',

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
export class AcordionComponent {
  translate: TranslateService = inject(TranslateService);
  sections = [
    { title: 'book_a-1', content: 'book_a-2', expanded: false },
    { title: 'book_b-1', content: 'book_b-2', expanded: false },
    { title: 'book_c-1', content: 'book_c-2', expanded: false },
    { title: 'book_d-1', content: 'book_d-2', expanded: false },
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
