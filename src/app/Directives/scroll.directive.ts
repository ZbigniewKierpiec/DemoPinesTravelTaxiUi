import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appScroll]',
  standalone: true,
})
export class ScrollDirective {
  @Input('appScroll') targetNumber: number = 1000; // Number to scroll to
  @Input() duration: number = 2000; // Duration for scrolling animation
  private hasScrolled = false; // Prevent multiple triggers

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observeVisibility();
  }

  private scrollToNumber(target: number, duration: number) {
    let start = 0;
    const range = target - start;
    const startTime = Date.now();
    const endTime = startTime + duration;

    const run = () => {
      const now = Date.now();
      const remaining = Math.max((endTime - now) / duration, 0);
      const progress = 1 - remaining;
      const currentNumber = Math.floor(progress * range + start);
      this.el.nativeElement.innerText = currentNumber;

      if (now < endTime) {
        requestAnimationFrame(run);
      } else {
        this.el.nativeElement.innerText = target;
      }
    };

    run();
  }

  private observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasScrolled) {
            this.hasScrolled = true;
            this.scrollToNumber(this.targetNumber, this.duration);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    observer.observe(this.el.nativeElement);
  }
}
