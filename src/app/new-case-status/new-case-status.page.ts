import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../stockService/services.service';

@Component({
  selector: 'app-new-case-status',
  templateUrl: './new-case-status.page.html',
  styleUrls: ['./new-case-status.page.scss'],
  standalone: false,
})
export class NewCaseStatusPage implements OnInit {
  caseStatus : {status_name:string, id:number , status:number ,status_color:string} = {status_name:"", id:null , status:1,status_color:"light"}  
  colors = ['#FFFFFF', '#e4e493', '#53e853', '#808080', '#ed4949'];
  selectedColor = '#FFFFFF';

  constructor(private modalController : ModalController,private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService) { }

  ngOnInit() {

  }


  selectColor(color: string){ 
    this.selectedColor = color;  
    this.caseStatus.status_color = color;
   }

  close(){
     this.modalController.dismiss();
  }

  save(){
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...') 
      this.saveInvo() 
    }
  }


  saveInvo() {
    this.modalController.dismiss(this.caseStatus,'reload');
    console.log('saveInvo')
    this.api.saveCaseStatus(this.caseStatus).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Created') {
      this.caseStatus.id = data['id']
      this.presentToast('تم حفظ البيانات بنجاح', 'success')
      this.modalController.dismiss(this.caseStatus,'reload');
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => { 
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  validate():boolean{
    if (this.caseStatus.status_name == ""  ) {
      this.presentToast('الرجاء ادخال البيانات المطلوبة','danger')
      return false
    }  else {
      return true
    }
  }


  async presentToast(msg,color) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }


  
  async presentLoadingWithOptions(msg?) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      mode:'ios',
      duration: 5000,
      message: msg,
      translucent: true,
     // cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present(); 
    const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed with role:', role);
  }

}