import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

// export const routeTransition = trigger('routeTransition', [
//   transition('*=>*', [
//     query(':enter', [style({ opacity: 0, scale: 0.9 })], { optional: true }),
//     query(':leave', [animate('2s', style({ opacity: 0, scale: 0.9 }))], {
//       optional: true,
//     }),
//     query(':enter', [animate('2s', style({ opacity: 1, scale: 1 }))], {
//       optional: true,
//     }),
//   ]),
// ]);
export const routeTransition = trigger('routeTransition', [
  transition('* => *', [
    // Leaving component slides out to the left
    query(':leave', [
      animate('0.5s ease-in-out', style({  transform: 'translateX(-100%)' }))
    ], { optional: true }),

    // Entering component slides in from the right
    query(':enter', [
      style({ opacity: 1, transform: 'translateX(100%)' }),
      animate('0.5s linear', style({  transform: 'translateX(0)' }))
    ], { optional: true })
  ]),
]);
