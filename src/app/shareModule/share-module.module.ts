import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { filterSearch } from './searchpipe';
import { filterSearchCity } from './searchpipeCity';
import { courtFilter } from './courtFilter';
import { customerFilter } from './customerFilter';
import { caseFilter } from './caseFilter';
import { TimeFormatPipe } from './timeFormat';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [filterSearch,filterSearchCity,courtFilter,customerFilter,caseFilter,TimeFormatPipe,DateFormatPipe],
  imports: [
    CommonModule  
  ],
  exports: [filterSearch,filterSearchCity,courtFilter,customerFilter,caseFilter,TimeFormatPipe,DateFormatPipe] 
})
export class ShareModuleModule { }
