import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'
import { ServicesService } from '../stockService/services.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.page.html',
  styleUrls: ['./contracts.page.scss'],
  standalone: false,
})
export class ContractsPage implements OnInit {
  caseArr :Array<any> = [] 
  loading:boolean = false
  showEmpty :boolean = false 
  constructor(private toast :ToastController,private api:ServicesService ,private rout: Router) { }

  ngOnInit() {
    // this.getTopCases()
  }
  


  getTopCases(){
    this.loading = true 
    this.api.getTopCases().subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No cases Found'){
        this.caseArr = res['data']
      }else{
        this.showEmpty = true
      } 
     
    }, (err) => {
      this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
    } ,
    ()=>{ 
      this.loading = false
  }
  )  
 }


 getCaseDetails(caseD){
  console.log(caseD)
  let navigationExtras: NavigationExtras = {
    queryParams: {
      case: JSON.stringify(caseD) 
    }
  }; 
  this.rout.navigate(['edit-case'], navigationExtras);  
 }

 getSessions(caseD){
  console.log(caseD)
  let navigationExtras: NavigationExtras = {
    queryParams: {
      case: JSON.stringify(caseD) 
    }
  }; 
  this.rout.navigate(['folder/sessions'], navigationExtras);  
 }

 getFiles(caseD){
  console.log(caseD) 
  let navigationExtras: NavigationExtras = {
    queryParams: {
      case: JSON.stringify(caseD) 
    }
  }; 
  this.rout.navigate(['files'], navigationExtras);  
 } 



 refresh(){
  this.getTopCases()
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

  newCase(){
    this.rout.navigate(['new-contract']); 
  }
}
