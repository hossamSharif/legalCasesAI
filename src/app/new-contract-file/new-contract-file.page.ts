import { Component, OnInit, ViewChild, ElementRef ,Renderer2,Input} from '@angular/core';
 
import { Location } from '@angular/common'; 
import { ServicesService } from '../stockService/services.service';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastButton, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
 
import { contract, ContractFile } from '../new-contract/new-contract.page';
var ls = window.localStorage;

@Component({
  selector: 'app-new-contract-file',
  templateUrl: './new-contract-file.page.html',
  styleUrls: ['./new-contract-file.page.scss'],
  standalone: false,
})
export class NewContractFilePage implements OnInit {
  newContract: contract =  {
    id: null, 
    contract_title: '',	
    contract_date: '',
    client_id: 0,
    draft: '',
    amount: 0,
    payment_system: '',
    payment_method: '',
  }

  newContractFile : ContractFile =  {
    id: null,
    case_id: 0,
    user_id: 0,
    file_name: '',
    file_size: 0,
    file_url: '',
    file_notes: '',
    uploaded_at: new Date().toISOString()
  }
  isSubmitted = false;
  uploadedFiles

  constructor(private route: ActivatedRoute ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService ) {

    this.route.queryParams.subscribe(params => {
      if (params &&  params.contract) {
        console.log('caseRoute',JSON.parse(params.contract)) 
        this.newContract = JSON.parse(params.contract)
        this.getAppInfo()
      }
    });
   }

  ngOnInit() {
    
  }

  getAppInfo(){ 
    this.prepareCace()  
  }

  prepareCace(){   
  //  this.ionicForm.reset() 
    this.isSubmitted = false 

    if ( this.newContract['team'].lenght > 0) {
      this.newContractFile.user_id = this.newContract['team'][0].id
    } else {
      this.newContractFile.user_id = 0 
    }
    
    this.newContractFile.case_id = this.newContract.id
    
  }

  validate(){ 
    this.isSubmitted = true; 
    console.log('validate' , this.isSubmitted , this.newContractFile.file_name)
    if (this.newContractFile.file_name == "") { 
      return false
    } else if(this.newContractFile.file_notes == ""){	
      return false
    }else if(!this.uploadedFiles){
      return false
    }
      else {
      return true
    }  
  }

close(){
  this._location.back()
}

  // async uploadFile(file: File) {
  //   const loading = await this.loadingController.create({
  //     message: 'Uploading...',
  //     duration: 2000
  //   });
  //   await loading.present();
  //   this.api.uploadFile(file).subscribe(async data => {
  //     loading.dismiss();
  //     const toast = await this.toast.create({
  //       message: 'File uploaded.',
  //       duration: 3000
  //     });
  //     toast.present();
  //   });
  // }


  fileChange(element) {
    console.log('file', element.target.files[0]['type']);
    this.newContractFile.file_name = element.target.files[0]['name']
    this.newContractFile.file_size = element.target.files[0]['size']
    
    // this.newCaseFile.filetype = element.target.files[0]['type']
    this.uploadedFiles = element.target.files[0];
  }


  upload() {  
    let formData = new FormData();
    formData.append("avatar", this.uploadedFiles);
    console.log(formData)
    this.api.uploadCaseFiles(formData).subscribe((response:any) => {  
      console.log('uploadCaseFiles',response)
      if(response.status == 'success'){
        this.newContractFile.file_url = response.url
        this.saveInvo()
      }else{
        this.presentToast('خطأ في  تحميل الملف' , 'danger').then(toast => {
          this.prepareCace()
          this._location.back();
        });
      }

      

      
     
    },(error)=>{ 
      this.presentToast("خطأ في الإتصال بالسيرفر")
    }
    )
  }

  
  saveBasics() {
    // let d: Date = this.payInvo.pay_date
    // this.payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.newContractFile) 
      this.upload()
    }
  }


  saveInvo() {
    console.log('saveInvo' ,this.newContractFile )
    this.api.saveContractFile(this.newContractFile).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case File Not Created') { 
       this.presentToast('تم حفظ البيانات بنجاح', 'success').then(toast => {
          this.prepareCace()
          this._location.back();
        });
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
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
