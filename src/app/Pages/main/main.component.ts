import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PromiseComponent } from './promise/promise.component';
import { CarsComponent } from './cars/cars.component';
import { CarsTestComponent } from './cars-test/cars-test.component';
import { PlanComponent } from './plan/plan.component';
import { TimerComponent } from './timer/timer.component';
import { SocialComponent } from '../../Layout/social/social.component';
import { FrequentlyQuestionsComponent } from './frequently-questions/frequently-questions.component';
import { TextBannerComponent } from '../airport-transfer-component/text-banner/text-banner.component';
import { DividersComponent } from '../../Components/dividers/dividers.component';
import { DividerDownComponent } from '../../Components/dividers/divider-down/divider-down.component';
import { BookNowMobileComponent } from '../../Layout/book-now-mobile/book-now-mobile.component';

import { BookingService } from '../../Components/booking/Services/booking.service';
import { AuthService } from '../login/Services/auth.service';
import { LogoutService } from '../login/loging-welcome/logout.service';
import { Router } from '@angular/router';
import { LogingWelcomeNotiComponent } from './loging-welcome-noti/loging-welcome-noti.component';
import { LogoutnotifComponent } from './logoutnotif/logoutnotif.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BirthdayComponent } from './birthday/birthday.component';
import { DashboardSidenavComponent } from '../dashboard/dashboard-sidenav/dashboard-sidenav.component';
import { DriverNotificationComponent } from './driver-notification/driver-notification.component';
import { SliderTextComponent } from '../slider-text/slider-text.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SlideshowComponent,
    PromiseComponent,
    CarsComponent,
    CarsTestComponent,
    PlanComponent,
    TimerComponent,
    SocialComponent,
    FrequentlyQuestionsComponent,
    TextBannerComponent,
    DividersComponent,
    DividerDownComponent,
    BookNowMobileComponent,
    LogingWelcomeNotiComponent,
    LogoutnotifComponent,
    CommonModule,
    BirthdayComponent,
    DashboardSidenavComponent,
    DriverNotificationComponent,
    SliderTextComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild(LogingWelcomeNotiComponent)
  childComponent!: LogingWelcomeNotiComponent;
  @ViewChild(LogoutnotifComponent, { static: false })
  childComponent2!: LogoutnotifComponent;
  @ViewChild(DriverNotificationComponent, { static: false })
  driverNotification!: DriverNotificationComponent;

  isActive: any;
  displayName: any = null;
  isLoggedOut = false;
  happyBirthday: boolean = false;
  birthdayTime: number = 9000;
  private logoutSubscription?: Subscription;
  private profileSubscription?: Subscription;

  constructor(
    private profileService: BookingService,
    private auth: AuthService,
    private logoutservice: LogoutService,
    private rout: Router,
    private cdr: ChangeDetectorRef
  ) {}
  private driverNotificationShown = sessionStorage.getItem(
    'driverNotificationShown'
  );
  ngOnInit(): void {
    let userEmail = localStorage.getItem('user-email');
    let userName = localStorage.getItem('user-name');
    this.isActive = !!userEmail;

    if (!this.isActive) {
      console.log('User just logged out');
      this.isLoggedOut = false;
      return;
    }

    let notificationShown = sessionStorage.getItem('notificationShown');
    let driverNotificationShown = sessionStorage.getItem(
      'driverNotificationShown'
    );
    console.log(this.auth.getUser());
    // if (!driverNotificationShown) {
    //   const userRoles = this.auth.getUser()?.roles || [];
    //   if (userRoles.includes('Driver')) {
    //     console.log('✅ User is a driver, preparing notification...');
    //     // Delay the notification until the view is initialized (in ngAfterViewInit)

    //   } else {
    //     console.warn('❌ User is NOT a driver, skipping notification.');
    //   }
    // }

    if (!notificationShown) {
      this.profileSubscription = this.profileService
        .getUserProfile()
        .subscribe((data) => {
          let displayName = data.firstName ? data.firstName : userEmail;
          this.displayName = displayName;

          this.triggerNotificationsForAll(
            `${this.generateRandomMessage()} ${displayName}! ${this.generateWelcomeMessage()}`
          );

          if (data.birthday) {
            this.handleBirthdayNotification(data.birthday);
          }

          sessionStorage.setItem('notificationShown', 'true');
        });
    }
  }

  ngAfterViewInit(): void {
    const userRoles = this.auth.getUser()?.roles || [];
    // Check if the user is a driver and if the driver notification has not been shown yet
    if (userRoles.includes('Driver') && !this.driverNotificationShown) {
      console.log('✅ User is a driver, sending notification...');
      this.triggerDriverNotification(this.generateDriverWelcomeMessage());
      this.cdr.detectChanges(); // Force view update after adding notification
      sessionStorage.setItem('driverNotificationShown', 'true'); // Mark the notification as shown
    } else {
      console.log(
        '❌ User is not a driver or driver notification already shown.'
      );
    }
  }

  triggerNotificationsForAll(message: string) {
    console.log('Triggering notifications for all components: ', message);
    this.childComponent.addNotification(message);
    if (this.driverNotification) {
      console.log('Driver notification component exists.');
      this.driverNotification.addNotification(message);
    } else {
      console.warn('Driver notification component is not found!');
    }
  }

  triggerDriverNotification(message: string) {
    console.log('Triggering driver notification: ', message);
    if (this.driverNotification) {
      this.driverNotification.addNotification(message);
    } else {
      console.warn('Driver notification component is not available!');
    }
  }

  handleBirthdayNotification(birthday: string) {
    const today = new Date();
    const birthdayArray = birthday.split('-');
    const birthdayYear = parseInt(birthdayArray[0]);
    const birthdayMonth = parseInt(birthdayArray[1]) - 1;
    const birthdayDay = parseInt(birthdayArray[2]);
    let birthdayDate = new Date(
      today.getFullYear(),
      birthdayMonth,
      birthdayDay
    );

    if (birthdayDate < today) {
      birthdayDate.setFullYear(today.getFullYear() + 1);
    }

    birthdayDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDiff = birthdayDate.getTime() - today.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (
      today.getDate() === birthdayDate.getDate() &&
      today.getMonth() === birthdayDate.getMonth()
    ) {
      console.log('Today is the birthday!');
      this.triggerNotificationsForAll(`Happy Birthday! 🎉`);
      setTimeout(() => {
        this.happyBirthday = true;
      }, this.birthdayTime);
    } else {
      console.log(`Birthday in ${daysLeft} day(s)`);
      this.happyBirthday = false;
      this.triggerNotificationsForAll(
        `Your birthday is in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`
      );
    }

    // Zapisz w sessionStorage, aby uniknąć ponownego wyświetlania powiadomienia
    sessionStorage.setItem('notificationShown', 'true');
  }

  onChildClick() {
    this.happyBirthday = false;
  }

  generateRandomMessage() {
    const messages = [
      'Welcome back! 👋',
      'Great to see you again! 😊',
      'We missed you! 🌟',
      'Happy to have you here! 🎉',
      'Welcome! 💬',
      'Ready to get started? 🚀',
      'It’s a new day, let’s make it awesome! 🌞',
      'Welcome aboard! ✨',
      'Glad you’re here! 🌸',
      'Hello again, hope you’re feeling great! 🌼',
      'You’re back! Let’s do this! 💪',
      'Welcome to your space! 🌈',
      'Excited to see you here! 😁',
      'It’s good to have you with us again! 🌟',
      'Let’s make today amazing! 💥',
      'Welcome to a fresh start! ✨',
      'It’s always better when you’re here! 🌻',
      'Great to have you back on board! 👏',
      'Let’s make today fantastic! 🌞',
      'Back at it again! Let’s go! 🚀',
      'So good to see you again! 🥳',
      'Welcome to another adventure! 🎢',
      'We’ve been waiting for you! 🕒',
      'Here we go again, let’s make it epic! 🎉',
      'Hope you’re ready for another great day! 🌅',
      'It’s a pleasure to see you! 😊',
      'Welcome back, champ! 🏆',
      'Glad you made it! 🌼',
      'We’ve got great things ahead! ✨',
      'It’s always a great day with you here! 🌟',
      'Cheers to your return! 🥂',
      'Let’s make this moment count! ⏳',
      'Glad to see you here again! 🙌',
      'You’re back and that’s awesome! 💫',
      'Here’s to another amazing day! 🌞',
      'Welcome back to the family! 🏡',
      'We’re stronger with you here! 💪',
      'So excited for the next chapter with you! 📖',
      'Let’s create something amazing today! 🌟',
      'We’ve got this, together! 🙌',
      'Welcome back, superstar! ✨',
      'You’re back, and that’s all that matters! 💖',
      'The day just got better with you here! 🌸',
      'It’s a fresh start with you! 🌟',
      'Welcome back to the grind! 💼',
      'Let’s make it a great day, starting now! ⏰',
      'We’re so happy you’re back! 💖',
      'You’re just in time for some fun! 🎉',
      'Together, we’ll conquer anything! 💥',
      'We’ve got great things ahead, just wait! 🚀',
      'Back and better than ever! 💪',
      'It’s going to be an amazing day! 🌞',
      'You’re back and we’re thrilled! 🌈',
      'We missed you, let’s get started! 🎉',
      'The fun begins now that you’re here! 🎉',
      'Glad to have you back, let’s dive in! 💦',
      'Let’s rock this day, shall we? 🎸',
      'You’re the missing piece! 🧩',
      'We’ve got new adventures waiting for you! 🏞️',
      'You’re back, the world is your oyster! 🦪',
      'So glad to see you again! 💖',
      'It’s your time to shine! ✨',
      'Great things happen when you’re around! 🌟',
      'Welcome, let’s make today unforgettable! 🎤',
      'A big welcome to you! 🎉',
      'You’ve got this, let’s do it! 💪',
      'Back in action, and we’re ready! 🚀',
      'It’s great to see you again, let’s go! 🎬',
      'Let’s make today one for the books! 📚',
      'The adventure continues with you! 🗺️',
      'You bring the energy, we’re ready! ⚡',
      'Together we’re unstoppable! 🛠️',
      'It’s a brand new day, let’s make it count! 🌄',
      'Glad you’re here, let’s make it happen! 🌟',
      'Your presence makes all the difference! 💖',
      'Ready to rock? Let’s go! 🎤',
      'Welcome back, let’s crush it! 💥',
      'The best part of the day: you’re here! 🌞',
      'We’ve missed your energy! 💥',
      'Ready to shine? Let’s do this! 🌟',
      'Glad to have you back, let’s do great things! 👏',
      'You’re here, and that’s all that matters! 💖',
      'We’re unstoppable together! 💪',
      'A warm welcome back to you! 🔥',
      'The day is brighter with you here! 🌅',
      'Glad to see you! Let’s get going! 🚀',
      'Your return makes everything better! 🌸',
      'We’ve been waiting for you! 🕒',
      'It’s time to make magic happen! ✨',
      'You’re back, and that’s the best news! 📣',
      'Welcome to an exciting new day! 🌟',
      'We’re lucky to have you with us again! 🍀',
      'Together, we make things happen! 🔥',
      'Welcome back, let’s make today epic! 🌟',
      'It’s always better with you around! 💫',
      'You’re back, and that’s awesome! 🌟',
      'Let’s start the day off right, together! 🌞',
      'It’s your time to shine again! 🌟',
      'So glad to see you, let’s make it count! 💥',
      'Welcome back, the adventure awaits! 🚀',
      'We’re happy you’re here! 💖',
      'Your presence makes everything better! 🌟',
      'Let’s dive into today with energy! 💪',
      'Welcome to another exciting day! 🌟',
      'Ready to create something amazing? ✨',
      'You’re the best part of today! 💖',
      'Back in action, let’s go! 🎬',
      'Welcome to another great day! 🌄',
      'You’re back, and that’s what matters! 💥',
      'It’s your time to shine again! 🌟',
      'We’re ready to do great things with you! 💪',
      'You’re here, and that makes it a great day! 🌞',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  generateWelcomeMessage() {
    const welcomeMessages = [
      'It’s always a pleasure to see you! 😊',
      'Welcome back, let’s make today amazing! 🌞',
      'So happy to see you again! 💫',
      'Let’s make today unforgettable! ✨',
      'Back at it! Ready to crush it? 💪',
      'Excited for another amazing day with you! 🌅',
      'Your energy is exactly what we need today! ⚡',
      'Together, we can do anything! 🙌',
      'The adventure starts now! 🚀',
      'Let’s get this day started right! 🎉',
      'Another day, another opportunity to shine! ✨',
      'You bring the spark we need! 💥',
      'Welcome to another incredible day! 🌟',
      'So pumped to have you back! 🔥',
      'Back to the grind! Let’s make it epic! 🏆',
      'Another day, another chance to be awesome! 🌞',
      'It’s a brand new day—let’s get started! 🌅',
      'The world’s better with you in it! 🌎',
      'We’re ready for another adventure together! 🛤️',
      'Let’s make today legendary! 💥',
      'You’re the reason today is great! 🌞',
      'Let’s do something amazing today! ✨',
      'Your return makes everything brighter! 🌈',
      'Welcome back, let’s make magic happen! 🎩',
      'Together, we’re unstoppable! 🚀',
      'It’s great to have you back with us! 🌸',
      'Let’s make today one for the books! 📚',
      'Your energy is infectious! 🔥',
      'So glad to have you back, let’s dive in! 🌊',
      'It’s time to get started—let’s go! ⏰',
      'We’re so glad to have you back in the mix! 💫',
      'You’ve got the magic touch—let’s use it! ✨',
      'You’re the key to making today amazing! 🔑',
      'Welcome back, we’ve got great things ahead! 🌟',
      'Ready for greatness? Let’s make today shine! 🌞',
      'We’ve been waiting for this moment! 🕒',
      'The day’s looking brighter with you here! 🌈',
      'The journey continues, let’s do this! 🚀',
      'It’s a new day—let’s make it count! 🌞',
      'We’ve got a world of possibilities ahead! 🌍',
      'Another chapter begins with you! 📖',
      'It’s an exciting day to be together! 🎉',
      'Let’s get started—today’s going to be awesome! 💥',
      'You’ve got this, let’s make it happen! 💪',
      'It’s going to be an amazing adventure today! 🎢',
      'We’re ready for another great day with you! ✨',
      'So happy to see you again! 😄',
      'Your return is the highlight of the day! 🌟',
      'Ready to shine? Let’s do this! 💖',
      'We’re so excited to have you back! 🎉',
      'Let’s create something beautiful today! 💫',
      'You’re the missing piece to make today perfect! 🧩',
      'The future is bright—let’s make it happen! 🌞',
      'Welcome back, we’ve got this together! 💪',
      'Let’s make it an unforgettable day! 🌟',
      'It’s your time to shine again! ✨',
      'You bring the magic back to today! 💫',
      'The best part of today: You’re here! 🌟',
      'Another chance to create something epic! 🎬',
      'So glad to have you here today! 😊',
      'Together, we make things happen! 🔥',
      'The best is yet to come! 🌠',
      'Your presence makes everything better! 💖',
      'We’re so excited to see you back! 🎉',
      'Let’s make this day incredible! 💥',
      'It’s a perfect day for a fresh start! 🌞',
      'The stage is set—let’s rock this! 🎸',
      'You’re here, and that makes everything amazing! ✨',
      'We’re so lucky to have you back! 🍀',
      'Welcome to a new adventure! 🏞️',
      'The day is waiting for us to make it awesome! ⏳',
      'You’re the spark we need today! 💥',
      'Let’s start this day with a bang! 🎇',
      'You bring the energy we need today! ⚡',
      'Together, we’ll make today unforgettable! 💫',
      'The world is yours today—let’s get started! 🌍',
      'We’re ready to do amazing things with you! 💪',
      'It’s time to shine—let’s make today yours! ✨',
      'It’s great to see you, let’s get going! 🚀',
      'You’ve got the power to make today awesome! 💪',
      'We’ve got an exciting day ahead, let’s get started! 🌞',
      'The possibilities are endless today! 🌟',
      'Back and better than ever—let’s do this! 💥',
      'We’re about to make today unforgettable! 💫',
      'Here’s to a fresh start, together! 🌅',
      'Welcome back, let’s create some magic today! 🎩',
      'Another chance to make today incredible! ✨',
      'We’re ready for another adventure with you! 🛤️',
      'Welcome to a brand new day, let’s do this! 🌞',
      'So excited for what we’ll create today! 💫',
      'Let’s make today amazing, together! 🌈',
      'You’re here—let’s make it count! 💥',
      'The journey continues with you, let’s go! 🚀',
      'It’s your time to shine again! 🌟',
      'We’ve got this, together! 🙌',
      'Let’s rock today, starting now! 🎸',
      'You’re back, and that’s what matters! 💖',
      'We’re stronger with you here! 💪',
      'You make today better just by being here! ✨',
      'So happy to have you back, let’s go! 🚀',
      'Let’s get this day started with energy! ⚡',
      'Welcome back, let’s make today extraordinary! ✨',
      'We’re ready to make magic happen! 💥',
      'It’s time to make today epic! 🌟',
      'You’re back, and the adventure continues! 🚀',
      'Together, we’re unstoppable! 💪',
      'Welcome back, let’s create something amazing! ✨',
    ];
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  }

  generateDriverWelcomeMessage() {
    const welcomeMessages = [
      'Welcome back, driver! Let’s hit the road and make today amazing! 🚗💨',
      'Glad to have you back, driver! Let’s make this journey unforgettable! 🌟',
      'Ready to drive to success? Let’s do this, driver! 🚘💪',
      'Welcome back to the wheel, driver! The road is waiting for you! 🛣️',
      'The road is calling! Let’s get started and make today epic, driver! 🎯',
      'Buckle up, driver! Another adventure begins today! 🚦',
      'You’re back, driver! Let’s make today an exciting ride! 🎉',
      'The engine’s roaring and so are we! Let’s crush this, driver! ⚡',
      'Driver on the road again! Time to make today amazing! 🚗💥',
      'Get ready for an amazing journey today, driver! 🌍',
      'Welcome back, driver! The road ahead is waiting for us! 🛤️',
      'You bring the power to the road today, driver! Let’s go! ⚡🚘',
      'It’s your time to drive success, driver! Let’s make today legendary! ✨',
      'Another day, another adventure on the road, driver! 🚗💨',
      'Your journey begins now, driver! Let’s make it count! 🎯',
      'Welcome back, driver! Let’s take on the road and make today epic! 🛣️',
      'The road is ours today, driver! Ready to rock and roll? 🚙🔥',
      'Let’s make today one for the road, driver! 🏆',
      'It’s time for another adventure, driver! Let’s get going! 🌟',
      'Drive safe, drive smart, and let’s make today amazing, driver! 🚗💨',
      'Welcome back, driver! Let’s hit the road and make every moment count! ⏱️',
      'Ready for another adventure on the road, driver? Let’s go! 🚘💥',
      'You’re the driver we’ve been waiting for! Let’s get started! 🚦',
      'The journey is ours today, driver! Let’s take it on! 🛤️',
      'Today’s ride is going to be epic, driver! Let’s do this! 🌍',
      'Let’s drive forward, driver! The road awaits! 🚗💨',
      'Welcome back, driver! Time to roll and make today amazing! 🚙✨',
      'Your journey starts now, driver! Let’s hit the road! 🛣️',
      'Back on the road, driver! Let’s make today unforgettable! 💥',
      'You’re the key to an epic journey today, driver! Let’s go! 🔑🚘',
      'The road is our playground today, driver! Let’s make it incredible! 🛤️',
      'Welcome back, driver! Your journey to greatness starts now! 🚗🌟',
      'Today is yours, driver! Let’s make every mile count! 🌍🚙',
      'Ready to take on the road? Let’s make today legendary, driver! 🚦',
      'Your ride, your rules, driver! Let’s make it epic! 🚘🎉',
      'Get in, driver! Let’s take this journey to the next level! 🚗💪',
      'The adventure continues today, driver! Ready for another epic ride? 🌟',
      'You bring the drive to the road, driver! Let’s make today unforgettable! ⚡🚙',
      'Buckle up, driver! Let’s make today legendary! 🚗💥',
      'Your journey to greatness starts now, driver! Let’s go! 🌍✨',
      'Time to drive success, driver! Let’s make today amazing! 💪',
      'Another day, another adventure on the road, driver! Let’s do this! 🛣️',
      'The road is calling, driver! Let’s answer it with success! 🚘🌍',
      'Welcome back, driver! Let’s drive towards greatness today! 🚦✨',
      'Your journey starts now, driver! Let’s hit the road and make it epic! 🚗💨',
      'Time to drive into greatness, driver! Let’s make today unforgettable! 💥🚙',
      'Another amazing day on the road, driver! Let’s make it count! 🌟',
    ];
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  }

  ngOnDestroy(): void {
    // this.logoutSubscription?.unsubscribe();
    this.profileSubscription?.unsubscribe();
  }
}
