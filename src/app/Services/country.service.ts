import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from '../Components/Interfaces/interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private translate: TranslateService = inject(TranslateService);
  private languageSubject: BehaviorSubject<string> = new BehaviorSubject(this.translate.currentLang);

  setLanguage(lang: string): void {
      this.translate.use(lang);
      this.languageSubject.next(lang); // Emit the new language
  }

  getCurrentLanguage(): string {
      return this.translate.currentLang;
  }

  getLanguageObservable(): Observable<string> {
      return this.languageSubject.asObservable(); // Expose the observable
  }



}
