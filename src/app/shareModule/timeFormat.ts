import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service'; 

@Pipe({
  name: 'formatTime',
  pure: false ,
  standalone: false
})
export class TimeFormatPipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}

  transform(time: string ) {

    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'م' : 'ص';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;



    // return this.languageService.formatTime(time); 
 }
}


