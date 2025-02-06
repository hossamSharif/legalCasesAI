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
export class PortalserviceService {
  //api = 'http://localhost/adalaapi/myapi/api/'
  api :any =  'https://hossam.gvstech.net/adalaapi/myapi/api/'
 
 
   constructor(public http: HttpClient ) {
   
    }

    login(user){ 
      //console.log(user)
      let params = new HttpParams() 
      params= params.append('email' , user.email )
      params= params.append('password' , user.password)  
      return this.http.get(this.api+'sub_users/login.php',{params: params})
    } 

    getUsersBySubiscriberId(id ){
      //console.log(user)
      let params = new HttpParams()
      params= params.append('subiscriber_id' , id ) 
      return this.http.get(this.api+'sub_users/getUsersBySubiscriberId.php',{params: params})
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
     return this.http.post(this.api+'sub_users/update.php', 
       user
       )
     } 
     
    updatePass(user){ 
       console.log(user)
      return this.http.post(this.api+'sub_users/updatePass.php', 
        user
        )
      } 

      saveUser(user){
        return this.http.post(this.api+'sub_users/create.php', 
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


}
