import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicesService } from '../stockService/services.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
  standalone: false,
})
export class CustomersPage implements OnInit {
  seledctedCustomer :{id:any ,cust_ref :any ,cust_type:any,cust_name:any,cust_ident:any,phone:any,email:any,company_name:any,company_ident:any ,company_regno:any,company_phone:any,company_represent:any,company_email:any, status:any };
  custArr:Array<any> =[]
  showEmpty :boolean = false 
  loading:boolean = false

  constructor(private rout: Router,private api:ServicesService,private toast :ToastController) { }

  ngOnInit() {
 
  }


  
  ionViewDidEnter(){
    this.refresh()
   }

    refresh(){
      this.custArr =[] 
      this.getTopCustomers()
    }

   getTopCustomers(){
    this.showEmpty=false
    this.loading = true
    this.api.getTopCustomers().subscribe(data =>{
      console.log('hhhhhh',data)
      let res = data
      if(res['message'] != 'No record Found'){
        this.custArr = res['data'] 
      }
      if(this.custArr.length==0){
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


   getCustomerDetails(cust){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        customer: JSON.stringify(cust) 
      }
    }; 
    this.rout.navigate(['folder/edit-customer'], navigationExtras);  
   }

  newCustomer(){
    this.rout.navigate(['folder/new-customer']); 
  }



}
