import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment-hijri';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLocale = new BehaviorSubject<string>('ar-SA');
  
  constructor() {
    moment.locale('ar-SA');
  }

  setLocale(locale: string) {
    moment.locale(locale);
    document.dir = locale === 'ar-SA' ? 'rtl' : 'ltr';
    this.currentLocale.next(locale);
  }

  getCurrentLocale() {
    return this.currentLocale.asObservable() 
  }

  formatDate(date: string | Date) {
    const locale = this.currentLocale.value;
    if (locale === 'ar-SA') {
      return moment(date).format('iYYYY/iMM/iDD');
    }
    return moment(date).format('YYYY/MM/DD');
  }

  formatDateTime(date: string | Date) {
    const locale = this.currentLocale.value;
    if (locale === 'ar-SA') {
      return moment(date).format('iYYYY/iMM/iDD hh:mm a');
    }
    return moment(date).format('YYYY/MM/DD hh:mm a');
  }

  formatTime(time: string | Date) { 
    const locale = this.currentLocale.value;
    if (locale === 'ar-SA') {
      const timeStr = moment(time).format('hh:mm a');
      return timeStr;
    }
    return moment(time).format('hh:mm A');
  }
  
}
