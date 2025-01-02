import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToTopComponent } from '../to-top/to-top.component';
import { SocialComponent } from '../social/social.component';
import { Header2Component } from '../../Components/header2/header2.component';
import { BookNowMobileComponent } from '../book-now-mobile/book-now-mobile.component';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { routeTransition } from '../../../route-transition';
import { filter } from 'rxjs';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ToTopComponent,
    SocialComponent,
    Header2Component,
    BookNowMobileComponent,

  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
 animations:[
  routeTransition
 ]
})
export class LayoutComponent {
  animateRoute: boolean = false;
constructor(protected route:ActivatedRoute ,private router: Router ){}
ngOnInit() {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.animateRoute = this.route.firstChild?.snapshot.data['animate'] || false;
    });
}
}
