import { Pipe ,PipeTransform } from '@angular/core';

@Pipe({ name: 'courtFilter', pure: false , standalone: false })

export class courtFilter  implements PipeTransform{
  
  transform(items: any[], args: any): any {
    let filter = args.toString();
    if(filter !== undefined && filter.length !== null){
        if(filter.length === 0 || items.length === 0){
            return items;
        }else{
            return filter ? items.filter(item=> item.court_name.indexOf(filter) != -1 ) : items;
        }
    }
  } 
}