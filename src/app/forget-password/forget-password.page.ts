import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { ModalController, ToastController } from '@ionic/angular';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ServicesService } from '../stockService/services.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: false,
})
export class ForgetPasswordPage implements OnInit {
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
  ionicForm: UntypedFormGroup;
   user : { email:any  }
   isSubmitted :boolean = false 
   
  constructor(private api : ServicesService,private formBuilder: UntypedFormBuilder,private toast:ToastController,private route: ActivatedRoute,private storage: Storage, private rout : Router ) {
  
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
   })

   }

  ngOnInit() {
    this.user = {email:""}
  }
  generateVerificationCode(): string {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  sendMail(){
    if(this.validate() == true){
      this.spinner = true 
      this.api.sendMailForgetPass(this.user.email ).subscribe(data =>{
       console.log('user was created',data) 
        let res = data
        if (data['status'] == 'success'){
          this.presentToast('تم ارسال الكود المرجو التحقق من البريد الالكتروني', 'success')
          console.log('email was sent',data) 
          let navigationExtras: NavigationExtras = {
            queryParams: {
              digit: JSON.stringify(res['key']),
              user_info:JSON.stringify(res['data']['data'][0])
            }
          }; 
          this.rout.navigate(['virefy-rest'], navigationExtras);  
          this.spinner = false
        }else if (data['status'] == 'error' || data['messege'] == 'No User Found'){
          this.presentToast('حدث خطأ ما , الرجاء المحاولة مرة  ', 'danger')	 
        }
       
      }, (err) => {
      console.log(err); 
      this.spinner = false
      this.presentToast('حدث خطأ ما , الرجاء المحاولة مرة اخري', 'danger')
    },()=>{ 
    })
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
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

  validate(){
    this.isSubmitted = true;
    if (this.ionicForm.valid == false) {
      //console.log('Please provide all the required values!') 
      return false
    }   else {
       return true
    }  
  }

  newPassword(){
    this.rout.navigate(['new-password']); 
  }


}
