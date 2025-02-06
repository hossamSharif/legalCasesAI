import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'
import { ServicesService } from '../stockService/services.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone:false,
})
export class NotificationsPage implements OnInit {
  tasksArr :Array<any> = [] 
 
  loading:boolean = false
  showEmpty :boolean = false 
  constructor(private toast :ToastController,private api:ServicesService ,private rout: Router) { }

  ngOnInit() {
    this.getTopTasks()
  }
  

  getTopTasks(){
    this.loading = true 
    this.api.getTopNtification().subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No cases Found'){
        this.tasksArr = res['data']
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




 getTaskDetails(task , segVal){
  console.log(task)
  let navigationExtras: NavigationExtras = {
    queryParams: {
      notification: JSON.stringify(task) 
    }
  }; 
  this.rout.navigate(['edit-notifications'], navigationExtras);  
 }


 refresh(){
  this.getTopTasks()
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

  newTask(){
    this.rout.navigate(['new-notifications']); 
  }
}