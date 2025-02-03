import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-birthday',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './birthday.component.html',
  styleUrl: './birthday.component.scss',
})
export class BirthdayComponent implements OnInit, OnDestroy {
  @Output() childClick = new EventEmitter<void>();
  private colors = ["#8b5642", "#6a696b"];
  private animationFrameId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private confettiInstance: any;

  @ViewChild('audioPlayer', { static: true }) audioPlayer: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  title: string = "IT IS YOUR BIRTHDAY.";
  ngOnInit() {
    this.createCanvas();
    this.startConfettiAnimation();
    this.audioPlayer.nativeElement.play();

  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.confettiInstance) {
      this.confettiInstance.reset();  // Cleanup the confetti instance
    }
    if (this.canvas) {
      this.renderer.removeChild(this.el.nativeElement, this.canvas);
    }

    this.audioPlayer.nativeElement.pause();

  }

  private createCanvas() {
    // Create a canvas element dynamically
    this.canvas = this.renderer.createElement('canvas');
    this.renderer.appendChild(this.el.nativeElement, this.canvas);

    // Make sure the canvas covers the entire screen
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      // Position the canvas above the content
      this.renderer.setStyle(this.canvas, 'position', 'fixed');
      this.renderer.setStyle(this.canvas, 'top', '0');
      this.renderer.setStyle(this.canvas, 'left', '0');
      this.renderer.setStyle(this.canvas, 'z-index', '999');
      this.renderer.setStyle(this.canvas, 'pointer-events', 'none');  // Make sure canvas does not interfere with UI

      // Create a confetti instance bound to the created canvas
      this.confettiInstance = confetti.create(this.canvas, {
        resize: true, // Resize canvas when the window is resized
        useWorker: true, // Option to use a worker for performance improvements
      });
    }
  }

  startConfettiAnimation() {
    const frame = () => {
      this.confettiInstance({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: this.colors,
      });
      this.confettiInstance({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: this.colors,
      });

      if (Date.now() < Date.now() + 15000) {
        this.animationFrameId = requestAnimationFrame(frame);
      }
    };

    frame();  // Start the animation
  }



  getAnimationDelay(letter: string): string {
    // You can customize the delay here based on the letter index
    return `${Math.random() * 5}s`;  // Random delay between 0 and 1.5 seconds
  }

close(){
  this.childClick.emit();
}




}



