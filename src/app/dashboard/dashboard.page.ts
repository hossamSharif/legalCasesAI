import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map ,reduce ,filter ,first ,take ,debounceTime,distinctUntilChanged , switchMap , concatMap} from 'rxjs/operators';
import { Observable, of  } from 'rxjs'; 
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ServicesService } from '../stockService/services.service';
import { ToastController } from '@ionic/angular';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  @ViewChild('tasksChart') tasksCanvas: ElementRef;
  @ViewChild('sessionsChart') sessionsCanvas: ElementRef;
  
  tasksChart: any;
  sessionsChart: any;
  observable: Observable<any> = of(1, 2, 3);
  mappedObservable:any
  reducedObservable:any
  filteredObservable:any
  firstObservable:any
  takeObservable:any 
  form: UntypedFormGroup;
  dashboardObj:{
    "total_cases": any,
    "total_consultations": any,
    "total_sessions": any,
    "upcoming_sessions_count": any,
    "total_tasks":any,
    "incomplete_tasks_count": any,
    "upcoming_sessions": [],
    "incomplete_tasks": []
  }
  searchTerm :any = ''
  constructor(private toast: ToastController,private fb: UntypedFormBuilder ,private api: ServicesService) {
   
    this.dashboardObj={
      "total_cases": 0,
      "total_consultations": 0,
      "total_sessions": 0,
      "upcoming_sessions_count": 0,
      "total_tasks":0,
      "incomplete_tasks_count": 0,
      "upcoming_sessions": [],
      "incomplete_tasks": []
    }
   
   
    this.form = this.fb.group({
      search: ['']
    });
  
    this.form.get('search')?.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      console.log('Search: using debounceTime with 3 millsecond , so it will get ', value);
    });
 
  }
  searchItems() {
    // Implement your search logic here
    // This will trigger whenever the search input changes
    if (this.searchTerm.trim() !== '') {
      // Add your search functionality
      // You can filter cases, sessions, tasks based on searchTerm
    }
  }

  ngAfterViewInit() {
    this.createTasksChart();
    this.createSessionsChart();
  }


  createTasksChart() {
    this.tasksChart = new Chart(this.tasksCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['مكتملة', 'قيد التنفيذ', 'قيد الانتظار'],
        datasets: [{
          data: [30, 40, 30],
          backgroundColor: ['#2dd36f', '#ffc409', '#3dc2ff']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            rtl: true
          }
        }
      }
    });
  }

  createSessionsChart() {
    this.sessionsChart = new Chart(this.sessionsCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['جديدة', 'منتهية'],
        datasets: [{
          data: [60, 40],
          backgroundColor: ['#3880ff', '#eb445a']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            rtl: true
          }
        }
      }
    });
  }


  getTopCases() { 
    this.api.getTopDashboard().subscribe((data: any) => {
      console.log(data)
      if (data['message'] != 'No record Found') {
        this.dashboardObj = data['data']['0']
      } else {
        //this.showEmpty = true
      }
    }, (err) => {
      this.presentToast('خطا في الإتصال حاول مرة اخري', 'danger')
    },
      () => {
       // this.loading = false
      }
    )
  }

  async presentToast(msg, color?) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: color,
      cssClass: 'cust_Toast',
      mode: 'ios',
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
    // console.log('hello')
     // this.observable = of(1, 2, 3);
     this.getTopCases()
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
