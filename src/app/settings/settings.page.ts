import { Component, OnInit ,ViewChild ,ElementRef ,Renderer2,Input} from '@angular/core';

import { ServicesService } from "../stockService/services.service";
import { Observable, Subscription } from 'rxjs';
import { AlertController, Platform , LoadingController, ModalController, ToastController, MenuController } from '@ionic/angular';
import { DatePipe ,Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { StockServiceService } from '../syncService/stock-service.service';
import { PortalserviceService } from '../portal/portalservice.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  imageSrc: string;
  uploadedFiles
  USER_INFO :  {
    id: number;
    user_name: string;
    store_id: number;
    full_name: string;
    password: string;
    job_title: string;
    email: string;
    phone: string;
    level: number;
    subiscriber_id: number;
    company_email2: string;
    company_email: string;
    company_phone1: string;
    company_phone2: string;
    region: string;
    city: string;
    country: string;
    full_address: string;
    company_name: string;
    short_desc: string;
    full_desc: string;
    logo_url: string;
    subscriptions: Array<{
      package_id: number;
      status: string;
      start_date: string;
      end_date: string;
    }>;
  }
  file_name :string =''
  @ViewChild('popoverNotif') popoverNotif;
  isOpenCustType = false ;
  showCustType = false ;  
  userTypeArr :Array<any> =[] 
  company :{id:any ,company_name :any ,company_phone1:any , company_email:any, full_address:any, logo_url:any };
   
  logedUser: any ; 
  selectedUserType : {id:any ,name:any}; 
  spinner:boolean = false 
  ionicForm: UntypedFormGroup; 
  isSubmitted = false; 
  constructor(private formBuilder: UntypedFormBuilder,private _location : Location ,private menuCtrl :MenuController,  private rout : Router ,private platform:Platform,private behavApi:StockServiceService, private route: ActivatedRoute,private modalController: ModalController,private storage: Storage,private loadingController:LoadingController,private api:ServicesService,private toast :ToastController) { 
    
     
  
    this.ionicForm = this.formBuilder.group({
      full_address: [''], 
      company_name: ['' , Validators.required], 
      company_email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]], 
      company_phone1:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^[0-9]+$')]]
    })

    this.prepareInvo()

    
  }

  ngOnInit() {
    this.storage.get('USER_INFO').then((response) => {
      console.log('response',response)
      if (response) {
        this.USER_INFO = response  
        
        this.company = {id:this.USER_INFO.subiscriber_id ,company_name :this.USER_INFO.company_name ,company_phone1:this.USER_INFO.company_phone1, company_email:this.USER_INFO.company_email, full_address:this.USER_INFO.full_address, logo_url:this.USER_INFO.logo_url};
        this.imageSrc = this.company.logo_url
        console.log('USER_INFO',this.company) 
      }
    }); 
  }
 

   prepareInvo(){  
    this.ionicForm.reset() 
    this.isSubmitted = false 
   }

save() { 
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      if ( this.file_name != '') {
        this.upload() 
       }else{
        this.saveInvo() 
       }
     
     } 
  }


 


saveInvo() {
console.log(this.company)
  this.api.updateCompany(this.company).subscribe(data => {
    console.log('save',data)
   if(data['message'] != 'Post Not Created') {
   // this.selectedِCustmer.id = data['message']
    this.USER_INFO.company_name = this.company.company_name
    this.USER_INFO.company_phone1 = this.company.company_phone1
    this.USER_INFO.company_email = this.company.company_email
    this.USER_INFO.full_address = this.company.full_address
    this.USER_INFO.logo_url = this.company.logo_url
    this.storage.set('USER_INFO', this.USER_INFO).then((response) => {
      
      if (response) {
        console.log('USER_INFO',this.USER_INFO) 
      }
    })

   this.presentToast('تم حفظ البيانات بنجاح', 'success')
   this._location.back();	
   this.prepareInvo()
    }else{
    this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    }
  }, (err) => {
    //console.log(err);
    this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
  })
}


get errorControl() {
  return this.ionicForm.controls;
}
 

// fileChange(element) {
//   console.log('file', element.target.files[0]['type']);
//   this.file_name = element.target.files[0].name.toLowerCase();
// }
fileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

upload() {  
  let formData = new FormData();
  formData.append("avatar", this.uploadedFiles);
  console.log(formData)
  this.api.uploadCaseFiles(formData).subscribe((response:any) => {  
    console.log('uploadCaseFiles',response)
    if(response.status == 'success'){
      this.company.logo_url = response.url
      this.saveInvo()
    }else{
      this.presentToast('خطأ في  تحميل الملف' , 'danger').then(toast => { 
        this._location.back();
      });
    }
  },(error)=>{ 
    this.presentToast("خطأ في الإتصال بالسيرفر")
  }
  )
}

validate(){
    console.log('Form Valid:', this.ionicForm.valid);
    console.log('Form Values:', this.ionicForm.value);
    console.log('Form Errors:', this.ionicForm.errors);
  this.isSubmitted = true;
  if (this.ionicForm.valid == false) {
    console.log('Please provide all the required values!') 
    return false
  }  else {
     return true
  }  
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

close(){
  this._location.back();
}

presentPopoverCustType(e?: Event) {
  console.log('preent me', e)
     this.showCustType = false
    this.popoverNotif.event = e;
     this.isOpenCustType = true;  
   }

  didDissmisCustType(){
    this.isOpenCustType = false
    //console.log('dismissOver') 
  }

  selectFromPopTypes(item){
    console.log(item)
    this.selectedUserType = {
      id:item.id,
      name:item.name
    } 

     
      //console.log( this.selectedItem); 
      this.didDissmisCustType()
      //perform calculate here so moataz can get the qty
    }

}