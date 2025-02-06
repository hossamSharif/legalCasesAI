import { Component, OnInit, ViewChild, ElementRef ,Renderer2,Input} from '@angular/core';
 
import { Location } from '@angular/common'; 
import { ServicesService } from '../stockService/services.service';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastButton, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Case } from '../new-case/new-case.page';
import { CaseFile } from '../new-casefile/new-casefile.page';
import { NewSession } from '../new-session/new-session.page';
var ls = window.localStorage;

@Component({
  selector: 'app-edit-casefile',
  templateUrl: './edit-casefile.page.html',
  styleUrls: ['./edit-casefile.page.scss'],
  standalone: false,
})
export class EditCasefilePage implements OnInit {
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
    court_id: 0,                            
  }
  newCaseFile: CaseFile =  {
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
    session_requirements: ''
  };
  isSubmitted = false;
  uploadedFiles
  category:any=''
  constructor(private route: ActivatedRoute ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService ) {
    this.getAppInfo()
    this.route.queryParams.subscribe(params => {
      if (params &&  params.case  &&  params.file) { 
        console.log('caseRoute',JSON.parse(params.case),JSON.parse(params.category))  
        this.category = JSON.parse(params.category)
        if (this.category == 'case') {
          this.newCase = JSON.parse(params.case)
        }else if (this.category == 'session') {
          this.newSession = JSON.parse(params.case)
        } 
        this.newCaseFile = JSON.parse(params.file) 
      }
    });
   }

  ngOnInit() {
  }

  getAppInfo(){ 
    this.prepareCace()  
  }

  prepareCace(){   
    this.isSubmitted = false 
    if(this.category == 'case') { 
      this.newCaseFile.case_id = this.newCase.id
    }else if (this.category == 'session') {
      this.newCaseFile.case_id = this.newSession.id 
    }   
  }

  validate(){ 
    this.isSubmitted = true; 
    console.log('validate' , this.isSubmitted , this.newCaseFile.file_name)
    if (this.newCaseFile.file_name == "") { 
      return false
    } else if(this.newCaseFile.file_notes == ""){	
      return false
    }else if(!this.uploadedFiles){
      return false
    }
      else {
      return true
    }  
  }

close(){
  this._location.back()
}

  // async uploadFile(file: File) {
  //   const loading = await this.loadingController.create({
  //     message: 'Uploading...',
  //     duration: 2000
  //   });
  //   await loading.present();
  //   this.api.uploadFile(file).subscribe(async data => {
  //     loading.dismiss();
  //     const toast = await this.toast.create({
  //       message: 'File uploaded.',
  //       duration: 3000
  //     });
  //     toast.present();
  //   });
  // }


  fileChange(element) {
    console.log('file', element.target.files[0]['type']);
    this.newCaseFile.file_name = element.target.files[0]['name']
    this.newCaseFile.file_size = element.target.files[0]['size']
    
    // this.newCaseFile.filetype = element.target.files[0]['type']
    this.uploadedFiles = element.target.files[0];
  }


  upload() {  
    let formData = new FormData();
    formData.append("avatar", this.uploadedFiles);
    console.log(formData)
    this.api.uploadCaseFiles(formData).subscribe((response:any) => {  
      console.log('uploadCaseFiles',response)
      if(response.status == 'success'){
        this.newCaseFile.file_url = response.url
        this.saveInvo()
      }else{
        this.presentToast('خطأ في  تحميل الملف' , 'danger').then(toast => {
          this.prepareCace()
          this._location.back();
        });
      }

      

      
     
    },(error)=>{ 
      this.presentToast("خطأ في الإتصال بالسيرفر")
    }
    )
  }

  
  saveBasics() {
    // let d: Date = this.payInvo.pay_date
    // this.payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.newCaseFile) 
      this.upload()
    }
  }


  saveInvo() {
    console.log('saveInvo' , this.newCaseFile)
    this.api.updateCaseFile(this.newCaseFile).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case File Not Created') { 
       this.presentToast('تم حفظ البيانات بنجاح', 'success').then(toast => {
          this.prepareCace()
          this._location.back();
        });
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
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


  async presentLoadingWithOptions(msg?) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      mode:'ios',
      duration: 5000,
      message: msg,
      translucent: true,
     // cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present(); 
    const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed with role:', role);
  }


}