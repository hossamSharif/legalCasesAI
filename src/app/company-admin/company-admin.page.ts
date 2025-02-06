import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthServiceService } from "../../app/auth/auth-service.service";
import { Storage } from '@ionic/storage';
import { ServicesService } from '../stockService/services.service';
import { PortalserviceService } from '../portal/portalservice.service';

@Component({
  selector: 'app-company-admin',
  templateUrl: './company-admin.page.html',
  styleUrls: ['./company-admin.page.scss'],
  standalone: false,
})
export class CompanyAdminPage implements OnInit {
  SUBSCRIBER_INFO: { id: any, user_name: any, email: any, phone1: any, phone2: any, region: any, city: any, country: any, full_address: any, company_name: any, logo_url: any, subscription_id: any, email2: any, subscriptions: any , 	password:any}

  offline:boolean = false
  stores:Array<any> =[]
  store_info : {id:any ,store_ref:any , store_name:any , location :any }
  device :any = "" 
  company : { id: any , phone: any, phone2  :any, address :any, logoUrl:any,engName:any,arName:any ,tradNo:any , vatNo:any};

  constructor(private platform:Platform,private api:PortalserviceService,private storage: Storage,private toast:ToastController ,private loadingController:LoadingController , private authenticationService: AuthServiceService) {
    
    this.store_info = {id:1 ,store_ref:"sh" , store_name:"sooq sha'by" , location :"" } 
    this.SUBSCRIBER_INFO = { id: null, user_name: '', email: '', phone1: '', phone2: '', region: '', city: '', country: '', full_address: '', company_name: '', logo_url: '', subscription_id: '', email2: '', subscriptions: '' , password:'' }
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

  

   loginUser(){
      if(this.SUBSCRIBER_INFO.user_name == "" || this.SUBSCRIBER_INFO.password == ""){
        this.presentToast('please fill all requaired feild' ,'danger') 
      }else{ 
        this.storage.set('STORE_INFO', this.store_info).then((response) => {
        })
        this.storage.set('company', this.company).then((response) => {
      
        })
            this.authenticationService.login(this.SUBSCRIBER_INFO)    
      }

    }

  
}
