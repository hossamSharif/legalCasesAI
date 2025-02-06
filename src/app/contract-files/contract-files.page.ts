import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Case } from '../new-case/new-case.page';
import { ServicesService } from '../stockService/services.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; 
import { contract, ContractFile } from '../new-contract/new-contract.page';

@Component({
  selector: 'app-contract-files',
  templateUrl: './contract-files.page.html',
  styleUrls: ['./contract-files.page.scss'],
  standalone: false,
})
export class ContractFilesPage implements OnInit {

  loading:boolean = false
  showEmpty:boolean = false
  filesArray:any = []

  caseFile : ContractFile =  {
    id: null,
    case_id: 0,
    user_id: 0,
    file_name: '',
    file_size: 0,
    file_url: '',
    file_notes: '',
    uploaded_at: new Date().toISOString()
  }
  
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
  
  constructor(private route: ActivatedRoute ,private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private _location :Location ,private api:ServicesService ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.contract) {
        console.log('caseRoute',JSON.parse(params.contract))
        this.newContract = JSON.parse(params.contract) 
        console.log(this.newContract)
      }
    });
  }

  ngOnInit() {
    this.getCaseFilesByCaseId()
  }

 


  getCaseFilesByCaseId() {
    this.loading = true 
    this.api.getContractFilesByContractId(this.newContract.id).subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No Case Files Found'){
        this.filesArray = res['data']
      }else{
        this.showEmpty = true
      } 
     
    },(err) => {
      this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
    },
    ()=>{ 
      this.loading = false
    }
  )  
  }  


  newFilePage(){
      let navigationExtras: NavigationExtras = {
        queryParams: { 
          case: JSON.stringify(this.newContract) 
        }
      }; 
      this.rout.navigate(['new-contract-file'] , navigationExtras)
   }

   refreshFiles(){
    this.getCaseFilesByCaseId()
   }
   
   previewFile(item){
    window.open(item.file_url, '_blank');
   }

  

   getFileDetails(file){
    let navigationExtras: NavigationExtras = {
      queryParams: { 
        case : JSON.stringify(this.newContract) ,
        file: JSON.stringify(file),
      }
    }; 
    this.rout.navigate(['edit-casefile'], navigationExtras);  
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
