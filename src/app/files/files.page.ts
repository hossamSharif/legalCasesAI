import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Case } from '../new-case/new-case.page';
import { ServicesService } from '../stockService/services.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; 
import { CaseFile } from '../new-casefile/new-casefile.page';
import { NewSession } from '../new-session/new-session.page';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
  standalone: false,
})
export class FilesPage implements OnInit {
  @Input() objectFromParnt : any;
  @Input() categoryFromParnt : any;
  loading:boolean = false
  showEmpty:boolean = false
  filesArray:any = []
  caseFile : CaseFile =  {
    id: null,
    case_id: 0,
    user_id: 0,
    file_name: '',
    file_size: 0,
    file_url: '',
    file_notes: '',
    uploaded_at: new Date().toISOString(),
    category: 'case'
  }
  
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

  newSession: NewSession = {
    id: 1,
    lawyer_id: 0,
    case_id: 0,
    court_id:0,
    cust_id: 0,
    session_title: '',
    opponent_name: '',
    opponent_representative: '',
    session_date: new Date().toISOString(),
    session_time:new Date().toISOString(),
    session_type: '',
    session_status: '',
    session_result: '',
    court_name :'',
    session_requirements: '',
  };
  
  constructor(private route: ActivatedRoute ,private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private _location :Location ,private api:ServicesService ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.case) {
        console.log('caseRoute',JSON.parse(params.case))
        this.newCase = JSON.parse(params.case) 
        console.log(this.newCase)
      }
    });


    
  }

  ngOnInit() {
    
  }

  ionViweDidEnter() {
    console.log('categoryFromParnt',this.categoryFromParnt) 
    console.log('objectFromParnt',this.objectFromParnt)
   
  }

  ngOnChanges(changes) {
    console.log(changes)
    if (changes.categoryFromParnt && changes.categoryFromParnt.currentValue) {
        this.getCaseFilesByCaseId()
    }
  }


  getCaseFilesByCaseId() {
    this.loading = true 
    this.api.getCaseFilesByCaseId(this.objectFromParnt.id , this.categoryFromParnt).subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No Case Files Found'){
        this.filesArray = res['data']
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


  newFilePage(){ 
      let navigationExtras: NavigationExtras = {
        queryParams: { 
          case: JSON.stringify(this.objectFromParnt) ,
          category: JSON.stringify(this.categoryFromParnt)
        }
      }; 
      this.rout.navigate(['new-casefile'] , navigationExtras)
   }

   refreshFiles(){
    this.getCaseFilesByCaseId()
   }
   
   previewFile(item){
    window.open(item.file_url, '_blank');
   }

  

   getFileDetails(file){
    let navigationExtras: NavigationExtras = {
      queryParams: { 
        case : JSON.stringify(this.newCase) ,
        file: JSON.stringify(file),
      }
    }; 
    this.rout.navigate(['edit-casefile'], navigationExtras);  
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
