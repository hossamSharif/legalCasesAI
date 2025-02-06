import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'formatDate',
  pure: true,
  standalone: false
})
export class DateFormatPipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}
  transform(date: string | Date): string {
    return this.languageService.formatDate(date);
  }
}
