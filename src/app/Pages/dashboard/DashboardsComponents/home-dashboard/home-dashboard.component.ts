import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent implements OnInit{
  greeting: string = '';



  setGreeting(): void {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good morning!';
    } else if (currentHour < 18) {
      this.greeting = 'Good afternoon!';
    } else {
      this.greeting = 'Good evening!';
    }
  }




  ngOnInit(): void {
    this.setGreeting();
  }

}
