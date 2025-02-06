import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthServiceService } from "../../app/auth/auth-service.service";
import { Storage } from '@ionic/storage';
import { ServicesService } from '../stockService/services.service';
import { PortalserviceService } from '../portal/portalservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})




export class LoginPage implements OnInit {
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
  offline:boolean = false
 
  
  

  constructor(private rout : Router,private apiPortal:PortalserviceService,private platform:Platform,private api:ServicesService,private storage: Storage,private toast:ToastController ,private loadingController:LoadingController , private authenticationService: AuthServiceService) {
    
    
    this.USER_INFO =  {
      id: 0,
      user_name: "",
      store_id: 0,
      full_name: "",
      password: "",
      job_title: "",
      email: "",
      phone: "",
      level: 0,
      subiscriber_id: 0,
      company_email2: "",
      company_email: "",
      company_phone1: "",
      company_phone2: "",
      region: "",
      city: "",
      country: "",
      full_address: "",
      company_name: "",
      short_desc: "",
      full_desc: "",
      logo_url: "",
      subscriptions: [
        {
          package_id: 0,
          status: "",
          start_date: "",
          end_date: ""
        }
      ]
    }

   }

  

   forgetPassword(){
    this.rout.navigate(['folder/forget-password'])
   }


  ngOnInit() {
    console.log('hello') 
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
      duration: 2000,
      message: msg,
      translucent: true,
     // cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss()
       loading.onDidDismiss().then(data=>{
          console.log(data)
        });

    console.log('Loading dismissed with role:', role);
  }

  

   loginUser( ){
      if(this.USER_INFO.email == "" || this.USER_INFO.password == ""){
        this.presentToast('please fill all requaired feild' ,'danger') 
      }else{ 
         
            this.authenticationService.login(this.USER_INFO)    
      } 
    }

  
}
