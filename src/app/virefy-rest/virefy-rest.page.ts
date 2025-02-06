import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { PortalserviceService } from '../portal/portalservice.service';
import { Storage } from '@ionic/storage';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-virefy-rest',
  templateUrl: './virefy-rest.page.html',
  styleUrls: ['./virefy-rest.page.scss'],
  standalone: false,
})
export class VirefyRestPage implements OnInit {

   
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
    subscriber_id: number;
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

    token:any
    code:any; 
    phone:any
    ionicForm: UntypedFormGroup;
    spinner:boolean = false 
    spinner2:boolean = false 
    isSubmitted = false;
    outdateCode = false;
    orignalCode;

    digit 
    user : {email:any}
     key : any  = ''
  constructor(private toast:ToastController,private formBuilder: UntypedFormBuilder,private route: ActivatedRoute,private storage: Storage, private rout : Router ,private api:PortalserviceService) {
    this.user = { 
      email:""
    }

    
    this.route.queryParams.subscribe(params => {
      if (params && params.digit  && params.user_info) { 
        this.orignalCode =   JSON.parse(params.digit)   
        this.USER_INFO =   JSON.parse(params.user_info)   
         //this.timerKiller() //enable time killer fuction when you want to release v1 
         console.log(this.USER_INFO)
      }
    });  
   
    this.ionicForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(4),Validators.pattern('^[0-9]+$')]],
   })
   }

  ngOnInit() {
   
  }
     get errorControl() {
              return this.ionicForm.controls;
         }

      timerKiller(){
        setTimeout(() => { 
          this.route.queryParams.subscribe(params => {
            if (params && params.type) {  
                this.outdateCode = true 
            }
          });  
        }, 180000);
      }
    
      validate()  {
        this.isSubmitted = true;
        if (this.ionicForm.valid == false) { 
          return false
        } else if (this.outdateCode == true){ 
         this.presentToast(' انتهت صلاحية رمز التأكيد ' , 'danger')  
         return false
        }else if (this.code != this.orignalCode){ 
          this.presentToast('خظأ في رمز التأكيد  ' , 'danger')  
            return false
        }else{
           return true
        }
       
      } 

      confirmAccount(){  
        if (this.validate() == true){
          this.spinner = true
          let navigationExtras: NavigationExtras = {
            queryParams: {
              user_info: JSON.stringify(this.USER_INFO)
            }
          }; 
          this.rout.navigate(['new-password'] , navigationExtras); 
          this.spinner = false
        } 
      }


       

        sendMail(){
          console.log('sendMail', this.USER_INFO.email)
          
            this.spinner = true 
            this.api.sendMailForgetPass(this.USER_INFO.email ).subscribe(data =>{
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
       

     

      inputChang(ev){
        //console.log(ev.target.value)
        // if(ev.target.value.length == 4 && this.validate() == true){
        //   this.confirmAccount()
        // }  
      }


      getsms(){
      //   let seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
      //   this.api.sendsms(this.phone , seq).subscribe(data =>{
      //     //console.log('sms req',data)
      //     let res = data 
      //     //console.log('sms response',data)
      //     //add ionic plugin to detect the sms msg and get the use substring and procced the confirmation fuction auto
      //    // this.orignalCode = res 
      //   }, (err) => {
      //   //console.log(err); 
      // })  
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