import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { Platform } from '@ionic/angular';
//import { environment } from '../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
//import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})


 export class ServicesService {
    //  api = 'http://localhost/lawyerapi/myapi/api/'
  api :any =  'https://hossam.gvstech.net/lawyerapi/myapi/api/'
  year : {id:any ,yearDesc:any ,yearStart :any,yearEnd:any}
  folderNo:any=''
 // public Notifications: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  constructor(private storage: Storage,public http: HttpClient ) {
    //  this.api = 'https://erp.hosamdev.com/myapi'+ this.folderNo +'/api/'
     // this.setCurrentYear()
   }




   login(user){ 
    //console.log(user)
    let params = new HttpParams() 
    params= params.append('email' , user.email )
    params= params.append('password' , user.password)  
    return this.http.get(this.api+'users/login.php',{params: params})
  } 

  
  sendMailForgetPass(email ){ 
    //console.log(user)
    let params = new HttpParams() 
    params= params.append('emailTo' , email )   
    return this.http.get(this.api+'mailing/forgetMail.php',{params: params})
  } 

  reSendMailForgetPass(user ){ 
    //console.log(user)
    let params = new HttpParams() 
    params= params.append('emailTo' , user.email )  
  //  params=params.append('level' , 'user')
    return this.http.get(this.api+'mailing/forgetMail.php',{params: params})
  } 

  updateUser(user){ 
    console.log(user)
   return this.http.post(this.api+'users/update.php', 
     user
     )
   } 

   updateCompany(user){ 
    console.log(user)
   return this.http.post(this.api+'subiscribers/update.php', 
     user
     )
   } 
   
  updatePass(user){ 
     console.log(user)
    return this.http.post(this.api+'users/updatePass.php', 
      user
      )
    } 

    saveUser(user){
      return this.http.post(this.api+'users/create.php', 
        user
       )
    }

    getTopUsers( ){ 
      // let params = new HttpParams() 
      // params=params.append('store_id' , store_id)
      // params=params.append('yearId' , yearId)
      // ,{params: params}
      return this.http.get(this.api+'users/read.php')
    }





//laywer api 

uploadCaseFiles(file){
  //console.log(file)
  return this.http.post('https://hossam.gvstech.net/lawyerapi/myapi/api/'+'upload.php', 
   file
   )
}




saveCaseLawyer( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'caselawyers/createMulti.php',
    caseLawyer
  )
}


saveQuestions( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'questions/createMulti.php',
    caseLawyer
  )
}

saveSessionLawyer( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'sessionlawyers/createMulti.php',
    caseLawyer
  )
}



saveTaskLawyer( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'taskTeam/createMulti.php',
    caseLawyer
  )
}

saveNotificationLawyer( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'notificationTeam/createMulti.php',
    caseLawyer
  )
}

saveContractFiles( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'contractFiles/createMulti.php',
    caseLawyer
  )
}

saveContractServices( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'legalServices/createMulti.php',
    caseLawyer
  )
}

savePamentsNotification( notif){  
  notif = JSON.stringify(notif) 
  return this.http.post(this.api+'notifications/createMulti.php',
    notif
  )
}

savePaymentContrat( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'payments/createMulti.php',
    caseLawyer
  )
}

savePaymentsCases( caseLawyer){  
  caseLawyer = JSON.stringify(caseLawyer) 
  return this.http.post(this.api+'payments/createMulti.php',
    caseLawyer
  )
}

saveFinancialEntitlement( arr){  
  arr = JSON.stringify(arr) 
  return this.http.post(this.api+'FinancialEntitlement/createMulti.php',
    arr
  )
}

saveNotifications( arr){  
  arr = JSON.stringify(arr) 
  return this.http.post(this.api+'notifications/createMulti.php',
    arr
  )
}


// getTopUsers( ){ 
//   // let params = new HttpParams() 
//   // params=params.append('store_id' , store_id)
//   // params=params.append('yearId' , yearId)
//   // ,{params: params}
//   return this.http.get(this.api+'users/read.php')
// }

  getTopCustomers( ){ 
    
    return this.http.get(this.api+'customer/readByStore.php')
  }
  getCourts( ){ 
  
    return this.http.get(this.api+'courts/read.php')
  }

  getCaseStatus( ){ 
  
    return this.http.get(this.api+'case_status/read.php')
  }

  getSessionsByCaseId(case_id ){ 
    let params = new HttpParams() 
    params=params.append('case_id' , case_id)
    // params=params.append('yearId' , yearId)
    // ,{params: params}
    return this.http.get(this.api+'sessions/getSessionsByCaseId.php' ,{params: params})
  }

  getCaseFilesByCaseId(case_id , category ){ 
    let params = new HttpParams() 
    params=params.append('case_id' , case_id)
    params=params.append('category' , category)
    // params=params.append('yearId' , yearId)
    // ,{params: params}
    return this.http.get(this.api+'caseFiles/getCaseFilesByCaseId.php' ,{params: params})
  }

  getContractFilesByContractId(contract_id ){ 
    let params = new HttpParams() 
    params=params.append('contract_id' , contract_id)
    // params=params.append('yearId' , yearId)
    // ,{params: params}
    return this.http.get(this.api+'contractFiles/getContractFilesByContractId.php' ,{params: params})
  }

  

  getTopCases( ){  
    return this.http.get(this.api+'cases/read.php')
  }
  getTopDashboard( ){  
    return this.http.get(this.api+'dashboard/read.php')
  }

  getTopTasks( ){  
    return this.http.get(this.api+'tasks/read.php')
  }

  getTopExsam( ){  
    return this.http.get(this.api+'examinations/read.php')
  }

  getTopNtification( ){  
    return this.http.get(this.api+'notifications/read.php')
  }

  getTopSessions( ){  
    return this.http.get(this.api+'sessions/getTopSessions.php')
  }

  getCaseBySearchTerm(searchTerm ){
    console.log(searchTerm)
    let params = new HttpParams()
    params=params.append('searchTerm' , searchTerm)
    return this.http.get(this.api+'cases/getCaseBySearchTerm.php' ,{params: params})
  }
  

  getTopConsultation( ){  
    return this.http.get(this.api+'consultations/read.php')
  }

  saveCostumer(customer){
    return this.http.post(this.api+'customer/create.php', 
      customer
     )
  }

  
  saveSession(sesion){
    return this.http.post(this.api+'sessions/create.php', 
      sesion
     )
  }

  saveCaseFile(caseFile){
    return this.http.post(this.api+'caseFiles/create.php', 
      caseFile
     )
  }

  getUsersBySubiscriberId(id ){
    //console.log(user)
    let params = new HttpParams()
    params= params.append('subiscriber_id' , id ) 
    return this.http.get(this.api+'users/getUsersBySubiscriberId.php',{params: params})
  }

  saveContractFile(contractFile){
    return this.http.post(this.api+'ContractFiles/create.php', 
      contractFile
     )
  }

  saveConsultaion(Consultaion){
    return this.http.post(this.api+'consultations/create.php', 
      Consultaion
     )
  }

  saveCase(newCase){
    return this.http.post(this.api+'cases/create.php', 
      newCase
     )
  }
  
  saveExam(newCase){
    return this.http.post(this.api+'examinations/create.php', 
      newCase
     )
  }

  saveTask(newCase){
    return this.http.post(this.api+'tasks/create.php', 
      newCase
     )
  }

  saveNotif(newCase){
    return this.http.post(this.api+'notifications/create.php', 
      newCase
     )
  }


  saveCourt(newCase){
    return this.http.post(this.api+'courts/create.php', 
      newCase
     )
   }

   saveCaseStatus(newCaseStatus){
    return this.http.post(this.api+'case_status/create.php', 
      newCaseStatus
     )
   }

  saveContract(newCase){
    return this.http.post(this.api+'contracts/create.php', 
      newCase
     )
  }


  updateCase(newCase){
    return this.http.post(this.api+'cases/update.php', 
      newCase
     )
  }

  updateTask(newCase){
    return this.http.post(this.api+'tasks/update.php', 
      newCase
     )
  }

  updateNotif(newCase){
    return this.http.post(this.api+'notifications/update.php', 
      newCase
     )
  }

  updateConsultaion(Consultaion){
    return this.http.post(this.api+'consultations/update.php', 
      Consultaion
     )
  }

  updateCaseFile(caseFile){
    return this.http.post(this.api+'caseFiles/update.php', 
      caseFile
     )
  }

  updateSession(newCase){
    return this.http.post(this.api+'sessions/update.php', 
      newCase
     )
  }

  // saveUser(user){
  //   return this.http.post(this.api+'users/create.php', 
  //     user
  //    )
  // }

  deleteCaseLawers(case_id){
    let params = new HttpParams()
    params= params.append('case_id' , case_id )
      return this.http.delete(this.api+'caselawyers/deleteMulti.php', {params: params})
  }

  deleteSessionLawers(session_id){
    let params = new HttpParams()
    params= params.append('session_id' , session_id )
      return this.http.delete(this.api+'sessionlawyers/deleteMulti.php', {params: params})
  }

    deleteTaskLawers(task_id){
      let params = new HttpParams()
      params= params.append('task_id' , task_id )
        return this.http.delete(this.api+'taskTeam/deleteMulti.php', {params: params})
      }

      deletenotificationLawers(notification_id){
        let params = new HttpParams()
        params= params.append('notification_id' , notification_id )
          return this.http.delete(this.api+'notificationTeam/deleteMulti.php', {params: params})
        }

    updateCustomer(cust){
      return this.http.post(this.api+'customer/update.php', 
      cust
      )
    }
  
    deleteCustomer(cust_id){
      let params = new HttpParams()
      params= params.append('cust_id' , cust_id )
        return this.http.delete(this.api+'customer/delete.php', {params: params})
    }

    // updateUser(cust){
    //   return this.http.post(this.api+'users/update.php', 
    //   cust
    //   )
    // }

  // end of laywer api


  
  async setCurrentYear(){
    await this.storage.create(); 
    this.storage.get('year').then((response) => {
      if (response) {
        this.year = response 
        if(this.year.id == 1){
          this.folderNo = ''
          this.api = 'https://erp.hosamdev.com/myapi'+ this.folderNo +'/api/' 
        }else{
          this.folderNo = '23'
          this.api = 'https://erp.hosamdev.com/myapi'+ this.folderNo +'/api/'
        }
      }
    });
    }


  getPayNotif(store_id){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    return this.http.get(this.api+'pay/paynotif.php',{params: params})
  }

  getFirstQty(store_id){
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    return this.http.get(this.api+'firstq/readByStore.php',{params: params})
  }

  getItems(){
    return this.http.get(this.api+'items/read.php')
  }

  getStores(){
    return this.http.get(this.api+'store/read.php')
  }

  getCompany(){
    return this.http.get(this.api+'company/read.php')
  }


  getBrands(){
    return this.http.get(this.api+'items/readBrand.php')
  }

  getAllLogHistory(store_id , yearId ){ 
    let params = new HttpParams() 
    params=params.append('store_id' , +store_id)
    params=params.append('yearId' , +yearId) 
    return this.http.get(this.api+'logHistory/readAllByStore.php',{params: params})
  }
  
  truncateItems(){
    return this.http.get(this.api+'items/truncateItems.php')
  }

  stockItemsResturant(store_id ){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)   
    return this.http.get(this.api+'items/readStockResturant.php',{params: params})
  }

   stockItems(store_id , yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'items/itemsView.php')
  }

  getAllStockItemsWithouteCounts(store_id , yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'items/readAllStockItems.php',{params: params})
  }

  stockItems2(store_id ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    
    return this.http.get('https://erp.hosamdev.com/myapi23/api/items/readStock.php',{params: params})
  }
  
  getToptswia(store_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)

    return this.http.get(this.api+'tswia/getTopSales.php',{params: params})
  }

  getTopSales(store_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'pay/getTopSales.php',{params: params})
  }
  getTopDiscount(store_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'discount/getTopSales.php',{params: params})
  }

  getSalesById(store_id,yearId,pay_id){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId) 
    params=params.append('pay_id' , pay_id)
    return this.http.get(this.api+'pay/getSalesById.php',{params: params})
  }
  
  getTopSalesInit(store_id){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    return this.http.get(this.api+'payinit/getTopSales.php',{params: params})
  }

  getItemPaysByItemIdBydate(store_id , item_id,from,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id)
    params=params.append('from' , from)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'pay_details/readAllByItemIdDate.php',{params: params})
  }

  getItemPaysBydate(store_id ,from,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    params=params.append('from' , from)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'pay_details/readAllByDate.php',{params: params})
  }
  
  
  getItemPaysByItemId(store_id , item_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'pay_details/readAllByItemId.php',{params: params})
  }

  getItemQtyPaysByItemId(store_id , item_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'pay_details/readQtyByItemId.php',{params: params})
  }
 
  
  getItemPaysByItemIdBy2date(store_id , item_id ,from ,to,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('from' , from) 
    params=params.append('to' , to) 
    params=params.append('yearId' , yearId)

    return this.http.get(this.api+'pay_details/readAllByItemId2Date.php',{params: params})
  }

  //purch
  getItemTswiaByItemIdBy2date(store_id , item_id ,from ,to,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('from' , from) 
    params=params.append('to' , to) 
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'tswia_details/readAllByItemId2Date.php',{params: params})
  }
  //purch
  getItemPurchByItemIdBy2date(store_id , item_id ,from ,to,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('from' , from) 
    params=params.append('to' , to) 
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'perch_details/readAllByItemId2Date.php',{params: params})
  }


  getItemPurchByItemId(store_id , item_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('yearId' , yearId)

    return this.http.get(this.api+'perch_details/readAllByItemId.php',{params: params})
  }

  getQtyPurchByItemId(store_id , item_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'perch_details/readQtyByItemId.php',{params: params})
  }


  getQtyTswiaByItemId(store_id , item_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'tswia_details/readQtyByItemId.php',{params: params})
  }

  getItemTswiaByItemId(store_id , item_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id) 
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'tswia_details/readAllByItemId.php',{params: params})
  }


  getItemPurchsByItemIdBydate(store_id , item_id,from ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id)
    params=params.append('from' , from)
    params=params.append('yearId' , yearId)

    return this.http.get(this.api+'perch_details/readAllByItemIdDate.php',{params: params})
  }

  getItemPurchsBydate(store_id ,from ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    params=params.append('from' , from)
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'perch_details/readAllByDate.php',{params: params})
  }

  getItemTswiasByItemIdBydate(store_id , item_id,from ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('item_id' , item_id)
    params=params.append('from' , from)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'tswia_details/readAllByItemIdDate.php',{params: params})
  }
  getItemTswiasBydate(store_id ,  from ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    params=params.append('from' , from)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'tswia_details/readAllByDate.php',{params: params})
  }

  getTopInvoice(store_id ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'invoices/getTopSales.php',{params: params})
  }

  getInvoiceByDate(store_id,from ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'invoices/getSalesByDate.php',{params: params})
  }

  getInvoice2Date(store_id,from,to,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
    params=params.append('to' , to)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'invoices/getSales2Date.php',{params: params})
  }


  ////
  
  getTopJournale(store_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
  params=params.append('yearId' , yearId) 

    return this.http.get(this.api+'journal/getTopSales.php',{params: params})
  }

  getJournaleByDate(store_id,from,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
  params=params.append('yearId' , yearId) 

    return this.http.get(this.api+'journal/getSalesByDate.php',{params: params})
  }

  getJournale2Date(store_id,from,to,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
    params=params.append('to' , to)
  params=params.append('yearId' , yearId) 

    return this.http.get(this.api+'journal/getSales2Date.php',{params: params})
  }
///
getTopJfrom(store_id ,yearId){ 
  let params = new HttpParams() 
  params=params.append('store_id' , store_id)
  params=params.append('yearId' , yearId) 

  return this.http.get(this.api+'jdetails_from/getTopSales.php',{params: params})
}

getJFromByDate(store_id,from ,yearId){ 
  let params = new HttpParams() 
  params=params.append('store_id' , store_id)
  params=params.append('from' , from)
  params=params.append('yearId' , yearId) 

  return this.http.get(this.api+'jdetails_from/getSalesByDate.php',{params: params})
}

getJFrom2Date(store_id,from,to,yearId){ 
  let params = new HttpParams() 
  params=params.append('store_id' , store_id)
  params=params.append('from' , from)
  params=params.append('to' , to)
  params=params.append('yearId' , yearId) 

  return this.http.get(this.api+'jdetails_from/getSales2Date.php',{params: params})
}
  ///
  
getTopJTo(store_id,yearId){ 
  let params = new HttpParams() 
  params=params.append('store_id' , store_id)
  params=params.append('yearId' , yearId) 
  return this.http.get(this.api+'jdetails_to/getTopSales.php',{params: params})
}

getJToByDate(store_id,from,yearId){ 
  let params = new HttpParams() 
  params=params.append('store_id' , store_id)
  params=params.append('from' , from)
  params=params.append('yearId' , yearId) 

  return this.http.get(this.api+'jdetails_to/getSalesByDate.php',{params: params})
}

getJTo2Date(store_id,from,to ,yearId){ 
  let params = new HttpParams() 
  params=params.append('store_id' , store_id)
  params=params.append('from' , from)
  params=params.append('to' , to)
  params=params.append('yearId' , yearId) 
  return this.http.get(this.api+'jdetails_to/getSales2Date.php',{params: params})
}
///

getTswiaByDate(store_id,from ,yearId){ 
  let params = new HttpParams() 
  params=params.append('store_id' , store_id)
  params=params.append('from' , from)
  params=params.append('yearId' , yearId) 

  return this.http.get(this.api+'tswia/getSalesByDate.php',{params: params})
}
  getSalesByDate(store_id,from ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
    params=params.append('yearId' , yearId) 

    return this.http.get(this.api+'pay/getSalesByDate.php',{params: params})
  }
  
  getTswia2Date(store_id,from,to ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
    params=params.append('to' , to)
    params=params.append('yearId' , yearId)  
    return this.http.get(this.api+'tswia/getSales2Date.php',{params: params})
  }

  getSales2Date(store_id,from,to ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
    params=params.append('to' , to)
    params=params.append('yearId' , yearId) 

    return this.http.get(this.api+'pay/getSales2Date.php',{params: params})
  }

  getTopPerch(store_id ,yearId){ 
    let params = new HttpParams() 
     params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId) 

    return this.http.get(this.api+'perch/getTopSales.php',{params: params})
  }
  getTopOrderPerch(store_id){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    return this.http.get(this.api+'perchOrder/getTopSales.php',{params: params})
  }


  
  getBalanceSubAccount(store_id,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'sub_accounts/balanceSheetByStore.php',{params: params})
  }


  getPerchByDate(store_id,from ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'perch/getSalesByDate.php',{params: params})
  }


  getPerch2Date(store_id,from,to ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('from' , from)
     params=params.append('to' , to)
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'perch/getSales2Date.php',{params: params})
  }
  
  getPayInvoDetail(store_id,pay_ref,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    params=params.append('pay_ref' , pay_ref)
    return this.http.get(this.api+'pay_details/readByStoreByRef.php',{params: params})
  }

  getTswiaInvoDetail(store_id,pay_ref,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    params=params.append('pay_ref' , pay_ref)
    return this.http.get(this.api+'tswia_details/readByStoreByRef.php',{params: params})
  }

  getPayInvoDetailinit(store_id,pay_ref){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('pay_ref' , pay_ref)
    return this.http.get(this.api+'payinit_details/readByStoreByRef.php',{params: params})
  }
  
  getPerchInvoDetail(store_id,pay_ref ,yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('pay_ref' , pay_ref)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'perch_details/readByStoreByRef.php',{params: params})
  }

  getPerchOrderInvoDetail(store_id,pay_ref){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('pay_ref' , pay_ref) 
    return this.http.get(this.api+'perchOrder_details/readByStoreByRef.php',{params: params})
  }
  getAllPerchDetail(store_id , yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'perch_details/readAllByStore.php',{params: params})
  }
  getAllTswiaDetail(store_id , yearId){ 
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params=params.append('yearId' , yearId)
    return this.http.get(this.api+'tswia_details/readAllByStore.php',{params: params})
  }

  getAllSalesDetail(store_id, yearId){ 
    let params = new HttpParams() 
    params=params.append('yearId' , yearId)
    params=params.append('store_id' , store_id)
    return this.http.get(this.api+'pay_details/readAllByStore.php',{params: params})
  }
  getExpnsesAccounts(store_id , yearId){ 
    let ac_id = 3
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params= params.append('ac_id' , ac_id) 
    params= params.append('yearId' , yearId) 
    return this.http.get(this.api+'sub_accounts/readByStore.php',{params: params})
  }



  getMainAccounts( ){   
    return this.http.get(this.api+'accounts/readByStore.php' )
  }

  getAllAccounts(store_id ,yearId){  
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    params=params.append('yearId' , yearId) 
    return this.http.get(this.api+'sub_accounts/readAllStore.php',{params: params})
  }
  getAccountCategory(store_id){  
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    return this.http.get(this.api+'account_category/readByStore.php',{params: params})
  }

  getJournalType(store_id){  
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    return this.http.get(this.api+'j_type/readByStore.php',{params: params})
  }

  getJournalTypeDetails(store_id){  
    let params = new HttpParams() 
    params=params.append('store_id' , store_id) 
    return this.http.get(this.api+'j_typeDetails/readByStoreByRef.php',{params: params})
  }

  getSalesAccounts(store_id ,yearId){ 
    let ac_id = 1
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params= params.append('ac_id' , ac_id) 
    params= params.append('yearId' , yearId) 
    return this.http.get(this.api+'sub_accounts/readByStore.php',{params: params})
  }

  getPerchAccounts(store_id,yearId){ 
    let ac_id = 2
    let params = new HttpParams() 
    params=params.append('store_id' , store_id)
    params= params.append('ac_id' , ac_id) 
    params= params.append('yearId' , yearId) 
    return this.http.get(this.api+'sub_accounts/readByStore.php',{params: params})
  }

  getYear( ){  
    return this.http.get(this.api+'year/readByStoreByRef.php')
  }


  // login(user){ 
  //   //console.log(user)
  //   let params = new HttpParams() 
  //   params= params.append('user_name' , user.user_name )
  //   params= params.append('password' , user.password)
  //   params=params.append('store_id' , user.store_id)
  // //  params=params.append('level' , 'user')
  //   return this.http.get(this.api+'users/login.php',{params: params})
  // }

  // saveTswiaInvo(payInvo){
  //   return this.http.post(this.api+'tswia/create.php', 
  //    payInvo
  //    )
  // }


  saveSalesInvo(payInvo){
    return this.http.post(this.api+'pay/create.php', 
     payInvo
     )
  }

 

    saveDiscountInvo(payInvo){
    return this.http.post(this.api+'discount/create.php', 
     payInvo
     )
  }
  saveSalesInvoInit(payInvo){
    return this.http.post(this.api+'payinit/create.php', 
     payInvo
     )
  }

  uploadItems(file){
    //console.log(file)
    return this.http.post(this.api+'uploadXsl.php', 
     file
     )
  }

  uploadFq(file){
    //console.log(file)
    return this.http.post(this.api+'uploadXslFristq.php', 
     file
     )
  }

  upload2(file):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.api+'uploadXsl.php', formData)
}
uploadImg(file):Observable<any> {
  
  // Create form data
  const formData = new FormData(); 
    
  // Store form name as "file" with file data
  formData.append("file", file, file.name);
    
  // Make http post request over api
  // with formData as req
  return this.http.post(this.api+'upload.php', formData)
}


uploadFile(data){
  let uploadURL = this.api+`upload.php`;
    return this.http.post<any>(uploadURL, data);
}
  saveExpenseInvo(payInvo){
    return this.http.post(this.api+'invoices/create.php', 
     payInvo
     )
  }

  saveJournal(payInvo){
    return this.http.post(this.api+'journal/create.php', 
     payInvo
     )
  }
  updateTswiaInvo(payInvo){
    return this.http.post(this.api+'tswia/update.php', 
     payInvo
     )
  }
  updateSalesInvo(payInvo){
    return this.http.post(this.api+'pay/update.php', 
     payInvo
     )
  }

  updateInitSalesInvo(payInvo){
    return this.http.post(this.api+'payinit/update.php', 
     payInvo
     )
  }

  deleteTswiaInvo(pay_id){
    let params = new HttpParams() 
    params= params.append('pay_id' , pay_id )
      return this.http.delete(this.api+'tswia/delete.php', {params: params})
  }

  deleteSalesInvo(pay_id){
    let params = new HttpParams() 
    params= params.append('pay_id' , pay_id )
      return this.http.delete(this.api+'pay/delete.php', {params: params})
    }

    deleteSalesInvoInit(pay_id){
      let params = new HttpParams() 
      params= params.append('pay_id' , pay_id )
        return this.http.delete(this.api+'payinit/delete.php', {params: params})
      }
    deleteJournal(j_ref){
      let params = new HttpParams() 
      params= params.append('j_ref' , j_ref )
        return this.http.delete(this.api+'journal/deleteMultiServices.php', {params: params})
      }

    deleteFristq(store_id,fq_year){
      let params = new HttpParams() 
      params= params.append('store_id' , store_id )
      params= params.append('fq_year' , fq_year )
        return this.http.delete(this.api+'firstq/deleteByStore.php', {params: params})
      }

    savePerchInvo(payInvo){
      return this.http.post(this.api+'perch/create.php', 
       payInvo
       )
    }
    savePerchOrderInvo(payInvo){
      return this.http.post(this.api+'perchOrder/create.php', 
       payInvo
       )
    }
  
    updatePerchInvo(payInvo){
      return this.http.post(this.api+'perch/update.php', 
       payInvo
       )
    }
  
     deletePerchInvo(pay_id){
      let params = new HttpParams() 
      params= params.append('pay_id' , pay_id )
        return this.http.delete(this.api+'perch/delete.php', {params: params})
      }

      updatePerchOrderInvo(payInvo){
        return this.http.post(this.api+'perchOrder/update.php', 
         payInvo
         )
      }
    
       deletePerchOrderInvo(pay_id){
        let params = new HttpParams() 
        params= params.append('pay_id' , pay_id )
          return this.http.delete(this.api+'perchOrder/delete.php', {params: params})
        }
    
  

  saveSubAccount(sub_account){
    return this.http.post(this.api+'sub_accounts/create.php', 
      sub_account
     )
  }

  updateSubAccount(payInvo){
    return this.http.post(this.api+'sub_accounts/update.php', 
     payInvo
     )
  }

  deleteSubAccont(id){ 
    let params = new HttpParams() 
    params=params.append('id' , id)
    return this.http.get(this.api+'sub_accounts/delete.php',{params: params})
  }

  createMultiAccount(accountList){
    accountList= JSON.stringify(accountList) 
    return this.http.post(this.api+'sub_accounts/createMulti.php',
    accountList
    )
  }

  
  saveItem(item){
    return this.http.post(this.api+'items/create.php', 
     item
     )
  }
  
  saveitemMulti(item){
    let itemarr:any = []
    itemarr.push(item)
    itemarr = JSON.stringify(itemarr) 
    return this.http.post(this.api+'items/createMulti.php',
    itemarr
    )
  }

  saveLogHistoryMulti(item ,firstq ,role){
    let itemarr:any = []
    if(role == 'insert'){
      itemarr.push(item ,firstq)
    }else{
      itemarr.push(item) 
    } 
    
    itemarr = JSON.stringify(itemarr) 
    return this.http.post(this.api+'logHistory/createMulti.php',
    itemarr
    )
  }

  saveLogHistoryMultiSales(invo ,cust ,role){
    let itemarr:any = []
    if(role == 'new account'){
      itemarr.push(invo ,cust)
    }else{
      itemarr.push(invo) 
    }

    itemarr = JSON.stringify(itemarr) 
    return this.http.post(this.api+'logHistory/createMulti.php',
    itemarr
    )
  }

  saveFirstQty(firstq){
    return this.http.post(this.api+'firstq/createf.php', 
    firstq
     )
  }

  updatfiratqty(item){
    return this.http.post(this.api+'firstq/updateQty.php', 
     item
     )
  }

  saveItemStock(itemSstock){
    return this.http.post(this.api+'stock/create.php', 
    itemSstock
     )
  }
  

  deleteTswiaitemList(pay_ref){
    let params = new HttpParams() 
    params= params.append('pay_ref' , pay_ref )
      return this.http.delete(this.api+'tswia_details/deleteMultiServices.php', {params: params})
    }
 deleteSalesitemList(pay_ref){
  let params = new HttpParams() 
  params= params.append('pay_ref' , pay_ref )
    return this.http.delete(this.api+'pay_details/deleteMultiServices.php', {params: params})
  }

  deleteSalesitemListInit(pay_ref){
    let params = new HttpParams() 
    params= params.append('pay_ref' , pay_ref )
      return this.http.delete(this.api+'payinit_details/deleteMultiServices.php', {params: params})
  }

  deleteJFrom(j_ref){
    let params = new HttpParams() 
    params= params.append('j_ref' , j_ref )
      return this.http.delete(this.api+'jdetails_from/deleteMultiServices.php', {params: params})
    }
    deleteJto(j_ref){
      let params = new HttpParams() 
      params= params.append('j_ref' , j_ref )
        return this.http.delete(this.api+'jdetails_to/deleteMultiServices.php', {params: params})
      }

  deletePerchitemList(pay_ref){
    let params = new HttpParams() 
    params= params.append('pay_ref' , pay_ref )
      return this.http.delete(this.api+'perch_details/deleteMultiServices.php', {params: params})
    }

    deletePerchOrderitemList(pay_ref){
      let params = new HttpParams() 
      params= params.append('pay_ref' , pay_ref )
        return this.http.delete(this.api+'perchOrder_details/deleteMultiServices.php', {params: params})
      }

      saveTswiaitemList(itemList){
        itemList= JSON.stringify(itemList) 
        return this.http.post(this.api+'tswia_details/createMulti.php',
          itemList
        )
      }

  saveSalesitemList(itemList){
    itemList= JSON.stringify(itemList) 
    return this.http.post(this.api+'pay_details/createMulti.php',
      itemList
    )
  }
 saveDiscountitemList(itemList){
    itemList= JSON.stringify(itemList) 
    return this.http.post(this.api+'discount_details/createMulti.php',
      itemList
    )
  }


  saveSalesitemListInit(itemList){
    itemList= JSON.stringify(itemList) 
    return this.http.post(this.api+'payinit_details/createMulti.php',
      itemList
    )
  }

  createMultiSales(accountList){
    accountList= JSON.stringify(accountList) 
    return this.http.post(this.api+'pay/createMulti.php',
    accountList
    )
  }
  createMultiPurch(accountList){
    accountList= JSON.stringify(accountList) 
    return this.http.post(this.api+'perch/createMulti.php',
    accountList
    )
  }

  saveJournalFrom(itemList){
    itemList= JSON.stringify(itemList) 
    return this.http.post(this.api+'jdetails_from/createMulti.php',
      itemList
    )
  }
 
  saveJournalTo(itemList){
    itemList= JSON.stringify(itemList) 
    return this.http.post(this.api+'jdetails_to/createMulti.php',
      itemList
    )
  }

  savePerchitemList(itemList){
    itemList= JSON.stringify(itemList) 
    return this.http.post(this.api+'perch_details/createMulti.php',
      itemList
    )
  }
  savePerchOrderitemList(itemList){
    itemList= JSON.stringify(itemList) 
    return this.http.post(this.api+'perchOrder_details/createMulti.php',
      itemList
    )
  }


  updateItem(item){
    return this.http.post(this.api+'items/update.php', 
     item
     )
  }

  updatePrices(item){
    return this.http.post(this.api+'items/updatePrices.php', 
     item
     )
  }
  
  increasePrice(payval,perchval){
    let item ={payval:payval ,perchval:perchval}
    return this.http.post(this.api+'items/increasePrice.php', 
    item
     )
  }

  decreasePrice(payval,perchval){
    let item ={payval:payval ,perchval:perchval}
    return this.http.post(this.api+'items/decreasePrice.php', 
     item
     )
  }

  deleteItems(id){ 
    let params = new HttpParams() 
    params=params.append('id' , id)
    return this.http.get(this.api+'items/delete.php',{params: params})
  }

}
