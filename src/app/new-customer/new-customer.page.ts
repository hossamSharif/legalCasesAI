import { Component, OnInit ,ViewChild ,ElementRef ,Renderer2,Input} from '@angular/core';

import { ServicesService } from "../stockService/services.service";
import { Observable, Subscription } from 'rxjs';
import { AlertController, Platform , LoadingController, ModalController, ToastController, MenuController } from '@ionic/angular';
import { DatePipe ,Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { StockServiceService } from '../syncService/stock-service.service';
import { CitiesArray } from '../cities/citiesArray';
  
  
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
  standalone: false,
})
export class NewCustomerPage implements OnInit {
  cities: CitiesArray = new CitiesArray();  
  phoneKeysArr:Array<any>=[]  ; 
  citiesArr: Array<any>=[] ; 
  @ViewChild('popoverNotif') popoverNotif;
  @ViewChild('popover') popover;
  @ViewChild('popoverKey') popoverKey;
  searchTerm : any = ""
  searchTermKey : any = ""
  aliasTerm :any =""
  aliasTermKey :any =""
   isOpenCustType = false ;
   isOpen = false ;
   isOpenKey = false ;
   showCustType = false
   idType :any = "1"
   custTypeArr :Array<any> =[]
   selectedCustTye : {id:any ,name:any};
   spinner:boolean = false 
   seledctedCustomer :{id:any ,cust_ref :any ,cust_type:any,cust_name:any,cust_ident:any,phone:any,email:any,company_name:any,company_ident:any ,company_regno:any,company_phone:any,company_represent:any,company_email:any, status:any  , city:any , region :any,passport : any , company_represent_desc:any,full_address:any , phone_key:any};
   searchResult :Array<any> =[]
   searchResultKey :Array<any> =[]
   selectedCity :{id:any ,city:any ,region:any};
   selectedPhoneKey :{id:any ,key:any ,country:any};
   ionicForm: UntypedFormGroup;
   ionicForm2: UntypedFormGroup;
   ionicForm3: UntypedFormGroup;
   isSubmitted = false;
   isSubmitted2 = false;
    
  constructor( private formBuilder: UntypedFormBuilder,private _location : Location ,private menuCtrl :MenuController,  private rout : Router ,private platform:Platform,private behavApi:StockServiceService, private route: ActivatedRoute,private modalController: ModalController,private storage: Storage,private loadingController:LoadingController,private api:ServicesService,private toast :ToastController) { 
   
    
   this.citiesArr = this.cities.cities;
   this.phoneKeysArr = this.cities.keys;
   this.selectedPhoneKey = this.phoneKeysArr[0]
    // this.seledctedCustomer.phone_key = this.phoneKeysArr[0]['key']
    console.log(this.cities , this.phoneKeysArr)
    this.custTypeArr.push(
      {id:0,name:"فرد"},
      {id:1,name:"شركة"},
      {id:2,name:"جهة حكومية"},
      {id:3,name:"سفارة/قنصلية"},
      {id:4,name:"جمعية"},
      {id:5,name:"هيئة دولية"}
    )
    this.selectedCustTye = {id:0,name:"فرد"}
   

    

    this.ionicForm = this.formBuilder.group({
      cust_ident: ['' , Validators.required], 
      passport: [''], 
      cust_name: ['', [Validators.required, Validators.minLength(4),Validators.pattern('[a-zA-Z\u0600-\u06FF ]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]], 
      phone:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^[0-9]+$')]],
      full_address : [''],
      idType : [''],
      searchTerm : [''],
      searchTermKey : ['']
    })

    this.ionicForm2 = this.formBuilder.group({
      phone:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^[0-9]+$')]],
      cust_name: ['', [Validators.required, Validators.minLength(4),  Validators.pattern('[a-zA-Z\u0600-\u06FF ]+')]],
      email: ['', [ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cust_ident: [''],
      company_regno: [''] ,
      company_represent : ['' , Validators.required] , 
      company_represent_desc : ['' , Validators.required]  ,
      full_address : [''],
      searchTerm : [''],
      searchTermKey : ['']
    })


  }

  ngOnInit() {
   this.prepareInvo()
  }


  generateRandom():any{
    let da = new Date 
    //console.log(da)
    let randomsNumber = da.getMonth().toString() + da.getDay().toString() + da.getHours().toString()+ da.getMinutes().toString()+da.getSeconds().toString()+da.getMilliseconds().toString()
    this.seledctedCustomer.cust_ref = 'cust'+ randomsNumber
     console.log(randomsNumber)  
  }

  
  prepareInvo(){  
    this.seledctedCustomer = {id:"" ,cust_ref : "" , cust_type:0,cust_name:"",cust_ident:"",phone:"",email:"",company_name:"",company_ident:"" ,company_regno:"",company_phone:"",company_represent:"",company_email:"", status:"" , city:"" , region :"" ,passport : "",company_represent_desc:"", full_address:"" , phone_key:this.selectedPhoneKey.key};
    this.selectedCity = {id:"" ,city:"" ,region:""};
   // this.selectedPhoneKey = {id:"" ,key:"" ,country:""};
    this.ionicForm.reset()
    this.ionicForm2.reset()
    this.isSubmitted = false
    this.isSubmitted2 = false
    this.generateRandom()  
  }

  presentPopover(e?: Event) {
    //console.log('preent me', e)
     this.popover.event = e;
     this.isOpen = true;
     this.clear()
     this.searchResult = this.cities.cities
     setTimeout(() => {
    //  this.setFocusOnInput('popInput')
     }, 2000);
   }

  selectFromPop(item){
    //console.log(item)
    this.selectedCity = {
      id:item.id,
      city:item.city ,
      region:item.region
    }
    this.seledctedCustomer.city = item.city
    this.seledctedCustomer.region = item.region
     //this.searchTerm = item.city
      this.didDissmis() 
  }

  selectFromPopKey(item){
  console.log('item',item)
    this.selectedPhoneKey = {
      id:item.id,
      key:item.key ,
      country:item.country
    }
    this.seledctedCustomer.phone_key = item.key  
      this.didDissmisKey() 
  }


  didDissmis(){
    this.isOpen = false
  }

  didDissmisKey(){
    this.isOpenKey = false
  }

  clear(item_name?){
    if(item_name){ 
    }else{
     this.searchTerm = "" 
    }
   }

   clearKey(item_name?){
    if(item_name){ 
    }else{
     this.searchTermKey = "" 
    }
   }

   presentPopoverKey(e?: Event) { 
     this.popoverKey.event = e;
     this.isOpenKey = true;
     this.clearKey() 
   }

   idTypeChange(event){
    console.log(event.detail.value)
    if(event.detail.value == 1){
      this.seledctedCustomer.cust_ident = ""
    }else{
      this.seledctedCustomer.passport = ""
    } 
   }

  

 

  save() {
      if (this.validate() == true) {
        this.presentLoadingWithOptions('جاري حفظ البيانات ...')
        console.log(this.seledctedCustomer) 
        this.saveInvo() 
      } 
  }

  save2() {
    console.log(this.seledctedCustomer)
      if (this.validate2() == true) {
        this.presentLoadingWithOptions('جاري حفظ البيانات ...')
        this.saveInvo()
      }
  }

  

  saveInvo() {
    console.log('saveInvo')
    this.api.saveCostumer(this.seledctedCustomer).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
     // this.selectedِCustmer.id = data['message']
     this.presentToast('تم حفظ البيانات بنجاح', 'success')
     this.prepareInvo()
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

 

  get errorControl() {
    return this.ionicForm.controls;
  }
  get errorControl2() {
    return this.ionicForm2.controls;
  }
   


 validate(){
    this.isSubmitted = true;
    if (this.ionicForm.valid == false) {
      console.log('Please provide all the required values! 1') 
      return false
    }  else {
       return true
    }  
  }

  validate2(){
    this.isSubmitted2 = true;
    if (this.ionicForm2.valid == false) {
      console.log('Please provide all the required values! 1')
      return false
    }  else {
       return true
    }
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
  
  close(){
    this._location.back();
  }

  presentPopoverCustType(e?: Event) {
    console.log('preent me', e)
       this.showCustType = false
      this.popoverNotif.event = e;
       this.isOpenCustType = true;  
     }

    didDissmisCustType(){
      this.isOpenCustType = false
      //console.log('dismissOver') 
    }

    selectFromPopTypes(item){
      console.log(item)
      this.selectedCustTye = {
        id:item.id,
        name:item.name
      } 

      this.seledctedCustomer.cust_type = this.selectedCustTye.id
       
        //console.log( this.selectedItem); 
        this.didDissmisCustType()
        //perform calculate here so moataz can get the qty
      }







}
