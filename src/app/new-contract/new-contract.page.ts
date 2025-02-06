import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'; 
import { FilterPipe } from '../new-case/pipe';
import { FilterPipe2 } from '../new-case/pipe2';
import { FilterPipe3  } from '../new-case/pipe3';
import { ServicesService } from '../stockService/services.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
 

export interface ContractFile {
  id: number;
  case_id?: number  ;
  user_id?: number  ;
  file_name?: string  ;
  file_size?: number  ;
  file_url?: string  ;
  file_notes?: string  ;
  uploaded_at?: string  ;
}

export interface contract {
  id: number; 
  contract_title?: string  ;
  contract_date?: string  ;
  client_id?: number  ;
  draft?: string  ;
  amount?: number  ; 
  payment_values?: string  ;
  payment_system?: string  ;
  payment_method?: string  ;
}

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.page.html',
  styleUrls: ['./new-contract.page.scss'],
  standalone: false,
})
export class NewContractPage implements OnInit {
  @ViewChild('popoverCase') popoverCase;
  @ViewChild('popoverConsult') popoverConsult;
  @ViewChild('popover') popover;
  isOpen = false; 
  isOpenCase :boolean = false 
  isOpenConsult :boolean = false 
  CasesArray :Array<any> =[]
  consultationsArray :Array<any> =[]

  selectedCustomer : {id:any ,cust_name:any};
  selectedService : {id:any ,title:any , type:any}; 
  searchTerm : any = ""
  aliasTerm :any =""
  searchResult :Array<any> =[]
  costumerArr :Array<any> =[]

  filesArr:Array<any>=[]
  paymentsArr:Array<any>=[]
  servicesArr:Array<any>=[]
  amount:any = 0 
  payDate: any
  segVal:string = "basics"
  serviceType:string = 'case'

  showEmptyConsult : boolean = false
  showEmptyCases : boolean = false
  loadingCase :   boolean = false
  loadingConsult :   boolean = false

  uploadedFiles

  newContractFile: ContractFile =  {
    id: null,
    case_id: 0,
    user_id: 0,
    file_name: '',
    file_size: 0,
    file_url: '',
    file_notes: '',
    uploaded_at: new Date().toISOString(),
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


  savedDone : boolean = false
  isSubmitted = false;
  
  constructor(private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService ) {
     this.payDate =  new Date().toISOString()
     this.selectedService = {id:"" ,title:"" , type:""}
     this.selectedCustomer= {id:"" ,cust_name:"" }
  }

  ngOnInit() {
    this.getTopCustomers()
  }

  getTopCustomers(){ 
    this.api.getTopCustomers().subscribe(data =>{
      console.log(data)
      let res = data
      this.costumerArr = res['data']   
    }, (err) => {} ,
    ()=>{ 
  }
  )  
 }

 fileChange(element) {
  console.log('file', element.target.files[0]['type']);
  this.newContractFile.file_name = element.target.files[0]['name']
  this.newContractFile.file_size = element.target.files[0]['size']
  // this.newCaseFile.filetype = element.target.files[0]['type']
  this.uploadedFiles = element.target.files[0];
}

paymentMethodChange(event){
  console.log(event.detail.value)
}

paymentSystemChange(event){
  console.log(event.detail.value)
}

paymentWayChange(event){
  console.log(event.detail.value)
}


   presentPopoverCase(e?: Event) {
    //console.log('preent me', e)
     this.popoverCase.event = e;
     this.isOpenCase = true; 
     this.getTopCases()  
   }

   presentPopoverConsult(e?: Event) {
    //console.log('preent me', e)
     this.popoverConsult.event = e;
     this.isOpenConsult = true; 
     this.getConsultations() 
   }

   didDissmisCase(){
    this.isOpenCase = false
  }

   didDissmisConsult(){
    this.isOpenConsult = false
  }

  selectFromPopCase(item){
   console.log(item)
    this.selectedService = {
      id:item.id,
      title: item.client_name +" - " +  item.case_title ,
      type : this.serviceType
    } 
    this.didDissmisCase()  
  }

  selectFromPopConsult(item){
    console.log(item)
     this.selectedService = {
       id:item.id,
       title: item.customer +" - " +  item.title ,
       type : this.serviceType
     } 
     this.didDissmisConsult()  
   }

 

  selectFromPop(item){
    //console.log(item)
    this.selectedCustomer = {
      id:item.id,
      cust_name:item.cust_name
    }
    this.newContract.client_id = item.id
     this.searchTerm = item.item_name
      //console.log( this.selectedItem); 
      this.didDissmis()
      //perform calculate here so moataz can get the qty
  }

  getConsultations() {
    this.loadingConsult = true 
    this.api.getTopConsultation().subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No Consultations Found'){
        this.consultationsArray = res['data']
      }else{
        this.showEmptyConsult = true
      } 
     
    }, (err) => {
      //this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
    } ,
    ()=>{ 
      this.loadingConsult = false
    }
  )  
   }  

  getTopCases() {
    this.loadingCase = true
    this.api.getTopCases().subscribe((data: any) => {
      console.log(data)
      if (data['message'] != 'No record Found') {
        this.CasesArray = data['data']
      } else {
        this.showEmptyCases = true
      }
    }, (err) => {
     // this.presentToast('خطا في الإتصال حاول مرة اخري', 'danger')
    },
      () => {
        this.loadingCase = false
      }
    )
  }

  presentPopover(e?: Event) {
    //console.log('preent me', e)
     this.popover.event = e;
     this.isOpen = true;
     this.clear()
     this.searchResult = this.costumerArr
    //  setTimeout(() => {
    //  this.setFocusOnInput('popInput')
    //  }, 2000);
   }

   

   didDissmis(){
    this.isOpen = false
  }

  searchItem(ev){
    this.searchResult = []
    this.aliasTerm = ev.target.value
   
    const filterPipe = new FilterPipe; 
    const filterPipe2 = new FilterPipe2;
    const filterPipe3 = new FilterPipe3 ;

    let  fiteredArr :any
    fiteredArr = filterPipe.transform(this.costumerArr,ev.target.value); 
    
   
    const fiteredArr2 = filterPipe2.transform(this.costumerArr,this.aliasTerm);  
    //console.log('filte',fiteredArr)
    //console.log('fiteredArr2',fiteredArr2)

    if(fiteredArr.length>0){
      fiteredArr.forEach(element => {
        this.searchResult.push( element)
      });
    }

    if(fiteredArr2.length>0){
       fiteredArr2.forEach(element => {
      this.searchResult.push( element)
    });
    }   
  }

  clear(item_name?){
   if(item_name){
    // this.selectedItem = {
    //   id: undefined,
    //   dateCreated: "", 
    //   pay_ref:this.payInvo.pay_ref,
    //   item_desc: "",
    //   item_name: "",
    //   item_unit: "",
    //   parcode: 0,
    //   pay_price: 0,
    //   perch_price: 0,
    //   qty: 0,
    //   tot: 0,
    //   availQty:0,
    //   aliasEn:""
    // }
   }else{
    this.searchTerm = "" 
   }
  }

  segmentCHange(event){
    console.log(event.detail.value)
    this.segVal = event.detail.value 
  }

   close(){
    this._location.back();
   }

   delete(index){
    this.paymentsArr.splice(index,1)
   }

   deleteService(index){
    this.servicesArr.splice(index,1)
   }

   deleteFile(index){
    this.filesArr.splice(index,1)
   }

  addToList(){
    this.paymentsArr.push({
         "id" : 'NULL',
         "payDate" : this.payDate,
         "amount" :this.amount
    })
    this.amount = 0
  }

  addToListService(){
    this.servicesArr.push({
         "id" : this.selectedService.id,
         "title" : this.selectedService.title,
         "type" :this.selectedService.type
    })
    this.selectedService = {id:"" ,title:"" , type:""}
  }

  addToListFiles(){
    this.filesArr.push({
         "id" : 'NULL',
         "fileNote" : this.newContractFile.file_notes,
          "file_name"  : this.newContractFile.file_name
    })
    this.newContractFile.file_notes = ""
  }

  
  nextBasics(){
    //this.validateBasics()
    this.savedDone = true
    this.segVal = 'services'
  }

  validateBasics(){ 
    this.isSubmitted = true;
    console.log('validate' , this.isSubmitted , this.newContract.contract_title)
    if (this.newContract.contract_title == "") { 
      
      return false 
    } else if(this.newContract.client_id == 0){
      
      return false
    } else if(this.newContract.amount == 0){
      
      return false
    }   else {
      return true
    }  
  }

  nextPayment(){
    
  }
  
  validatePayment(){
      
  }

  nextServices(){
    
  }

  validateServices(){
      
  }

  validate(){ 
    this.isSubmitted = true; 
    console.log('validate' , this.isSubmitted , this.newContract.contract_title)
    if (this.newContract.contract_title == "") { 
      return false
    } else if(this.newContract.client_id == 0){
      return false
    } else if(this.newContract.amount == 0){
      return false
    }   else {
      return true
    }  
  }

  saveBasics() {
    // let d: Date = this.payInvo.pay_date
    // this.payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.newContract) 
       if (!this.newContract.id) {
        console.log('save first time')
        this.saveInvo()  
      }else{
        console.log('update')

      }
    }
  }

  


  saveInvo() {
    console.log('saveInvo')
    this.api.saveContract(this.newContract).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Created') {
     this.newContract.id = data['message']
     if (this.paymentsArr.length > 0) {
      this.paymentsArr.forEach(element => {
        element.contract_id = this.newContract.id
       });
     //  this.saveCaseLawers()
     }else if(this.servicesArr.length > 0){
      this.servicesArr.forEach(element => {
        element.contract_id = this.newContract.id
       });
      // this.saveCaseLawers()
     }else if(this.filesArr.length > 0){
      this.filesArr.forEach(element => {
        element.contract_id = this.newContract.id
       });
     //  this.saveCaseLawers()
     }else{
      this.presentToast('تم حفظ البيانات بنجاح', 'success')
      this.prepareContract()
      this._location.back();
     }
       
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  savePayments() {
    console.log('saveInvo')
    this.api.savePaymentContrat(this.paymentsArr).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
     //this.newCase.id = data['message']
     this.presentToast('تم حفظ البيانات بنجاح', 'success')
     this.prepareContract() 
     
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  saveServices() {
    console.log('saveInvo')
    this.api.saveContractServices(this.paymentsArr).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
     //this.newCase.id = data['message']
     this.presentToast('تم حفظ البيانات بنجاح', 'success')
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  saveFiles() {
    console.log('saveInvo')
    this.api.saveContractFiles(this.paymentsArr).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
     //this.newCase.id = data['message']
     this.presentToast('تم حفظ البيانات بنجاح', 'success')
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  prepareContract(){    
       this.servicesArr = []   
       this.paymentsArr = []   
       this.filesArr = []    
    this.selectedCustomer = {id:"",cust_name:""}
    this.isSubmitted = false 
    this.newContract.contract_title = ""
    this.newContract.draft= ""
    this.newContract.amount= 0
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

  serviceCange(event){
    console.log(event.detail.value)
    this.serviceType = event.detail.value 
  }


}
