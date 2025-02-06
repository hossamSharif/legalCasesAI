import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, Platform, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'; 
import { PortalserviceService } from '../portal/portalservice.service';
import { ServicesService } from '../stockService/services.service';
 
 

 
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authState = new BehaviorSubject(false);

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
  constructor(private toast:ToastController ,private loadingController:LoadingController,private api:ServicesService,   private router: Router,private storage: Storage,private platform: Platform,public toastController: ToastController) { 
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
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

  async presentLoadingWithOptions(msg?,status?) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      mode:'ios',
     duration: 2000,
      message: msg,
      translucent: true,
     // cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss() 
    //console.log('Loading dismissed with role:', role);
  }

 async ifLoggedIn() {
    await this.storage.create();
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }



 
 async login(user) { 
   await   this.presentLoadingWithOptions('جاري تسجيل الدخول' , 'login')
    //console.log(user)
    this.api.login(user).subscribe(data =>{
      console.log('loogingksks',data['message'])
      let res = data['data']//res[0]['id'] != null
      if(data['message'] != 'No User Found'){
             this.USER_INFO = res[0] 
            this.storage.set('USER_INFO', this.USER_INFO).then((response) => {
            this.router.navigate(['folder/dashboard']);
            this.authState.next(true); 
      });
      }else{
        this.loadingController.dismiss()
        this.presentToast('خطأ في البريد الإلكتروني او كلمة المرور' ,'danger')
      }  
    }, (err) => {
       //console.log(err);
       this.loadingController.dismiss()
       this.presentToast('خطأ في البريد الإلكتروني او كلمة المرور' ,'danger')
        
      },()=>{ }
    )    
   }




    updatePassword(USER_INFO){
    //await   this.presentLoadingWithOptions('جاري تسجيل الدخول' , 'login')
      this.api.updatePass(USER_INFO).subscribe(data =>{
        //console.log('user was updated',data)
        let res = data
        if (res['message'] != 'Post Not Updated'){
          this.storage.set('USER_INFO', USER_INFO).then((response) => {
            this.router.navigate(['folder/dashboard']);
            this.authState.next(true); 
            });
        }else{
          this.presentToast(' حدث خطأ في النظام، يرجى المحاولة مرة أخرى', 'danger') 
        } 
      }, (err) => { 
      this.presentToast('حدث خطأ في النظام، يرجى المحاولة مرة أخرى', 'danger') 
    },()=>{
    
    })
    }
  



 
  async logout() {
    this.storage.remove('USER_INFO').then(() => { 
        this.router.navigate(['folder/login']);
        this.authState.next(false); 
    }); 
  }

   
  

  isAuthenticated() {
    return this.authState.value;
  }

  
}
