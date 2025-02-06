import { Component, OnInit, ViewChild, ElementRef ,Renderer2,Input} from '@angular/core';
import { FilterPipe } from '../new-case/pipe';
import { FilterPipe2 } from '../new-case/pipe2';
import { FilterPipe3  } from '../new-case/pipe3';
import { Location } from '@angular/common'; 
import { ServicesService } from '../stockService/services.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastButton, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Case } from '../new-case/new-case.page';
import {  Notification } from '../new-notifications/new-notifications.page';
import { LanguageService } from '../services/language.service';
var ls = window.localStorage;

@Component({
  selector: 'app-edit-notifications',
  templateUrl: './edit-notifications.page.html',
  styleUrls: ['./edit-notifications.page.scss'],
  standalone:false,
})
export class EditNotificationsPage implements OnInit {

  @ViewChild('popInput') popInput; 
 
  @ViewChild('popoverِCustomer') popoverِCustomer;
  @ViewChild('popoverِBranch') popoverِBranch;
  @ViewChild('popoverِِCourt') popoverِِCourt;
  @ViewChild('popoverِِAgent') popoverِِAgent;
  @ViewChild('popoverِِِِCost') popoverِِِِCost;
  @ViewChild('popoverِِِِInvoice') popoverِِِِInvoice;
  @ViewChild('popoverِِِِServClass') popoverِِِِServClass;

   isOpenCustType = false ;
   showCustType = false
   usersArr :Array<any> =[]
   locale : string = 'ar-SA';
   selectedCustTye : {id:any ,name:any};

   isOpenServ = false ;
   showServ = false 
   servArr :Array<any> =[]
   selectedServ : {id:any ,name:any};


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
  
 
  category =  'task'
 
  segVal = 'basics'
  
 
  showNotif = false
  showCase = false
 

  selectedUser : {id:any ,full_name:any};
  
  
  


  //
  selectedLawyersTeamArr :Array<any> =[]

  @ViewChild('popoverNotif') popoverNotif;
  selectedType : {id:any ,name:any };
  caseTypeArr :Array<any> =[]
  isOpenNotif = false ;
  caseTypeArrNagz :Array<any> =[]
  
  @ViewChild('popoverCase') popoverCase;
  selectedCaseStatus : {id:any ,name:any };
  isOpenCase = false ;
  caseStatusArr :Array<any> =[]

  @ViewChild('popover') popover;
  isOpen = false; 
  //new session 
   newTask :Notification = {
    id: 0,
    user_id: 0,
    notification_type: "",
    notification_message: "", 
    is_read: true,  
    notification_date:  new Date().toISOString().split('T')[0],
    section_parameter: "", 
    section_name :"" ,
    title:""
  }

  ionicForm: UntypedFormGroup;
  isSubmitted = false;
  constructor(private languageService: LanguageService ,private route: ActivatedRoute ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService ) {
    
    this.ionicForm = this.formBuilder.group({
    title: ['' , Validators.required], 
    }) 

    this.getAppInfo()
    this.route.queryParams.subscribe(params => {
      if (params  && params.notification ) { 
        this.newTask = JSON.parse(params.notification) 
        this.selectedType.name = this.newTask['notification_type']  
        this.usersArr = this.newTask['team'] 
      }
    });

  }

  ngOnInit() {
    
  }

 

  close(){
    this._location.back();
  }


  prepareTeam(){
    this.route.queryParams.subscribe(params => {
      if (params && params.notification) {
        let cs = JSON.parse(params.notification)
        if (cs['team'].length > 0) {
          console.log('for' , cs['team'])
         //set userArr checked true if in team arr of new case 
          for (let index = 0; index < cs['team'].length; index++) {
            const element = cs['team'][index];
            console.log('id' , element)
               for (let i = 0; i < this.usersArr.length; i++) {
                const element2 = this.usersArr[i];
                if (element2.id == element.id) {
                  element2.checked = true
                  this.selectedLawyersTeamArr.push({
                    user_id:element2.id ,
                    notification_id :this.newTask.id ,
                    full_name : element2.full_name 
                  })
                 } 
               } 
          }
          console.log('selectedLawyersTeamArr',  this.selectedLawyersTeamArr , this.usersArr) 
        } 
      }
    }) 
  }


  getLawyers(){ 
    this.api.getTopUsers().subscribe(data =>{
      console.log(data)
      let res = data
      this.usersArr = res['data']  
      this.prepareTeam() 
    }, (err) => {} ,
    ()=>{ 
  }
  )  
}
  saveBasics() {
    // let d: Date = this.payInvo.pay_date
    // this.payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.newTask) 
      this.saveInvo() 
    }
  }

  saveInvo() {
    console.log('saveInvo')
    this.api.updateNotif(this.newTask).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Updated') { 
      this.newTask.id = data['message']
      this.deleteTaskLawers() 
      }else{
      this.presentToast('1لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('2لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }
 


  deleteTaskLawers() {
    console.log('deleteCaseLawers')
    this.api.deletenotificationLawers(this.newTask.id).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Deleted') {
      if (this.selectedLawyersTeamArr.length > 0) {
        this.selectedLawyersTeamArr.forEach(element => {
          element.task_id = this.newTask.id
         });
         this.saveTaskLawers()
       }else{
        this.presentToast('تم حفظ البيانات بنجاح', 'success')
       } 
      }else{
      this.presentToast('3لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('4لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }


  saveTaskLawers() {
    console.log('saveInvo') 
    this.api.saveNotificationLawyer(this.selectedLawyersTeamArr).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
      this.newTask['team'] = this.selectedLawyersTeamArr
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

    selectFromPop(item){
      //console.log(item)
      this.selectedUser = {
        id:item.id,
        full_name:item.full_name
      }
      //this.newTask.lawyer_id = item.id   
        this.didDissmis()   
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
     setTimeout(() => {
    
     }, 2000);
   }


  prepareCace(){  
    this.caseTypeArr.push(
      {id:1,name:"رسالة نصية"},
      {id:2,name:"بريد"},
      {id:3,name:"رسالة + بريد"}
    ) 


    this.caseStatusArr .push(
      {id:1,name:"قيد الانتظار"},
      {id:2,name:"قيد التنفيذ"},
      {id:3,name:"مكتملة"}
    )  
    // this.selectedLawyersTeamArr = []   
    this.selectedType = {id:"",name:""}
    this.selectedCaseStatus = {id:"",name:""}
    this.selectedUser = {id:0 , full_name :""}
    this.ionicForm.reset() 
    this.isSubmitted = false  
  }

    get errorControl() {
      return this.ionicForm.controls;
    }

    validate(){ 
      this.isSubmitted = true; 
      console.log('validate' , this.isSubmitted , this.newTask.notification_message)
      if (this.newTask.notification_message == "") { 
        return false
      } else if(this.newTask.notification_type == ""){
        return false
      }else if(this.usersArr.length == 0 ){
        return false
      } else {
        return true
      }  
    }



      didDissmisCustType(){
        this.isOpenCustType = false
        //console.log('dismissOver') 
      }

      presentPopoverCustType(e?: Event) {
        console.log('preent me', e)
          this.showCustType = false
          this.popoverNotif.event = e;
          this.isOpenCustType = true;  
        }

      checkedTeam(event, item ,i ) {
        console.log(event, item ,i )
        let flt = this.selectedLawyersTeamArr.filter(x=>x.user_id == item.id)
        console.log(flt)
        if(event.target.checked == true ){
          this.usersArr[i].checked = true
          if(flt.length == 0){
          this.selectedLawyersTeamArr.push({
            user_id:item.id ,
            task_id :this.newTask.id ,
            full_name : this.usersArr[i].full_name 
          })
          }
        }else{
          this.usersArr[i].checked = false
          this.selectedLawyersTeamArr.splice(this.selectedLawyersTeamArr.indexOf(item),1)
        } 
        console.log(this.selectedLawyersTeamArr)
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
      //  this.getTopCustomers()
        this.getLawyers() 
      }

   
    //   getTopCustomers(){ 
    //     this.api.getTopCustomers().subscribe(data =>{
    //       console.log(data)
    //       let res = data
    //       this.costumerArr = res['data']   
    //     }, (err) => {} ,
    //     ()=>{ 
    //   }
    //   )  
    //  }


   

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
       this.newTask.notification_type = item.name
        //console.log( this.selectedItem); 
         this.didDissmisNotif()
        //perform calculate here so moataz can get the qty
      }

      selectFromPopCase(item){
        console.log(item)
        this.newTask.notification_type = item.name
        this.selectedCaseStatus = {
          id:item.id,
          name:item.name
        } 
        //console.log( this.selectedItem); 
          this.didDissmisCase()
        //perform calculate here so moataz can get the qty
        }

        

         
 
}

