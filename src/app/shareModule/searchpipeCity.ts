import { Pipe ,PipeTransform } from '@angular/core';

@Pipe({ name: 'filterSearchCity', pure: false , standalone: false })

export class filterSearchCity  implements PipeTransform{
  
  transform(items: any[], args: any): any {
    let filter = args.toString();
    if(filter !== undefined && filter.length !== null){
        if(filter.length === 0 || items.length ===0){
            return items;
        }else{
            return filter ? items.filter(item=> item.city.indexOf(filter) != -1 ) : items;
        }
    }
  } 
}