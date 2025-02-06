import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Case } from '../new-case/new-case.page';
import { ServicesService } from '../stockService/services.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; 
@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
  standalone: false,
})
export class SessionsPage implements OnInit {
  loading:boolean = false
  showEmpty:boolean = false
  sessionsArray:any = []
  @Input() caseFromParnt : any;
  newCase: Case =  {
    id: null,
    case_title: '',
    client_id: 0,
    case_type: '',
    client_role: '',
    service_classification: '',
    branch: '',
    court_name: '',
    opponent_name: '',
    opponent_id: 0,
    opponent_representative: '',
    case_open_date: new Date().toISOString(),
    deadline: new Date().toISOString() ,
    billing_type: '',
    claim_type: '',
    work_hour_value: 0,
    estimated_work_hours: 0,
    case_status: '',
    constraintId_najz: '',
    archive_id_najz: '',
    caseId_najz: '',
    case_classification_najz: '',
    case_open_date_najz: new Date().toISOString(),
    case_docs: '',
    Plaintiff_Requests: '',
    case_status_najz: '',
    case_subject: '',
    court_id: 0
  }
  selectedLawyersTeamArr : Array<any> = []
  category = 'sessions'
  constructor(private route: ActivatedRoute ,private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private _location :Location ,private api:ServicesService ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.case) {
        console.log('caseRoute',JSON.parse(params.case))
        this.newCase = JSON.parse(params.case)
        this.selectedLawyersTeamArr = this.newCase['team']
        console.log(this.newCase)
      }
    });
    
   }

  ngOnInit() {
  
   }

   ionViewDidEnter() {
    if(this.newCase.id){
      this.getSessionsByCaseId()
    }else{
      this.getTopSessions()
    }
    }

    ngOnChanges(changes) {
      console.log(changes)
      if (changes.caseFromParnt && changes.caseFromParnt.currentValue) {
        if(this.newCase.id){
          this.getSessionsByCaseId()
        } else {
          this.getTopSessions() 
        }
      }
    }

   

 getTopSessions(){
    this.loading = true 
    this.api.getTopSessions().subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No cases Found'){
        this.sessionsArray = res['data']
      } 
    
    }, (err) => {
      this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
    } ,
    ()=>{ 
      
    this.loading = false
    }
  )  
}

  getSessionsByCaseId() {
    this.loading = true 
    this.api.getSessionsByCaseId(this.newCase.id).subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No Sessions Found'){
        this.sessionsArray = res['data']
      }else{
        this.showEmpty = true
      } 
     
    }, (err) => {
      this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
    } ,
    ()=>{ 
      this.loading = false
  }
  )  
 }  


  newSessionPage(){
   console.log('queryParams', this.caseFromParnt) 
      if (this.caseFromParnt) {
        console.log('caseFromParnt',this.caseFromParnt) 
         let navigationExtras: NavigationExtras = {
          queryParams: {
            case: JSON.stringify( this.caseFromParnt),
            team: JSON.stringify(this.caseFromParnt['team']) 
          }
        }; 
        this.rout.navigate(['new-session'] , navigationExtras)
        }else{ 
          console.log('not found caseFromParnt',this.caseFromParnt)
          this.rout.navigate(['new-session'] )
        }   
      }

   refreshSessions(){
    if(this.newCase.id){
      this.getSessionsByCaseId()
    }else{
      this.getTopSessions()
    }
   }
   


   getSessionDetails(session , segVal){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        session: JSON.stringify(session),
        case : JSON.stringify(this.newCase) ,
        segVal : JSON.stringify(segVal)
      }
    }; 
    this.rout.navigate(['edit-session'], navigationExtras);  
   }


   async presentToast(msg,color?) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color:color,
      cssClass:'cust_Toast',
      mode:'ios',
      position:'top' 
    });
    toast.present();
   }

}
