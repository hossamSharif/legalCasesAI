import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { PortalserviceService } from '../portal/portalservice.service';
import { Location } from '@angular/common'; 
import { Storage } from '@ionic/storage';
import { ModalController, ToastController } from '@ionic/angular';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms"; 
import { AuthServiceService } from "../../app/auth/auth-service.service";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
  standalone: false,
})

export class NewPasswordPage implements OnInit {
  ionicForm: UntypedFormGroup;
 
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
 
 
  spinner:boolean = false 
  isSubmitted = false;  
  confirmPass:any = "" 
  password:any = ""
  passType = 'password'
  confType = 'password'
  show :boolean = false
  showConf :boolean = false
   
  constructor(private _location :Location ,private authenticationService: AuthServiceService ,private modalController:ModalController,private formBuilder: UntypedFormBuilder,private toast:ToastController,private route: ActivatedRoute,private storage: Storage, private rout : Router ,private api:PortalserviceService) { 
    this.ionicForm = this.formBuilder.group({ 
      password: ['', [Validators.required, Validators.minLength(5),Validators.pattern('^([^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$')]],
      confirmPass: ['', [Validators.required, Validators.minLength(5),Validators.pattern('^([^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$')]]
    })

     this.route.queryParams.subscribe(params => {
      if (params  && params.user_info) { 
        
        this.USER_INFO =   JSON.parse(params.user_info)   
         //this.timerKiller() //enable time killer fuction when you want to release v1 
      }
    });  
   
  }

  ngOnInit() {

  }

  newPassword(){
    this.rout.navigate(['login']);  
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  showPass(type){
    if(type == 'pass'){
      if(this.show == true){
        this.show = false
        this.passType = 'password'
      }else{
        this.show = true
        this.passType = 'text'
      }
    }else if(type == 'confirm'){
      if(this.showConf == true){
        this.showConf = false
        this.confType = 'password'
      }else{
        this.showConf = true
        this.confType = 'text'

      }
    } 
  }


  prepareUser(USER_INFO){
  this.USER_INFO.password = this.password
  let user = { 
      id: +USER_INFO.id,
      user_name: USER_INFO.user_name,
      password: USER_INFO.password,
      full_name:  USER_INFO.full_name,
      level:  +USER_INFO.level,
      phone:  USER_INFO.phone,
      email:  USER_INFO.email,
      job_title:  USER_INFO.job_title,
      subiscriber_id:   +USER_INFO.subiscriber_id 
  }
  return user
  }


  updatePassword(){
    console.log(this.prepareUser(this.USER_INFO)) 
    console.log('Form Valid:', this.ionicForm.valid);
    console.log('Form Values:', this.ionicForm.value);
    console.log('Form Errors:', this.ionicForm.errors);
    // if(this.validate() == true){ 
      this.spinner = true 
      this.authenticationService.updatePassword(this.prepareUser(this.USER_INFO) ) 
      this.spinner = false
    //  }else{
    //   this.spinner = false
    //   this.presentToast('يرجى التأكد من صحة البيانات', 'danger') 
    // // }
  }

  close(){
    this._location.back();
  }


  handleError(msg){
    if (msg == "duplicate phone") {   
      this.presentToast('رقم الهاتف مستخدم بالفعل', 'danger') 
      return false
    } else if (msg == "duplicate email"){ 
      this.presentToast('البريد الإلكتروني مستخدم بالفعل', 'danger') 
      return false
    } else if (msg == "duplicate email"){ 
      this.presentToast('خطأ في الاتصال بالشبكة', 'danger') 
      return false
    } else {
      this.presentToast('حدث خطأ في النظام، يرجى المحاولة مرة أخرى', 'danger') 
      return false
    }
  }



  validate(){
    this.isSubmitted = true; 
    if (this.ionicForm.valid == false) { 
      return false
    } else if(this.password.length>0 && this.password != this.confirmPass){
      return false
    } else if(this.USER_INFO.password.length > 0 && this.USER_INFO.password == this.password){
      this.presentToast('كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور القديمة', 'danger') 
      return false
    } else {
       return true
    }  
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
