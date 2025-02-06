import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../stockService/services.service';
@Component({
  selector: 'app-new-court',
  templateUrl: './new-court.page.html',
  styleUrls: ['./new-court.page.scss'],
  standalone: false,
})
export class NewCourtPage implements OnInit {
court : {court_name:string, id:number , status:number} = {court_name:"", id:null , status:1}  
  constructor(private modalController : ModalController,private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService) { }

  ngOnInit() {

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
    this.modalController.dismiss(this.court,'reload');
    console.log('saveInvo')
    this.api.saveCourt(this.court).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Created') {
      this.court.id = data['id']
      this.presentToast('تم حفظ البيانات بنجاح', 'success')
      this.modalController.dismiss(this.court,'reload');
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => { 
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  validate():boolean{
    if (this.court.court_name == ""  ) {
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
