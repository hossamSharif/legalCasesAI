import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Case } from '../new-case/new-case.page';
import { ServicesService } from '../stockService/services.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; 
import { Consultation } from '../new-consultation/new-consultation.page';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.page.html',
  styleUrls: ['./consultations.page.scss'],
  standalone: false,
})

export class ConsultationsPage implements OnInit {
  loading:boolean = false
  showEmpty:boolean = false
  consultationArray:any = []

  newConsultation :Consultation = {
    id:0,
    client_id:0,
    lawyer_id:0,
    case_id:0,
    title:"",
    duration: 0,
    consultation_date:new Date().toISOString().split('T')[0], 
    consultation_notes:"",
    consultation_fee:0,
    consultation_type:"",
    status:"",
    created_at:null,
    updated_at:null 
  }
  category ='consultation'
  selectedLawyersTeamArr : Array<any> = []
  constructor(private route: ActivatedRoute ,private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private _location :Location ,private api:ServicesService ) {
     
   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getConsultations()
  }

  getConsultations() {
    this.loading = true 
    this.api.getTopConsultation().subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No Consultations Found'){
        this.consultationArray = res['data']
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


  newSessionPage(){ 
      this.rout.navigate(['new-consultation']  )
   }

   refreshSessions(){
    this.getConsultations()
   }
   


   getSessionDetails(session , segVal){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        consultation: JSON.stringify(session),
        segVal : JSON.stringify(segVal)
      }
    }; 
    this.rout.navigate(['edit-consultation'], navigationExtras);  
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

