import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FilterPipe } from './pipe';
import { FilterPipe2 } from './pipe2';
import { FilterPipe3  } from './pipe3';
import { LoadingController, ToastController } from '@ionic/angular';
import { UntypedFormBuilder } from '@angular/forms';
import { ServicesService } from '../stockService/services.service'; 
import { LanguageService } from '../services/language.service';

export interface Consultation {
    id: number; // Unique identifier for each consultation
    client_id: number; // ID of the client
    lawyer_id: number; // ID of the lawyer
    case_id: number; // ID of the legal case
    title: string; // Title or subject of the consultation
    consultation_date: string; // Date and time of the consultation
    duration: number; // Duration of the consultation in minutes
    consultation_notes?: string; // Notes taken during the consultation (optional)
    consultation_fee: number; // Fee charged for the consultation
    consultation_type: string; // Type of consultation (e.g., Initial, Follow-up)
    status: string; // Status of the consultation (e.g., Scheduled, Completed, Cancelled)
    created_at?: string; // Timestamp when the record was created (optional)
    updated_at?: string; // Timestamp when the record was last updated (optional)
    lawyer_name?: string; // Name of the lawyer (optional)
    customer?: string; // Name of the client (optional)
}
@Component({
  selector: 'app-new-consultation',
  templateUrl: './new-consultation.page.html',
  styleUrls: ['./new-consultation.page.scss'],
  standalone: false,
})
export class NewConsultationPage implements OnInit {
  isOpenCustType = false ;
  showCustType = false
  usersArr :Array<any> =[]
  
  selectedCustTye : {id:any ,name:any};
  locale : string = 'ar-SA';
 segVal = 'basics'
  isOpenServ = false ;
  showServ = false 
  servArr :Array<any> =[]
  selectedServ : {id:any ,name:any};

  selectedCustomer : {id:any ,cust_name:any};
  selectedLawyer : {id:any ,full_name:any};

  isOpenCost = false ;
  showCost = false 
  costArr :Array<any> =[]
  selectedCost : {id:any ,name:any};

  isOpenInvoice = false ;
  showInvoice = false 
  invoiceArr :Array<any> =[]
  selectedInvoice : {id:any ,name:any};

  isOpenAgent = false ;
  showAgent = false 
  agentArr :Array<any> =[]
  selectedAgent : {id:any ,name:any};


  isOpenBranch = false ;
  showBranch = false
  BranchArr :Array<any> =[] 
  selectedBranch : {id:any ,name:any};

  isOpenCourt = false ;
  showCourt = false
  courtArr :Array<any> =[] 
  selectedCourt : {id:any ,name:any};

 

 
 
 searchTerm : any = ""
 aliasTerm :any =""
 searchResult :Array<any> =[]
 costumerArr :Array<any> =[]
 

  

 
 

 showNotif = false
 showCase = false


 selectedUser : {id:any ,full_name:any};
  

 @ViewChild('popoverNotif') popoverNotif;
 selectedType : {id:any ,name:any };
 consultationTypeArr :Array<any> =[]
 isOpenNotif = false ;
  
 @ViewChild('popoverLawyer') popoverLawyer;
 isOpenLawyer = false ;

 @ViewChild('popoverCase') popoverCase;
 selectedConsultaionStatus : {id:any ,name:any };
 isOpenCase = false ;
 caseStatusArr :Array<any> =[]

 @ViewChild('popover') popover;
 isOpen = false; 
 //new session 
  newConsultation :Consultation = {
    id:0,
    client_id:0,
    lawyer_id:0,
    case_id:0,
    title:"",
    duration: 0,
    consultation_date:new Date().toISOString(), 
    consultation_notes:"",
    consultation_fee:0,
    consultation_type:"",
    status:"",
    created_at:null,
    updated_at:null 
  }


  category =  'consultation'
   
 
 isSubmitted = false;
   constructor(private languageService:LanguageService,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService ) {
    
    this.getAppInfo()
    
  }

  ngOnInit() {
    
  }

  close(){
    this._location.back();
  }


  segmentCHange(event){
    console.log(event.detail.value)
    this.segVal = event.detail.value
    if(this.segVal == 'files'){
      if(this.newConsultation.id){ 
        //this.getSessionsByCaseId() 
      }else{
       // this.showEmpty = true
      }
    } 
   }


  saveBasics() {
    // let d: Date = this.payInvo.pay_date
    // this.payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.newConsultation) 
      this.saveInvo() 
    }
  }

  saveInvo() {
    console.log('saveInvo')
    this.api.saveConsultaion(this.newConsultation).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Created') { 
      this.newConsultation.id = data['message']
      this.presentToast('تم حفظ البيانات بنجاح', 'success')
      this.segVal = 'files'
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  updateBasics() {
    // let d: Date = this.payInvo.pay_date
    // this.payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.newConsultation) 
      this.updateInvo() 
    }
  }

  updateInvo() {
    console.log('saveInvo')
    this.api.updateConsultaion(this.newConsultation).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Created') { 
      this.presentToast('تم حفظ البيانات بنجاح', 'success')
      this.segVal='files'
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }
 

    selectFromPop(item){
      //console.log(item)
      this.selectedCustomer = {
        id:item.id,
        cust_name:item.cust_name
      }
      this.newConsultation.client_id = item.id   
        this.didDissmis()   
    }

    didDissmis(){
      this.isOpen = false
    }

    selectFromPopLawyer(item){
      //console.log(item)
      this.selectedLawyer = {
        id:item.id,
        full_name:item.full_name
      }
      this.newConsultation.lawyer_id = item.id   
        this.didDissmisLayer()   
    }

    didDissmisLayer(){
      this.isOpenLawyer = false
    }

  presentPopover(e?: Event) {
    //console.log('preent me', e)
     this.popoverLawyer.event = e;
     this.isOpen = true;
     this.clear()
     this.searchResult = this.costumerArr
     setTimeout(() => {
    
     }, 2000);
   }

   presentPopoverLawyer(e?: Event) {
    //console.log('preent me', e)
     this.popoverLawyer.event = e;
     this.isOpenLawyer = true; 
     setTimeout(() => {
    
     }, 2000);
   }


  prepareCace(){  
    this.consultationTypeArr.push(
      {id:1,name:"التصنيف 1"},
      {id:2,name:"التصنيف 2"},
      {id:3,name:"التصنيف 3"},
    ) 

    this.caseStatusArr .push(
      {id:1,name:"مجدولة"},
      {id:2,name:"قيد الإجراء"},
      {id:3,name:"منتهية"},
    ) 
    
    
   // this.selectedLawyersTeamArr = []   
    this.selectedType = {id:"",name:""}
    this.selectedConsultaionStatus = {id:"",name:""}
    this.selectedUser = {id:0 , full_name :""} 
    this.selectedCustomer= {id:0 , cust_name :""}
    this.selectedLawyer = {id:0 , full_name :""}
    this.isSubmitted = false 
    this.newConsultation.title = ""
    this.newConsultation.id = 0
    this.newConsultation.client_id = 0
    this.newConsultation.lawyer_id = 0
    this.newConsultation.case_id = 0
    this.newConsultation.duration = 0 
    this.newConsultation.consultation_date = new Date().toISOString().split('T')[0]
    

  }
 

      validate(){ 
        this.isSubmitted = true; 
        console.log('validate' , this.isSubmitted , this.newConsultation.client_id)
        if (this.newConsultation.title == "") { 
          return false
        } else if(this.newConsultation.lawyer_id == 0){
          return false
        } else if(this.newConsultation.consultation_type == ""){
          return false
        }else if(this.newConsultation.client_id == 0 ){
          return false
        } else {
          return true
        }  
      }


     getLawyers(){ 
      this.api.getTopUsers().subscribe(data =>{
          console.log("'úsers'", data)
          let res = data
          this.usersArr = res['data']   
        }, (err) => {} ,
        ()=>{ 
      }
      )  
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

 

      getAppInfo(){ 
        this.languageService.getCurrentLocale().subscribe(locale => {
          this.locale = locale
          console.log('Current edit sision locale:', locale ,  this.locale); 
        });
        this.prepareCace() 
        this.getTopCustomers()
        this.getLawyers() 
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
  
  presentPopoverNotif(e?: Event) {
  console.log('preent me', e)
     this.showNotif = false
    this.popoverNotif.event = e;
     this.isOpenNotif = true;  
   }

   presentPopoverCase(e?: Event) {
    console.log('preent me', e) 
       this.showCase = false
       this.popoverCase.event = e;
       this.isOpenCase = true;  
     }

     

     
       

       
  
  
  didDissmisNotif(){
    this.isOpenNotif = false
    //console.log('dismissOver') 
  }


  didDissmisCase(){
    this.isOpenCase = false
    //console.log('dismissOver') 
  }
   
  

 

    
    selectFromPopTypes(item ){
       
      // Push to arr
      // remove fro Array where index = item.
      
      this.selectedType = {
        id:item.id,
        name:item.name
      } 
       this.newConsultation.consultation_type = item.name
        //console.log( this.selectedItem); 
         this.didDissmisNotif()
        //perform calculate here so moataz can get the qty
      }

      selectFromPopCase(item){
        console.log(item)
        this.newConsultation.status = item.id
        this.selectedConsultaionStatus = {
          id:item.id,
          name:item.name
        } //console.log( this.selectedItem); 
          this.didDissmisCase()
          //perform calculate here so moataz can get the qty
        }

        

         
 
}