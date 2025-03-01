import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import { ServicesService } from '../stockService/services.service';
 
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { Observable, Subscription } from 'rxjs';
import { AlertController, Platform , LoadingController, ModalController, ToastController, MenuController } from '@ionic/angular';
import { DatePipe ,Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { AuthServiceService } from '../auth/auth-service.service';
import { PrintModalPage } from '../print-modal/print-modal.page';
 
import { StockServiceService } from '../syncService/stock-service.service';
import { DomSanitizer } from '@angular/platform-browser'; 
import { formatDate } from '@angular/common'; 
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.page.html',
  styleUrls: ['./new-invoice.page.scss'],
  standalone: false
})
export class NewInvoicePage implements OnInit {
  @ViewChild("dst") nameField: ElementRef;
  @ViewChild('dstPop') dstPop;
  @ViewChild('qtyId') qtyId; 
  @ViewChild('popInput') popInput; 
  @ViewChild('popover') popover;
  @ViewChild('popoverNotif') popoverNotif;
  isOpen = false; 
  isOpenNotif = false ;
  newNotif = false ; 
  
  sub_account:Array<any> =[]
  sub_accountLocalSales:Array<any> =[]
  sub_accountSales:Array<any> =[]
  initialInvoices:Array<any> =[]
  items:Array<any> =[]
  itemsLocal:Array<any> =[]
  itemList:Array<any> =[]
  salesLocal:Array<any> =[]
  sales:Array<any> =[]
  notifArr:Array<any> =[]
  LogHistoryLocalArr:Array<any> =[]
  purchLocal:Array<any> =[] 
  purchase:Array<any> =[]
  randomsNumber:Array<any> =[]
  store_info : {id:any , location :any ,store_name:any , store_ref:any }
  user_info : {id:any ,user_name:any ,store_id :any,full_name:any,password:any}
  sub_nameNew :any = ""
  discountPerc : any = 0
  selectedItem : {id:any ,pay_ref:any,item_name:any,pay_price:any,perch_price:any,item_unit:any,item_desc:any,parcode:any,qty:any,tot:any ,dateCreated:any,availQty:any,aliasEn:any,tax:any , discount:any};
  selectedAccount : {id:any ,ac_id:any,sub_name:any,sub_type:any,sub_code:any,sub_balance:any,store_id:any ,cat_id:any,cat_name:any,phone:any,address:any,currentCustumerStatus:0};
  payInvo : {pay_id:any ,pay_ref:any ,store_id:any,tot_pr:any,pay:any,pay_date:any,pay_time:any,user_id:any,cust_id:any,pay_method:any,discount:any ,changee:any, sub_name:any, payComment:any, nextPay:any, yearId:any , companyId:any, taxTot:any, backed:any , recived:any , discountTot :any};
  company : { id: any , phone: any, phone2  :any, address :any, logoUrl:any,engName:any,arName:any ,tradNo:any , vatNo:any};
  NumberArray : Array<any> = [1,2,3,4,5,6,7,8,10]
  radioVal : any = 0
  radioVal2 : any = 0
  printMode :boolean = false
  printArr:Array<any> =[]
  offline: boolean = false;
  color :any ='dark'
  showMe = null
  cellIndex = null
  searchResult :Array<any> =[]
  costumerArr :Array<any> =[]
  selectedCustomer : {id:any ,cust_name:any};
  status:any = 'new'
  searchLang :any = 0
  currentCustumerStatus :any
  searchTerm : any = ""
  aliasTerm :any =""
  isSubmitted :boolean = false
  aliasResult :Array<any> =[]
  finalResult :Array<any> =[]
  year : {id:any ,yearDesc:any ,yearStart :any,yearEnd:any}
  loadingItems:boolean = false
  logHistoryArr:Array<any>=[];
  subiscribtionItem:Subscription
  subiscribtionNotif:Subscription
  showNotif = false
  device :any = "" 
  currenQty:any = 0
  firstQty:any = 0
  perchTotQty:any = 0
  payTotQty:any = 0
  perchTot :any = 0
  qtyReal:any = 0
  availQty :any = 0 
  brandList:Array<any> =[]
  filteredItems: Array<any> =[]
  taxAll : any = 0
  netTot : any = 0
  discTot : any = 0
 qrcodedata: string = null;
 locale :any =  "en-US"
  constructor(private languageService : LanguageService,private menuCtrl :MenuController, private sanitizer : DomSanitizer,  private rout : Router ,private platform:Platform,private behavApi:StockServiceService ,private _location: Location, private route: ActivatedRoute,private renderer : Renderer2,private modalController: ModalController,private alertController: AlertController, private authenticationService: AuthServiceService,private storage: Storage,private loadingController:LoadingController, private datePipe:DatePipe,private api:ServicesService,private toast :ToastController) {
    console.log(this.status,' jjjjj')
    this.selectedAccount = {id:"" ,ac_id:"",sub_name:"",sub_type:"",sub_code:"",sub_balance:"",store_id:"",cat_name:"",cat_id:"",phone:"",address:"",currentCustumerStatus:0};
    this.payInvo = {pay_id:"" ,pay_ref:"" ,store_id:"",tot_pr:"",pay:"",pay_date: new Date().toISOString().split('T')[0],pay_time:"",user_id:"",cust_id:"",pay_method:"",discount:"",changee:"", sub_name:"", payComment:"", nextPay:"", yearId:"", companyId:"", taxTot:"", backed:"", recived:"", discountTot :""};
  
   
      this.selectedItem = {
        id:undefined,
        dateCreated:"",
        pay_ref:"",
        item_desc:"",
        item_name:"",
        item_unit:"",
        parcode:0,
        pay_price:0,
        perch_price:0,
        qty:0,
        tot:0,
        availQty:0,
        aliasEn:"",
        tax:0 ,
        discount:0
      }

      this.printArr.push({
        'payInvo': "",
        'itemList':"",
         'selectedAccount' :"",
          'sub_nameNew' : "",
           "userInfo" : "" ,
           "sub_balanse": 0,
           "balanceStatus": "",
           "company": "" ,
           "qrcodedata": "" 
      })
  }


    // async presentAlertConfirmSync(type , flt) {
    //   let msg:string = ''
    //   msg = 'توجد تحديثات في الإصناف , هل تريد المزامنة؟'
    //   const alert = await this.alertController.create({
    //     cssClass: 'my-custom-class',
    //     header: 'تأكيد!',
    //     mode:'ios' ,
    //     message: msg,
    //     buttons: [
    //       {
    //         text: 'إلغاء',
    //         role: 'cancel',
    //         cssClass: 'secondary',
    //         id: 'cancel-button',
    //         handler: (blah) => {
    //           flt.forEach(element => {
    //             let indx = this.notifArr.findIndex(e=>e.logRef === element.logRef)
    //             //console.log ('founded in local ' , indx)
    //             if(indx!=-1){ 
    //               element.logStatus = 0
    //             }  
    //           });
    //           this.storage.set('LogHistoryLocal',flt).then((response) => {
         
    //           })  
    //         }
    //       }, {
    //         text: 'موافق',
    //         id: 'confirm-button',
    //         handler: () => {
    //         if(type == 'item'){
    //           this.getStockItems('sync item',flt) 
    //         }else if(type == 'customers'){
    //           this.getSalesAccount('sync both',flt)
    //         }else if(type == 'both'){
    //           this.bothItemAndAccount('sync both',flt)
    //         } 
    //         }
    //       }
    //     ]
    //   });
    //   await alert.present(); 
    //  }
 

    ngOnInit() {
      this.languageService.getCurrentLocale().subscribe(locale => {
        this.locale = locale
        console.log('Current edit sision locale:', locale ,  this.locale); 
      });
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

    didDissmis(){
      this.isOpen = false
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


    clear(item_name?){
     if(item_name){
      this.selectedItem = {
        id: undefined,
        dateCreated: "", 
        pay_ref:this.payInvo.pay_ref,
        item_desc: "",
        item_name: "",
        item_unit: "",
        parcode: 0,
        pay_price: 0,
        perch_price: 0,
        qty: 0,
        tot: 0,
        availQty:0,
        aliasEn:"",
        tax:0 ,
        discount : 0
      }
     }else{
      this.searchTerm = "" 
     }
    }

  

   


  

 



  async presentAlertConfirm(initial?) {
    let msg:string = 'هل تريد طباعة فاتورة ؟ '
    if(initial){
       msg   = 'هل تريد حذف السجل ؟ '
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'تأكيد!',
      mode:'ios' ,
      message: msg,
      buttons: [
        {
          text: 'إلغاء',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
          //console.log('Confirm Cancel: blah'); 
           this.prepareInvo()
           // this.back()
          }
        }, {
          text: 'موافق',
          id: 'confirm-button',
          handler: () => {
            if(initial){
            
            }else{
              this.presentModal(this.printArr , 'sales')
            } 
          }
        }
      ]
    });
  
    await alert.present();
  }

  Print(elem){ 
      this.printMode = true 
      var mywindow = window.open('', 'PRINT', 'height=400,width=600'); 
      mywindow.document.write('<html><head>'); 
      mywindow.document.write('<style type="text/css">')
      mywindow.document.write('.sumsDiv{border-style: solid;border-color: gray;border-width: .5px;} .flr{ display: block; float: right; } .show{ } .hide{width:0px;height:0px} .w45 {width:45%} .w50 {width:50%} .w100 {width:100%} td, th {border: 1px solid #dddddd;text-align: center;padding: 8px;} tr:nth-child(even) {background-color: #dddddd;} .table{text-align: center;width: 100%; margin: 12px;}.ion-margin{ margin: 10px; } .ion-margin-top{ margin-top: 10px; } .rtl {  direction: rtl; } .ion-text-center{ text-align: center; } .ion-text-end{ text-align: left; } .ion-text-start{ text-align: right; }')
      mywindow.document.write('</style></head><body>');
     
      mywindow.document.write(document.getElementById(elem).innerHTML);
      mywindow.document.write('</body></html>');
  
      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/ 
      mywindow.print();
      mywindow.close();
      this.printMode = false  
      return true;  
  }

 
   
  getAppInfo(){ 
     this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.user_info = response
        //console.log(this.user_info) 
      }
    });

    this.storage.get('STORE_INFO').then((response) => {
      if (response) {
        this.store_info = response
         //console.log(response)
         //console.log(this.store_info) 
         this.getItems()
        // this.getItemLocalOff()
        // this.getAccountOffline()
        //this.getSalesAccount()
        this.prepareInvo()
      }
    }); 
  }
  
  getAppInfoCase2(){ 
     this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.user_info = response
        //console.log(this.user_info) 
      }
    }); 
  }

  prepareOffline(){
    this.storage.get('salesLocal').then((response) => {
      //console.log('saleslocal heres',this.salesLocal) 
      if (response) {
        this.salesLocal = response
        //console.log('salesLocal',this.salesLocal) 
      }
    });

    this.storage.get('sales').then((response) => {
      //console.log('sales heres',this.sales) 
      if (response) {
        this.sales = response
        //console.log('sales',this.sales) 
      }
    });

    this.storage.get('itemsLocal').then((response) => {
      if (response) {
        this.itemsLocal = response 
         //console.log(this.itemsLocal)  
         this.items = this.itemsLocal  
      }
    });  
   
   this.storage.get('sub_accountLocalSales').then((response) => {
     if (response) {
       this.sub_accountLocalSales = response 
      
        //console.log(this.sub_accountLocalSales)  
     }
   });
   //Yaw
   this.storage.get('sub_accountSales').then((response) => {
    if (response) {
      this.sub_accountSales = response  
       //console.log(this.sub_accountLocalSales)  
       this.getSubBalance()
    }
   }); 
  }

 // ne logic 
 async  newLogic(){
  //console.log('new logic')
    await this.getAppInfo() 
    await this.prepareInvo()
 }
 
 getItemLocalOff(){
  this.storage.get('itemsLocal').then((response) => {
    if (response) {
      this.itemsLocal = response 
       //console.log(this.itemsLocal)  
       this.items = this.itemsLocal
      //  this.items.forEach(element => {
      //   if(+element.tswiaQuantity > 0){
      //     element.salesQuantity = +element.salesQuantity + +element.tswiaQuantity 
      //   }else if(+element.tswiaQuantity < 0){
      //     element.perchQuantity = +element.perchQuantity + Math.abs(+element.tswiaQuantity) 
      //   }     element.quantity = (+element.perchQuantity + +element.firstQuantity) - +element.salesQuantity
      // });
      this.searchResult = this.items  
    }
  }); 
 }

 getAccountOffline(){
  this.storage.get('sub_accountSales').then((response) => {
    if (response) {
      this.sub_account= response  
       //console.log(this.sub_accountLocalSales)  
       this.getSubBalance()
       this.addSubaccountLocal()
    }
  });
 }


 //end of new logic

  radioChange(ev){
    //console.log(ev.target.value) 
   }

  recalSubBalance(){
    // adding new change to subbalances
    this.sub_account.forEach(element => {
      element.sub_balance = 0 
      let debitTot = +element.changeeTot + +element.fromDebitTot
      let creditTot = +element.purchChangeeTot + +element.toCreditTot
      if(this.radioVal == 0  && this.selectedAccount.id == element.id){
        debitTot = +debitTot + +this.payInvo.changee
      }
    
      if (debitTot == creditTot) {
        element.sub_balance = 0
        element.currentCustumerStatus = ''
      }else if(debitTot > creditTot ){
        element.sub_balance = (+debitTot - +creditTot).toFixed(2)
        element.currentCustumerStatus = 'debit'
        if(+this.selectedAccount.id == +element.id){
          this.selectedAccount.sub_balance = element.sub_balance 
          this.selectedAccount.currentCustumerStatus = element.currentCustumerStatus 
          }
      }else if(creditTot > debitTot ){
        element.sub_balance = (+creditTot - +debitTot).toFixed(2)
        element.currentCustumerStatus = 'credit'
        if( +this.selectedAccount.id == +element.id){
          this.selectedAccount.sub_balance = element.sub_balance 
          this.selectedAccount.currentCustumerStatus = element.currentCustumerStatus
          }
      }
    });
    //console.log('recalSubBalance',this.sub_account)
  }

   getSubBalance(){
    // payTot' => $payTot ,
    //      'tot_prTot' => $tot_prTot ,
    //      'changeeTot' => $changeeTot ,
    //      'purchPayTot' => $purchPayTot ,
    //      'purchTot_prTot' => $purchTot_prTot ,
    //      'purchChangeeTot' => $purchChangeeTot ,
    // 'fromDebitTot' => $fromDebitTot ,
    // 'fromCreditTot' => $fromCreditTot ,
    //  'toDebitTot' => $toDebitTot ,
    // 'toCreditTot' => $toCreditTot   
    this.sub_account.forEach(element => {
      element.sub_balance = 0
      let debitTot = +element.changeeTot + +element.fromDebitTot
      let creditTot = +element.purchChangeeTot + +element.toCreditTot
      if (debitTot == creditTot) {
        element.sub_balance = 0
        this.currentCustumerStatus = ''
   
       }else if(debitTot > creditTot ){
        
         element.sub_balance = (+debitTot - +creditTot).toFixed(2)
        this.currentCustumerStatus = 'debit'
  
       }else if(creditTot > debitTot ){
         element.sub_balance = (+creditTot - +debitTot).toFixed(2)
        this.currentCustumerStatus = 'credit'
       }
    });
    //console.log('balances',this.sub_account)
   }

   radioChange2(ev ,form?){
    //console.log(ev.target.value)  
    //console.log(this.status) 
    if(form == 'from'){
      if(ev.target.value == 1 && this.status == 'initial'){  
        this.status = 'toFinal'
        this.payInvo.yearId = this.year.id
        if(this.itemList.length>0){
          this.itemList.forEach(element =>{
            element.yearId =this.year.id
          })
        }
        //console.log('convert invo to final',this.status)
      }else if(ev.target.value == 0 && this.status == 'toFinal'){ 
        this.status = 'initial'
        //console.log('from final to initial',this.status)
      }
    } 
   }

  prepareInvo(){  
        this.selectedAccount = {id:"" ,ac_id:"",sub_name:"",sub_type:"",sub_code:"",sub_balance:"",store_id:"",cat_id:"",cat_name:"",phone:"",address:"", currentCustumerStatus:0};
        this.sub_nameNew = ""
        this.radioVal = 0
        this.radioVal2 = 0
        this.payInvo ={pay_id:undefined ,pay_ref:0 ,store_id:"",tot_pr:0,pay:0,pay_date:"",pay_time:"",user_id:"",cust_id:null,pay_method:"",discount:0 ,changee:0,sub_name:"",payComment:"",nextPay:null, yearId:this.year.id , companyId:this.company.id,recived:0,taxTot:0,backed:0, discountTot:0};
        this.discountPerc = 0
        let d = new Date
      // this.payInvo.pay_date  = d.getMonth().toString() + "/"+ d.getDay().toString()+ "/"+ d.getFullYear().toString() 
       this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
       this.payInvo.pay_time = this.datePipe.transform(d, 'HH:mm:ss') 
       this.payInvo.pay_method = 'card'
       this.generateRandom()  
       this.payInvo.store_id =this.store_info.id
       this.payInvo.user_id = this.user_info.id
       this.payInvo.yearId = this.year.id
         
       //console.log(this.payInvo) 
       this.itemList = []
      // this.getAccountOffline()
       console.log('payInvo prepare' , this.payInvo)
      // this.getSalesAccount()   
      // this.setFocusOnInput('dst')
      // this.setFocusOnInput('dstPop')
  }
 
  

   isFocused(event){
    //console.log('dsdfsdf',event)
  }

   

  getItems() {
    if (this.offline == false) {
      this.api.getItems().subscribe(data => { 
        let res = data
        this.items = res['data']
        this.items.forEach(element => {
          this.sanitizer.bypassSecurityTrustResourceUrl(element['imgUrl']);

        });
           console.log(this.items)
      }, (err) => {
        //console.log(err);
      })
    } else {
      this.items = this.itemsLocal
    }
  }

 //Yaw
  getSalesAccount(status?,flt?){
    if (this.offline == false) {
    this.api.getSalesAccounts(this.store_info.id , this.year.id).subscribe(data =>{
       let res = data
       this.sub_account = res ['data']
       //console.log(this.sub_account)
       this.getSubBalance()
       this.addSubaccountLocal()
       if(status == 'sync both'){
        this.storage.set('sub_accountSales' , this.sub_account).then((response) => {
          if (response) { 
             
          }
         });
       
       }
       
     }, (err) => {
     //console.log(err);
   }) 
  }else{
    this.MixSubaccountSalesOffline()
   } 
  } 

  //  prepareCustSupl(){
  //   this.sub_account.forEach(element => {
  //     if(element.cat_id == 1){ 
      
         
  //         let tot_pr = element. 
  //         let discount =  element.
  //         let totAfterDiscout =   + tot_pr - +discount 
  //         let pay =  
  //         let balance = +totAfterDiscout - +pay
  //        // this.debitors = this.debitors + +balance
  //        if(+element.debit > 0){
  //         element.debit = +element.debit + +balance
  //         }else if(+element.debit == 0 && +element.credit == 0){
  //           element.debit = +element.debit + +balance
  //         }else if(+element.credit > 0){
  //           if(balance >= element.credit){
  //             element.debit = +balance - +element.credit
  //             element.credit = 0
  //           }else if(balance  <  element.credit){
  //             element.credit = +element.credit - +balance
  //             element.debit = 0
  //           }
  //         }
             
  //     } else if(element.cat_id == 2){
  //       let fltPurch : Array<any> = []
  //       fltPurch = this.purchase.filter(x=>x.cust_id == element.id)
  //       //console.log('fltPurch',fltPurch)
  //       if(fltPurch.length>0){
  //         let tot_pr =  fltPurch.reduce( (acc, obj)=> { return acc + +obj.tot_pr; }, 0); 
  //         let discount =  fltPurch.reduce( (acc, obj)=> { return acc + +obj.discount; }, 0);
  //         let totAfterDiscout =   + tot_pr - +discount 
  //         let pay =  fltPurch.reduce( (acc, obj)=> { return acc + +obj.pay; }, 0);
  //         let balance = +totAfterDiscout - +pay
  //        // this.creditors = this.creditors + +balance
  //        if(+element.credit > 0){
  //         element.credit = +element.credit + +balance
  //         }else if(+element.debit == 0 && +element.credit == 0){
  //           element.credit = +element.credit + +balance
  //         }else if(+element.debit > 0){
  //           if(balance >= element.debit){
  //             element.credit = +balance - +element.debit
  //             element.debit = 0
  //           }else if(balance  <  element.debit){
  //             element.debit = +element.debit - +balance
  //             element.credit = 0
  //           }
  //         }
          
  //       }
  //     } 
  //   });
  // }
   //Yaw
   addSubaccountLocal(){
    if (this.sub_account) {
      if (this.sub_accountLocalSales) {
        for (let i = 0; i < this.sub_accountLocalSales.length; i++) {
          const element = this.sub_accountLocalSales[i];
          this.sub_account.push(element)
        }
      }
    } else {
      if (this.sub_accountLocalSales) {
        this.sub_account = this.sub_accountLocalSales 
      }
    } 
    }
//Yaw
    MixSubaccountSalesOffline(){
      this.sub_account=[] 
        if (this.sub_accountLocalSales) {
          for (let i = 0; i < this.sub_accountLocalSales.length; i++) {
            const element = this.sub_accountLocalSales[i];
            this.sub_account.push(element)
          }
        }

        if (this.sub_accountSales) {
          for (let i = 0; i < this.sub_accountSales.length; i++) {
            const element = this.sub_accountSales[i];
            this.sub_account.push(element)
          }
        } 
      }

generateRandom():any{
  let da = new Date 
  //console.log(da)
  let randomsNumber = da.getMonth().toString() + da.getDay().toString() + da.getHours().toString()+ da.getMinutes().toString()+da.getSeconds().toString()+da.getMilliseconds().toString()
  this.payInvo.pay_ref = this.store_info.store_ref + randomsNumber
  //console.log(randomsNumber)
  //console.log(this.payInvo.pay_ref)  
}




pickAccount(ev){
  let fl= this.sub_account.filter(x=>x.sub_name == ev.target.value)
  //console.log(fl);
  if (fl.length > 0) {
  this.selectedAccount = {
    id:fl[0]['id'],
    ac_id:fl[0]['ac_id'],
    sub_name:fl[0]['sub_name'],
    sub_type:fl[0]['sub_type'],
    sub_code:fl[0]['sub_code'], 
    store_id:fl[0]['store_id'],
    sub_balance:fl[0]['sub_balance'] ,
    cat_id:fl[0]['cat_id'],
    cat_name:fl[0]['cat_name'],
    phone:fl[0]['phone'],
    address:fl[0]['address'],
    currentCustumerStatus:fl[0]['currentCustumerStatus']
  }
  //console.log( this.selectedAccount);
  this.payInvo.cust_id = this.selectedAccount.id
  this.payInvo.sub_name = this.selectedAccount.sub_name
//  this.setFocusOnInput()
}else{
  this.presentToast('خطأ في اسم الحساب ', 'danger') 
  this.selectedItem.item_name =""
}
}

selectFromPop2(item){
  //console.log(item)
  this.selectedCustomer = {
    id:item.id,
    cust_name:item.cust_name
  }
   this.payInvo.cust_id = item.id
   this.searchTerm = item.cust_name
    //console.log( this.selectedItem); 
    this.didDissmis()
    //perform calculate here so moataz can get the qty
}

selectFromPop(item){
//console.log(item)
this.selectedItem = {
  id:item.id,
  dateCreated:item.dateCreated,
  pay_ref:this.payInvo.pay_ref,
  item_desc:item.item_desc,
  item_name:item.item_name,
  item_unit:item.item_unit,
  parcode:item.parcode,
  pay_price:item.pay_price,
  perch_price:item.perch_price,
  qty:"",
  tot:item.pay_price,
  availQty:item.quantity,
  aliasEn:item.aliasEn ,
  tax:item.tax,
  discount:0
} 
 this.searchTerm = item.item_name
  //console.log( this.selectedItem); 
 // this.didDissmis()
  //perform calculate here so moataz can get the qty
}


getItemPaysByItemId(){  
  this.api.getItemQtyPaysByItemId(this.store_info.id ,this.selectedItem.id,this.year.id).subscribe(data =>{
     console.log('getItemPaysByItemId',data)
     let res = data
     if(res['message'] != 'No record Found'){
       this.payTotQty = res['data'][0].salesQuantity 
     }
       this.getQtyPurchByItemId() 
    
   }, (err) => {
   //console.log(err);
   this.presentToast('1خطا في الإتصال حاول مرة اخري' , 'danger')
  
 },
 ()=>{
 })  
 }

 getQtyPurchByItemId(){ 
  this.api.getQtyPurchByItemId(this.store_info.id ,this.selectedItem.id,this.year.id).subscribe(data =>{
     //console.log('purch',data)
     let res = data
     if(res['message'] != 'No record Found'){
       this.perchTotQty = res['data'][0].perchQuantity 
       this.firstQty =    res['data'][0].firstQuantity 
     } 
     this.getQtyTswiaByItemId() 
   }, (err) => {
   //console.log(err);
   this.presentToast('  خطا في الإتصال حاول مرة اخري' , 'danger')
 },
 ()=>{
  
 })  
 }


 getQtyTswiaByItemId(){  
  this.api.getQtyTswiaByItemId(this.store_info.id ,this.selectedItem.id,this.year.id).subscribe(data =>{
     console.log('getQtyTswiaByItemId',data)
     let res = data
     if(res['message'] != 'No record Found'){
      this.availQty = res['data'][0].availQty   
      this.qtyReal = res['data'][0].qtyReal   
     } 
     this.getQtyTotalItemId()  
   }, (err) => {
   //console.log(err);
   this.presentToast('  خطا في الإتصال حاول مرة اخري' , 'danger')
 },
 ()=>{

 })  
 }

 getQtyTotalItemId(){  
  //console.log('perchTotQty',this.perchTotQty ,this.payTotQty )
  //تجميع الكيات السالبة وتحويلها لموجب لإضافتها للمشتريات
  if( (+this.availQty  - +this.qtyReal) < 0 ){ 
    this.perchTotQty = +this.perchTotQty +  Math.abs((+this.availQty  - +this.qtyReal))  
  }else if((+this.availQty  - +this.qtyReal) > 0 ){
    this.payTotQty = +this.payTotQty + (+this.availQty  - +this.qtyReal)  
  } 
  this.availQty = + this.perchTotQty  - +  this.payTotQty
  console.log(this.payTotQty , this.payTotQty)
} 



pickDetail(ev){ 
  let fl : Array<any>=[]
  if(this.searchLang == 1){
     fl= this.items.filter(x=>x.item_desc == ev.target.value)
    //console.log('hyrr',fl);
  } else {
     fl= this.items.filter(x=>x.item_name == ev.target.value)
    //console.log(fl);
  }
 

  if (fl.length > 0) {
    this.selectedItem = {
    id:fl[0]['id'],
    dateCreated:fl[0]['dateCreated'],
    pay_ref:this.payInvo.pay_ref,
    item_desc:fl[0]['item_desc'],
    item_name:fl[0]['item_name'],
    item_unit:fl[0]['item_unit'],
    parcode:fl[0]['parcode'],
    pay_price:fl[0]['pay_price'],
    perch_price:fl[0]['perch_price'],
    qty:"",
    tot:fl[0]['pay_price'],
    availQty:fl[0]['quantity'],
    aliasEn:fl[0]['aliasEn'],
    tax:fl[0]['tax'] ,
    discount:fl[0]['disc'] 
  }
  //console.log( this.selectedItem);
 // this.setFocusOnInput('qtyId')
  }else{
    this.presentToast('خطأ في اسم الصنف ', 'danger') 
    this.selectedItem.item_name =""
    this.selectedItem.item_desc =""
  } 
}

qtyhange(ev){
  //console.log(ev);
  this.selectedItem.tot =  (this.selectedItem.qty * +this.selectedItem.pay_price).toFixed(2)

  let fl : Array<any> = []
  if (this.itemList.length > 0) {
      fl = this.itemList.filter(x => x.item_name == this.selectedItem.item_name )
    if (fl.length> 0){
      //console.log(fl)
      if(+this.selectedItem.qty + +fl[0].quantity > +this.selectedItem.availQty){
        this.presentToast('الصنف موجود بالقائمة , مجموع الكمية الجديد اكبر من المتوفر في المخزن','warning')
       }
    }else{
      if(+this.selectedItem.qty > +this.selectedItem.availQty){
        this.presentToast('الكمية في المخزن غير كافية','warning')
       }
    }
  }else{
    if(+this.selectedItem.qty > +this.selectedItem.availQty){
      this.presentToast('الكمية في المخزن غير كافية','warning')
     }
  }

 
}

pricehange(ev){
  //console.log(ev);
  let  discountPrice = +this.selectedItem.discount/100 * (+this.selectedItem.pay_price * this.selectedItem.qty)

  this.selectedItem.tot =  (this.selectedItem.qty * (((+this.selectedItem.pay_price * this.selectedItem.qty) - discountPrice  ) + (+this.selectedItem.tax/100 * ((+this.selectedItem.pay_price * this.selectedItem.qty) - discountPrice) ))).toFixed(2)
 
}

getTotal(){
  let sum = this.itemList.reduce( (acc, obj)=> { return acc + (+obj.quantity * +obj.pay_price ); }, 0);
//   let sum = 0
//  for (let I = 0; I < this.itemList.length; I++) {
//   const element = this.itemList[I];
//   let d = +element.pay_price - +element.discount
//   let descPrice = +element.quantity * +d
//   sum = sum + descPrice
//   console.log('sum', sum ,   descPrice ) 
//  }
  
 this.payInvo.taxTot = this.itemList.reduce((acc, obj)=> { return acc + +obj.tax ; }, 0);
 this.payInvo.discountTot = this.itemList.reduce((acc, obj)=> { return acc + +obj.discount ; }, 0);
 this.payInvo.discountTot = this.payInvo.discountTot.toFixed(2)
  // let taxtot  = 0
  // for (let I = 0; I < this.itemList.length; I++) {
  //   const element = this.itemList[I];
  //   let tot = +element.quantity * (( +element.pay_price - (element.pay_price * element.discount/100)) * +element.tax/100)
  //   taxtot = taxtot + tot
  //  }
  //  this.payInvo.taxTot = taxtot


 //  this.taxTot = this.itemList.reduce( (acc, obj)=> { return acc + (+obj.pay_price * (+obj.tax/100)); }, 0);
  console.log('sum', sum)
  this.payInvo.taxTot =this.payInvo.taxTot.toFixed(2)
  //
  this.payInvo.tot_pr = +sum -  +this.payInvo.discount

  this.taxAll =  (+this.payInvo.tot_pr -  this.payInvo.discountTot  + +this.payInvo.taxTot).toFixed(2)
  
  this.payInvo.pay = +this.taxAll

  this.payInvo.changee = +this.taxAll - +this.payInvo.pay
  
  this.payInvo.tot_pr = this.payInvo.tot_pr.toFixed(2)

  this.payInvo.changee = this.payInvo.changee.toFixed(2)
} 

payChange(ev){
  //console.log(ev); 
  // if(this.discountPerc>0){
  //   this.payInvo.discount = (+this.payInvo.tot_pr * +this.discountPerc/100).toFixed(2)
  // }
  this.payInvo.recived = ev.target.value
  this.payInvo.backed = +this.taxAll - ev.target.value 
  this.payInvo.changee = +this.taxAll - ev.target.value  
}

discountChange(ev){
  //console.log('discountChange' ,ev); 
  //this.discountPerc = ((+this.payInvo.discount /+this.payInvo.tot_pr) * 100 ).toFixed(2)
  this.getTotal()
}

discountPerChange(ev){
  //console.log('discountPerChange',ev);
  this.payInvo.discount = (+this.payInvo.tot_pr * +this.discountPerc/100).toFixed(2)
  this.payInvo.changee = +( this.payInvo.tot_pr -  this.payInvo.discount ) - this.payInvo.pay
}

deleteItem(index){
//console.log( index); 
this.itemList.splice(index,1)
//console.log( this.itemList);
this.payInvo.pay =0
this.discountPerc=0
this.payInvo.discount=0 
this.netTot=0 
this.taxAll=0 
this.getTotal()
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




refresh(para){ 
    this.getSalesAccount() 
}



addTolist() {
    if (this.selectedItem.item_name == ""  || +this.selectedItem.qty == 0 || +this.selectedItem.pay_price == 0 ) {
      this.presentToast('الرجاء ادخال الخدمة  وتحديد العدد ', 'danger')
    }else {
        let d =   new Date
        let r= this.datePipe.transform(d, 'dd-MM-YYYY') 
        this.itemList.push({
        "id" : 'NULL',
        "pay_ref" :this.selectedItem.pay_ref,
        "item_name" :this.selectedItem.item_name,
        "pay_price" :this.selectedItem.pay_price,
        "quantity" : +this.selectedItem.qty,
        "tot" :this.selectedItem.tot, 
        "store_id" : 1, 
        "yearId" :1, 
        "item_id" : 1,
        "dateCreated" : r,
        "perch_price": 1 ,
        "tax":this.selectedItem.tax ,
        "discount":this.selectedItem.discount  
        })
      this.selectedItem = {
        id: undefined,
        dateCreated: "", 
        pay_ref:this.payInvo.pay_ref,
        item_desc: "",
        item_name: "",
        item_unit: "",
        parcode: 0,
        pay_price: 0,
        perch_price: 0,
        qty: 1,
        tot: 0,
        availQty:0,
        aliasEn:"",
        tax:15 ,
        discount : 0
      }
      this.discountPerc = 0
      this.payInvo.discount = 0 
      this.getTotal()
    //  this.setFocusOnInput('dstPop')
    }
   
  }


  qtyChange(ev){
    this.selectedItem.tot = ev.target.value 
  }
  
  addTolistClick(item) {
    this.selectedItem = item
    console.log(item)
   // ((+item.pay_price - +discountPrice) + (item.tax/100 * (+item.pay_price - +discountPrice))).toFixed(2)
    this.selectedItem = {
      id: item.id,
      dateCreated: "", 
      pay_ref:this.payInvo.pay_ref,
      item_desc: item.item_desc,
      item_name: item.item_name,
      item_unit: item.item_unit,
      parcode:item.parcode,
      pay_price: item.pay_price,
      perch_price: item.item_name,
      qty: 1,
      tot : item.tot  ,
      availQty:0,
      aliasEn:+item.aliasEn ,
      tax:item.tax ,
      discount:item.discount   
    }

    // if (this.selectedItem.item_name == "" || this.selectedItem.id == "" || +this.selectedItem.qty == 0 ) {
    //   this.presentToast('الرجاء اختيار الصنف وتحديد الكمية', 'danger')
    // }else {
      let fl: any = []
      if (this.itemList.length > 0) {
        fl = this.itemList.filter(x => x.item_name == this.selectedItem.item_name &&  x.pay_price == this.selectedItem.pay_price)
      }

    

      if (fl.length == 0) {
        let  discountPrice = (+this.selectedItem.discount/100 *  +this.selectedItem.pay_price ).toFixed(2) 
        let tax = (+this.selectedItem.tax/100 * (+this.selectedItem.pay_price - +discountPrice)).toFixed(2)
        let tot = +this.selectedItem.pay_price - + discountPrice + +tax

        let d =   new Date
        let r= this.datePipe.transform(d, 'dd-MM-YYYY')
         this.selectedItem.qty = 1

        this.itemList.push({
        "id" : 'NULL',
        "pay_ref" :this.selectedItem.pay_ref,
        "item_name" :this.selectedItem.item_name,
        "pay_price" :this.selectedItem.pay_price,
        "quantity" : +this.selectedItem.qty,
        "tot" : tot.toFixed(2),
        "store_id" :+this.store_info.id, 
        "yearId" :+this.year.id, 
        "item_id" : +this.selectedItem.id,
        "dateCreated" : r,
        "perch_price":this.selectedItem.perch_price,
        "tax":tax ,
        "discount": +discountPrice 
        })
      } else {
        //console.log(this.itemList);
        //console.log(fl[0].quantity);
        //console.log(+this.selectedItem.qty);
        this.selectedItem.qty = 1
        this.selectedItem.qty = +fl[0].quantity + +this.selectedItem.qty
        let index = this.itemList.map(e => e.item_name).indexOf(this.selectedItem.item_name);
        this.itemList[index].quantity = +this.selectedItem.qty
        //اجمالي التخفيض 
        let  discountPrice = ((+this.selectedItem.pay_price * +this.selectedItem.qty) * +this.selectedItem.discount/100 ).toFixed(2) 
        
        // إجمالي الضريبة
        let tax = (((+this.selectedItem.pay_price  * +this.selectedItem.qty) - +discountPrice) * this.selectedItem.tax/100 ).toFixed(2)

         // إجمالي شامل الضريبة والتخفيض 
        let tot = ((+this.selectedItem.pay_price * +this.selectedItem.qty) - + discountPrice + +tax).toFixed(2)



       // let  discountPrice = +this.selectedItem.discount/100 * (+this.selectedItem.pay_price * this.selectedItem.qty)
        this.itemList[index].discount = discountPrice 
        this.itemList[index].tot = tot 
        this.itemList[index].tax = tax
        //  this.itemList[index].tot =  (this.selectedItem.qty * (((+this.selectedItem.pay_price * this.selectedItem.qty) - discountPrice  ) + (+this.selectedItem.tax/100 * ((+this.selectedItem.pay_price * this.selectedItem.qty) - discountPrice) ))).toFixed(2)
      }

      this.selectedItem = {
        id: undefined,
        dateCreated: "", 
        pay_ref:this.payInvo.pay_ref,
        item_desc: "",
        item_name: "",
        item_unit: "",
        parcode: 0,
        pay_price: 0,
        perch_price: 0,
        qty: 0,
        tot: 0,
        availQty:0,
        aliasEn:"",
        tax:0 ,
        discount:0 
      }
      this.discountPerc = 0
      this.payInvo.discount = 0 
      this.getTotal() 
  }



  qtyClick(i){
    //console.log(i)
    this.showMe = i
    this.cellIndex = i 
  }



   presentPopoverQtyPop(e?: Event ,cellndex? ) {
     console.log('preent me', cellndex)
      this.showMe = cellndex 
      this.cellIndex = cellndex 
       this.showNotif = false
       this.popoverNotif.event = e;
       this.isOpenNotif = true;  
     }

  hideMe(i){
    this.showMe = null 
  }

 didDissmisQtPop(){
      this.isOpenNotif = false
      this.showMe = null 
      //console.log('dismissOver') 
  }

  editCell(i){
    if(+this.itemList[i].quantity > 0 && +this.itemList[i].pay_price > 0){
      this.itemList[i].tot = +this.itemList[i].quantity * +this.itemList[i].pay_price
      this.discountPerc = 0
      this.payInvo.discount = 0
      this.hideMe(i)
      this.getTotal() 
    }else{
      this.presentToast("خطأ في الإدخال ", "danger")
    }
   
  }

  editCellPop(cellindex , qt?){ 
    if(+this.itemList[cellindex].quantity > 0 && +this.itemList[cellindex].pay_price > 0){
      if(qt){
        this.itemList[cellindex].quantity = qt
      }
      let fl :any =[]
      fl = this.items.filter(x => x.id == +this.itemList[cellindex].item_id)


      console.log(fl[0] );
      let  discountPrice = ((+fl[0].pay_price * +this.itemList[cellindex].quantity) * fl[0].discount/100 ).toFixed(2) 
        
      // إجمالي الضريبة
      let tax = (((fl[0].pay_price  * +this.itemList[cellindex].quantity) - +discountPrice) * fl[0].tax/100 ).toFixed(2)

       // إجمالي شامل الضريبة والتخفيض 
      let tot = ((this.itemList[cellindex].pay_price * this.itemList[cellindex].quantity) - + discountPrice + +tax).toFixed(2)



     // let  discountPrice = +this.selectedItem.discount/100 * (+this.selectedItem.pay_price * this.selectedItem.qty)
     this.itemList[cellindex].discount = discountPrice 
     this.itemList[cellindex].tot = tot 
     this.itemList[cellindex].tax = tax

      // this.itemList[cellindex].tot = +this.itemList[cellindex].quantity * (+this.itemList[cellindex].pay_price + (+this.itemList[cellindex].pay_price * +this.itemList[cellindex].tax/100))
      // this.itemList[cellindex].tot = this.itemList[cellindex].tot.toFixed(2)
      this.discountPerc = 0
      this.payInvo.discount = 0
      this.didDissmisQtPop()
      this.getTotal() 
    }else{
      this.presentToast("خطأ في الإدخال ", "danger")
    }
  }



validate():boolean{
  let fl :any =[]
  if (this.sub_account) {
     fl = this.sub_account.filter(x=>x.sub_name == this.sub_nameNew )
  //console.log(fl)
  }
  if (this.itemList.length == 0  || this.payInvo.pay_ref == "" ) {
    this.presentToast('الرجاء ادخال اصناف الي القائمة','danger')
    return false
  }
  else if(this.payInvo.pay_date == "" || this.payInvo.pay_date == undefined) {
    this.presentToast('الرجاء تحديد التاريخ ','danger')
    return false
  }else if(this.payInvo.changee < 0 ) {
    this.presentToast('الرجاء مراجعة المبلغ المستلم والخصم  ','danger')
    return false
  } else {
    return true
  }
}

saveIntial(){ 
  if(this.radioVal == 1){
   this.payInvo.sub_name = this.sub_nameNew
   this.payInvo.cust_id = null
  }  
  // check if the invoice is exist
 if(this.initialInvoices.length > 0){ 
  this.initialInvoices = this.initialInvoices.filter(x=>x['payInvo'].pay_ref != this.payInvo.pay_ref) 
  }

  this.initialInvoices.push({
    "payInvo": this.payInvo,
    "itemList": this.itemList
  })

  this.storage.set('initialInvoices', this.initialInvoices).then((response) => {
    this.printArr = []
    this.recalSubBalance()
    this.printArr.push({
      'payInvo': this.payInvo,
      'itemList':this.itemList,
      'selectedAccount' : this.selectedAccount,
      'sub_nameNew' : this.sub_nameNew ,
      "user_name" : this.user_info.full_name ,
      "sub_balanse": this.selectedAccount.sub_balance,
      "balanceStatus":  this.selectedAccount.currentCustumerStatus ,
      "company": this.company ,
      "qrcodedata":this.qrcodedata  
      
    }) 
      //console.log(this.printArr)
      this.presentAlertConfirm()
      this.presentToast('تم الحفظ بنجاح', 'success')
      this.prepareInvo()
      this.status = 'new'
    });  
}


  save() {
    let d: Date = this.payInvo.pay_date
    this.payInvo.sub_name = this.selectedAccount.sub_name
    this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
    //console.log('save testing', this.payInvo, this.payInvo.sub_name)
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.payInvo)
      this.prepareQrcode2()
      this.saveInvo() 
    }
  }


  // prepareLogHistory(itemData , firstq , role){
  //   this.logHistoryArr = []
  //  let dt = new Date()
  //  let typee = "" 
  //    if(role == 'insert'){
  //      typee = "insert firstq"
  //        itemData.id = firstq.item_id
  //      this.logHistoryArr.push(
  //        {
  //          "id":this.firstq.id,
  //          "logRef":this.generateRandom(typee),
  //          "userId": this.user_info.id,
  //          "typee":typee,
  //          "datee": momentObj(dt).locale('en').format('YYYY-MM-DD HH:mm:ss'),
  //          "logStatus":0,
  //          "logToken": JSON.stringify(firstq)  ,
  //          "yearId": this.year.id,
  //          "store_id" :this.store_info.id
  //        }
  //        )

  //        typee = "insert item"
  //        this.logHistoryArr.push(
  //          {
  //            "id":null,
  //            "logRef":this.generateRandom(typee),
  //            "userId":this.user_info.id,
  //            "typee":typee,
  //            "datee": momentObj(dt).locale('en').format('YYYY-MM-DD HH:mm:ss'),
  //            "logStatus":0,
  //            "logToken":JSON.stringify(itemData)  ,
  //            "yearId":this.year.id,
  //            "store_id":this.store_info.id
  //          }
  //          )
  //    } else {
  //     // typee = "insert firstq"
  //      // firstq.item_id =  itemData.id 
  //      // this.logHistoryArr.push(
  //      //   {
  //      //     "id":this.firstq.id,
  //      //     "logRef":this.generateRandom(),
  //      //     "userId": this.user_info.id,
  //      //     "typee":typee,
  //      //     "datee": momentObj(dt).locale('en').format('YYYY-MM-DD HH:mm:ss'),
  //      //     "logStatus":0,
  //      //     "logToken": JSON.stringify(firstq)  ,
  //      //     "yearId": this.year.id,
  //      //     "store_id" :this.store_info.id
  //      //   }
  //      //   )
  //      if(role == 'update' ){
  //        typee = "update item" 
  //      }else if(role == 'delete' ){
  //        typee = "delete item" 
  //      }
  //        this.logHistoryArr.push(
  //          {
  //            "id":null,
  //            "logRef":this.generateRandom(typee),
  //            "userId":this.user_info.id,
  //            "typee":typee,
  //            "datee": momentObj(dt).locale('en').format('YYYY-MM-DD HH:mm:ss'),
  //            "logStatus":0,
  //            "logToken":JSON.stringify(itemData)  ,
  //            "yearId":this.year.id,
  //            "store_id":this.store_info.id
  //          }
  //          )
  //        }
  //      return this.logHistoryArr
  //    }


      saveLogHistory(){  
        //let mdata =  this.prepareLogHistory(itemData , firstq , role) 
        //console.log('this.logHistoryArr[0]',this.logHistoryArr[0])
         let role
         let cust
         let invo 
         if (this.logHistoryArr.length > 1) {
          invo = this.logHistoryArr[1]
          cust = this.logHistoryArr[0]
          role = 'new account'
         } else {
          invo = this.logHistoryArr[0]
          role = undefined
         }
        this.api.saveLogHistoryMultiSales(invo ,cust,role).subscribe(data => {
         //console.log(data)
         if (data['message'] != 'Post Not Created') { 
          this.logHistoryArr = []
          this.presentAlertConfirm() 
          this.presentToast('تم الحفظ بنجاح' , 'success')
          // this.getStockItems()
         }else{
           this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري' , 'danger') 
         }
       }, (err) => {
         //console.log(err);
         this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري' , 'danger')
       }) 
      }


 



  back(){
    this._location.back()
  }

  updateInitInvo(){
    this.api.updateInitSalesInvo(this.payInvo).subscribe(data => {
    //console.log(data)
     this.deleteSalesitemListInit4update()
      }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري' , 'danger').then(()=>{
        this.loadingController.dismiss()
      })
     })
  }


    deleteSalesitemListInit4update(){  
      this.api.deleteSalesitemListInit(this.payInvo.pay_ref).subscribe(data => {
      //console.log(data)
      if (data['message'] != 'Post Not Deleted') { 
         
      }else{
       this.presentToast('لم يتم حذف البيانات , خطا في الإتصال حاول مرة اخري' , 'danger').then(()=>{
        this.loadingController.dismiss()
      })
      } 
    },(err) => {
      //console.log(err);
      this.presentToast('لم يتم حذف البيانات , خطا في الإتصال حاول مرة اخري' , 'danger').then(()=>{
        this.loadingController.dismiss()
      })
      
     }) 
    }


    preparenewaccount(){ 
      if (this.selectedAccount.sub_name.length>0 && this.selectedAccount.id == null) {
      // this.selectedAccount.sub_name = this.payInvo.sub_name
      } else {
        //console.log('slwcted from drop' ) 
          this.selectedAccount.sub_name = this.sub_nameNew
          this.payInvo.sub_name  =this.selectedAccount.sub_name
      }
        this.selectedAccount.id=null  
        this.selectedAccount.ac_id = 1 
        this.selectedAccount.sub_type="debit"
        this.selectedAccount.sub_code=null
        this.selectedAccount.sub_balance="0"
        this.selectedAccount.cat_id = 1
        this.selectedAccount.cat_name = 'العملاء'
        this.selectedAccount.store_id=this.store_info.id  
    }


  saveInvo() {
    console.log('saveInvo')
    this.api.saveSalesInvo(this.payInvo).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
      this.payInvo.pay_id = data['message']
      this.saveitemList()
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }




async saveitemList(){  
  this.api.saveSalesitemList(this.itemList).subscribe(data=>{ 
    //console.log(data) 
    //  this.recalSubBalance()
      
    //console.log(this.selectedAccount.currentCustumerStatus) 
    this.printArr = []
    this.printArr.push({
      'payInvo': this.payInvo,
      'itemList':this.itemList,
      'selectedAccount' : this.selectedAccount,
      'sub_nameNew' : this.sub_nameNew ,
      "user_name" : this.user_info.full_name ,
      "sub_balanse": this.selectedAccount.sub_balance,
      "balanceStatus":this.selectedAccount.currentCustumerStatus,
      "company": this.company ,
      "qrcodedata":this.qrcodedata,
      qrCodeDataUrl :""
    }) 

    //console.log('printinggg',this.printArr)
    this.sales = this.sales.filter(item => item.payInvo.pay_ref != this.payInvo.pay_ref);
    //console.log(' case ffff ' ,this.sales)
 
  let arr:Array<any> = []
  arr.push({
    "payInvo": this.payInvo,
    "itemList": this.itemList 
  })
    

      // this.storage.set('sales', this.sales).then((response) => {
      // //console.log('sales', response) 
      // })

      
   
    // //console.log(this.printArr)
    // if(this.initialInvoices.length > 0){ 
    //   this.initialInvoices = this.initialInvoices.filter(x=>x['payInvo'].pay_ref != this.payInvo.pay_ref) 
    //   this.storage.set('initialInvoices', this.initialInvoices).then((response) => {
    //     //console.log(this.initialInvoices , 'initialInvoices')
    //   });
    // }
    this.presentAlertConfirm()
    this.presentToast('تم الحفظ بنجاح', 'success')
    this.prepareInvo()
     
   // this.performSync()    
  }, (err) => {
    //console.log(err);
    this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري' , 'danger')
  }, () => {
    this.loadingController.dismiss()
  }
  )      
}

generateRandom2(role):any{
  let da = new Date 
  //console.log(da)
  let randomsNumber = da.getMonth().toString() + da.getDay().toString() + da.getHours().toString()+ da.getMinutes().toString()+da.getSeconds().toString()+da.getMilliseconds().toString() + role
  return this.store_info.store_ref + randomsNumber 
}

deleteInitInvo(){
}

prepareQrcode(){
console.log('prepareQrcode')
  const isoDate = formatDate(this.payInvo.pay_date, 'yyyy-MM-dd', 'en-US');

// Convert time to ISO format 
const isoTime = this.payInvo.pay_time  + 'Z';
// Concatenate date and time
const isoDateTime = isoDate + 'T' + isoTime;
console.log(isoDateTime); // 2022-02-10T10:30:00Z
 
const companyNameHex = this.stringToHex(this.company.engName);
const companyNameTag = "01"  
let companyNameLengthHex = this.toHex(this.company.engName.length);
if (companyNameLengthHex.length == 1) { 
  companyNameLengthHex = "0" + companyNameLengthHex; 
}
const companyInitial = companyNameTag + companyNameLengthHex + companyNameHex
console.log("company" ,companyNameHex ,companyNameLengthHex , companyInitial)
console.log('hex',this.toHex(this.company.engName.length))

const companyVatHex =  this.stringToHex(this.company.vatNo.toString());
const companyVatTag = "02"
let companyVatLengthHex = this.toHex((this.company.vatNo.toString().length));
if (companyVatLengthHex.length == 1) {
  companyVatLengthHex = "0" + companyVatLengthHex; 
}
const companyVatIntial = companyVatTag + companyVatLengthHex + companyVatHex
console.log("companyVat" ,companyVatHex ,companyVatLengthHex , companyVatIntial)

const dateTimeHex = this.stringToHex(isoDateTime.toString()); 
const dateTimeTag = "03"
let dateTimeLengthHex = this.toHex((isoDateTime.toString().length));
if (dateTimeLengthHex.length == 1) {
  dateTimeLengthHex = "0" + dateTimeLengthHex; 
}
const dateTimeInitial = dateTimeTag + dateTimeLengthHex + dateTimeHex
console.log("dateTime" ,dateTimeHex ,dateTimeLengthHex , dateTimeInitial)

const totalHex = this.stringToHex((+this.taxAll).toString());
const totalTag = "04"
let totalLengthHex = this.toHex(((+this.taxAll).toString().length));
if (totalLengthHex.length == 1) {
  totalLengthHex = "0" + totalLengthHex; 
}
const totalIntial = totalTag + totalLengthHex + totalHex
console.log("total" ,totalHex ,totalLengthHex , totalIntial)
console.log('tot',(this.taxAll.toFixed(2)).toString())

console.log('totax',(this.payInvo.taxTot))
const taxHex = this.stringToHex((this.payInvo.taxTot).toString());
const taxTag = "05"
let taxLengthHex = this.toHex(((this.payInvo.taxTot).toString().length));
if (taxLengthHex.length == 1) {
  taxLengthHex = "0" + taxLengthHex; 
}
const  taxInitial = taxTag + taxLengthHex + taxHex
console.log("tax" ,taxHex ,taxLengthHex , taxInitial )
console.log('tottax',this.payInvo.taxTot )

// // QR code data 
// const qrData = {
//   companyName: 'My Company',
//   vatNo: '987654321',
//   dateTime: '2022-02-10T10:30:00Z',
//   total: 99.99 
// };

// Convert object to JSON string
// const qrJson = JSON.stringify(qrData);

// Encode JSON to Base64
const qrBase64 = btoa(companyInitial+companyVatIntial+dateTimeInitial+totalIntial+taxInitial);
this.qrcodedata = qrBase64
this.printArr[0].qrcodedata = this.qrcodedata
console.log(this.qrcodedata); 
}

stringToHex(str) {
  let hex = ''; 
  for(let i = 0; i < str.length; i++) {
    hex += this.toHex(str.charCodeAt(i)); 
  } 
  return hex;
}

toHex(num) {
  return  num.toString(16).toUpperCase();
}

prepareQrcode2(){
  console.log('prepareQrcode')
    const isoDate = formatDate(this.payInvo.pay_date, 'yyyy-MM-dd', 'en-US');
  
  // Convert time to ISO format 
  const isoTime = this.payInvo.pay_time  + 'Z';
  // Concatenate date and time
  const isoDateTime = isoDate + 'T' + isoTime;
  console.log(isoDateTime); // 2022-02-10T10:30:00Z
   
  
  const encoder = new TextEncoder();
  encoder.encode();
  console.log(encoder.encode())

  const companyNameTag = "01"  
  let companyNameLengthHex = this.toHexTagAndLenght((this.company.engName.length));
  if (companyNameLengthHex.length == 1) { 
    companyNameLengthHex = "0" + companyNameLengthHex; 
  }
  //convert to ascii 
    
  const companyInitial = this.stringToHexAscii(companyNameTag )+ this.stringToHexAscii(companyNameLengthHex) +  this.company.engName
  console.log("companylengthhex : " + companyNameLengthHex  ,"companylengthhexAscii : " + this.stringToHexAscii(companyNameLengthHex) ,'tagAscii : '+ this.stringToHexAscii(companyNameTag ))
  
  
  
  const companyVatTag = "02"
  let companyVatLengthHex = this.toHexTagAndLenght(this.company.vatNo.length);
  if (companyVatLengthHex.length == 1) {
    companyVatLengthHex = "0" + companyVatLengthHex; 
  }
  const companyVatIntial = this.stringToHexAscii(companyVatTag) + this.stringToHexAscii(companyVatLengthHex) + this.company.vatNo.toString()
  console.log("Vatlengthhex : " + companyVatLengthHex  ,"companyVatlengthhexAscii : " + this.stringToHexAscii(companyVatLengthHex) ,'tagAscii : '+ this.stringToHexAscii(companyVatTag ))
  
 
  
  
  const dateTimeTag = "03"
  let dateTimeLengthHex = this.toHexTagAndLenght(isoDateTime.length);
  if (dateTimeLengthHex.length == 1) {
    dateTimeLengthHex = "0" + dateTimeLengthHex; 
  }
  const dateTimeInitial = this.stringToHexAscii(dateTimeTag) + this.stringToHexAscii(dateTimeLengthHex) + isoDateTime.toString()
  console.log("datelengthhex : " + dateTimeLengthHex  ,"datelengthhexAscii : " + this.stringToHexAscii(dateTimeLengthHex) , 'tagAscii : '+ this.stringToHexAscii(dateTimeTag))
 
  
   
  const totalTag = "04"
  console.log('taxAll',typeof(this.taxAll), this.taxAll)

  let totalLengthHex = this.toHexTagAndLenght(((this.taxAll).length));
  if (totalLengthHex.length == 1) {
    totalLengthHex = "0" + totalLengthHex; 
  }
  const totalIntial = this.stringToHexAscii(totalTag) + this.stringToHexAscii(totalLengthHex) + this.taxAll.toString()
  console.log("totalengthhex : " + totalLengthHex  ,"totAlengthhexAscii : " + this.stringToHexAscii(totalLengthHex) ,'tagAscii : '+ this.stringToHexAscii(totalTag))
 
  
  console.log('totax',typeof(this.payInvo.taxTot) , this.payInvo.taxTot)
   
  const taxTag = "05"
  let taxLengthHex = this.toHexTagAndLenght(((this.payInvo.taxTot.toString()).length));
  if (taxLengthHex.length == 1) {
    taxLengthHex = "0" + taxLengthHex; 
  }
  const  taxInitial = this.stringToHexAscii(taxTag) + this.stringToHexAscii(taxLengthHex) + this.payInvo.taxTot.toString()
  console.log("taxlengthhex : " + taxLengthHex  ,"TAXlengthhexAscii : " + this.stringToHexAscii(taxLengthHex) ,'tagAscii : '+ this.stringToHexAscii(taxTag))
  
  console.log(companyInitial+companyVatIntial+dateTimeInitial+totalIntial+taxInitial)
  
  // const encoder = new TextEncoder();
  // encoder.encode();
  // console.log(encoder.encode())

  // // QR code data 
  // const qrData = {
  //   companyName: 'My Company',
  //   vatNo: '987654321',
  //   dateTime: '2022-02-10T10:30:00Z',
  //   total: 99.99 
  // };
  
  // Convert object to JSON string
  // const qrJson = JSON.stringify(qrData);
  
  // Encode JSON to Base64
  const qrBase64 = btoa(companyInitial+companyVatIntial+dateTimeInitial+totalIntial+taxInitial);
  this.qrcodedata = qrBase64
  this.printArr[0].qrcodedata = this.qrcodedata
  console.log(this.qrcodedata);
  
}


 stringToHexAscii(hexString) {
  let str = '';
    for (let i = 0; i < hexString.length; i += 2) {
        str += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
    }
    return str;
}

toHexTagAndLenght (num)  {
  return  num.toString(16).toUpperCase();
}


async presentModal(printArr , page) { 
 //this.recalSubBalance()
  //this.prepareQrcode()
  const modal = await this.modalController.create({
    component: PrintModalPage ,
    componentProps: {
      "printArr": this.printArr,
      "page": page
    }
  });
  
  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      //console.log(dataReturned )
      this.prepareInvo()
    }
  });
  return await modal.present(); 
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