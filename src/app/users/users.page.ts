import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'; 
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
 import { ServicesService } from '../stockService/services.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: false,
})
export class UsersPage implements OnInit {
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
  isYou:boolean = false
  seledctedUser :{id:any ,user_name :any ,full_name:any,phone:any,email:any,job_title:any,level:any , password:any };
  userArr:Array<any> =[]
  showEmpty :boolean = false 
  loading:boolean = false
  constructor(private storage: Storage ,private rout: Router,private api:ServicesService,private toast :ToastController) { 


   }

  ngOnInit() {
    this.storage.get('USER_INFO').then((response) => {
      console.log('response',response)
      if (response) {
        this.USER_INFO = response  
        console.log('USER_INFO',this.USER_INFO)
        this.getTopUsers(this.USER_INFO.subiscriber_id) 
      }
    }); 
  }

  ionViewDidEnter(){
    this.refresh()
   }

    refresh(){
      this.userArr =[] 
      this.getTopUsers(this.USER_INFO.subiscriber_id)
    }

   getTopUsers(id){
    this.showEmpty=false
    this.loading = true
    this.api.getUsersBySubiscriberId(id).subscribe(data =>{
      console.log('hhhhhh',data)
      let res = data
      if(res['message'] != 'No record Found'){
        this.userArr = res['data'] 
      }
      if(this.userArr.length==0){
        this.showEmpty = true
      }else{
        this.showEmpty = false
      }
      this.loading=false 
    }, (err) => {
     console.log(err);
  },
  ()=>{
   this.loading = false
  })  
   }

   getLevel(level){
    if(level == 0){
      return 'User'
    }else if(level == 1){
      return 'admin'
    }else if(level == 2){
      return 'Super Admin'
    }else {
      return ''
    }
   }

   

   getUserDetails(cust){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(cust) 
      }
    }; 
    this.rout.navigate(['edit-user'], navigationExtras);  
   }

   
   editPassword(cust){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(cust) 
      }
    }; 
    this.rout.navigate(['new-password'], navigationExtras);  
   }


  newCustomer(){
    this.rout.navigate(['add-user']); 
  }

}
