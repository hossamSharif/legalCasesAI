import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'
import { ServicesService } from '../stockService/services.service';
import { ToastController } from '@ionic/angular';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeAll, switchAll, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
  standalone: false,
})
export class CasesPage implements OnInit {
  caseArr: Array<any> = []
  loading: boolean = false
  showEmpty: boolean = false
  showEmptySerach: boolean = false
  searchArr: Array<any> = []
  searchTerm: string = '';
  keyupSubescription: any;
  searchMode: boolean = false;
  @ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef;

  constructor(private toast: ToastController, private api: ServicesService, private rout: Router) {


  }

  ngOnInit() {
    
  }

  test() {
    console.log('test')
  }

  ionViewDidEnter() {
    this.getTopCases()
    console.log('view inital', this.searchInput)
    // this.keyupSubescription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
    //   debounceTime(500),
    //   map((event: Event) => (<HTMLInputElement>event.target).value),
    //   distinctUntilChanged(),
    //   tap(() => this.loading = true),
    //   tap(() => this.searchMode = true),
    //   switchMap(value => this.api.getCaseBySearchTerm(value))
    // ).subscribe((data: any) => {
    //   this.loading = false
    //   if (data['message'] != 'No record Found') {
    //     this.searchArr = data['data']
    //   } else {
    //     this.showEmptySerach = true
    //   }
    //   console.log(data)
    // })
  }


  getTopCases() {
    this.searchMode = false
    this.loading = true
    this.api.getTopCases().subscribe((data: any) => {
      console.log(data)
      if (data['message'] != 'No record Found') {
        this.caseArr = data['data']
      } else {
        this.showEmpty = true
      }
    }, (err) => {
      this.presentToast('خطا في الإتصال حاول مرة اخري', 'danger')
    },
      () => {
        this.loading = false
      }
    )
  }



  getCaseDetails(caseD , segVal) {
    console.log(caseD)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        case: JSON.stringify(caseD),
        segVal : JSON.stringify(segVal)
      }
    };
    this.rout.navigate(['edit-case'], navigationExtras);
  }

  onCancel() {
    console.log('cancel')
    this.searchMode = false
    this.searchTerm = '';
    this.keyupSubescription.unsubscribe()
  }

  getSessions(caseD) {
    console.log(caseD)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        case: JSON.stringify(caseD)
      }
    };
    this.rout.navigate(['folder/sessions'], navigationExtras);
  }

  getFiles(caseD) {
    console.log(caseD)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        case: JSON.stringify(caseD)
      }
    };
    this.rout.navigate(['files'], navigationExtras);
  }



  refresh() {
    this.getTopCases()
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

  newCase() {
    this.rout.navigate(['folder/new-case']);
  }
}
