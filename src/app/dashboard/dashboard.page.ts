import { Component, OnInit } from '@angular/core';
import { map ,reduce ,filter ,first ,take ,debounceTime,distinctUntilChanged , switchMap , concatMap} from 'rxjs/operators';
import { Observable, of  } from 'rxjs'; 
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  observable: Observable<any> = of(1, 2, 3);
  mappedObservable:any
  reducedObservable:any
  filteredObservable:any
  firstObservable:any
  takeObservable:any

  form: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      search: ['']
    });
  
    this.form.get('search')?.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      console.log('Search: using debounceTime with 3 millsecond , so it will get ', value);
    });

    

   }

  ngOnInit() {
    // console.log('hello')
      this.observable = of(1, 2, 3);
  }
 
  map(){
    this.mappedObservable = this.observable.pipe(
      map(value =>  value * 2 )     
    );
    this.mappedObservable.subscribe(data => console.log("map all values from observable of(1,2,3) to val * 2= >" , data));
  }

  reduce(){
    this.reducedObservable = this.observable.pipe(
      reduce((acc , val)=> acc + val , 0)
    );
    this.reducedObservable.subscribe(data => console.log("reduse all values from observable of(1,2,3) to one value = >" , data));
  }

  filter(){
    this.filteredObservable = this.observable.pipe(
      filter(value => value % 2 === 0)
    );
    this.filteredObservable.subscribe(data => console.log("filte all values from observable of(1,2,3) = >",data));
  }

  first(){
    this.firstObservable = this.observable.pipe(
       first()
    );
    this.firstObservable.subscribe(data => console.log("get first value from observable of(1,2,3) = >" ,data));
  }


  take(){
    this.takeObservable = this.observable.pipe(
       take(5)
    );
    this.takeObservable.subscribe(data => console.log("take first 5 value from observable of(1,2,3) = >" , data));
  }

  distinctUntilChanged(){
    const source = of(1, 2, 2, 3, 3, 4, 4, 5, 5, 6).pipe(
      distinctUntilChanged()
    ).subscribe(data => console.log("distinctUntilChanged from observable of(1,2,2,3,3,4,4,5,5,6) = >" , data));
  }

  concatMap(){
    const source = of(1, 2, 3);
    const example = source.pipe(
      concatMap(val => of(`${val}: 1`))
    );
    example.subscribe(data => console.log("concatMap from observable of(1,2,3) = >" , data));
  }

  swichMap(){
    const source = of(1, 2, 3);
    const example = source.pipe(
      switchMap(val => of(`${val}: 1`))
    );
    example.subscribe(data => console.log("swichMap from observable of(1,2,3) = >" , data));
  }


  concatArr(){
    let fruits: string[] = ["apple", "banana", "orange"];
    fruits.join(", ");
 // Removes elements at index 1 and 2
    
    // let combinedFruits = fruits.concat(["pineapple", "pear"]);
      console.log(fruits)

  }

}
