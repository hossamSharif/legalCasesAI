import { Component, ViewChild } from '@angular/core';
import { AuthServiceService } from "../app/auth/auth-service.service";
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { LanguageService } from './services/language.service';
import { ServicesService } from './stockService/services.service';

interface Notification {
  id: number;
    user_id: number;
    notification_type: string;
    notification_message: string; 
    is_read: String;  
    notification_date: String;
    section_parameter: String; 
    section_name :string ;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent {
  @ViewChild('popoverProfile') popoverProfile;
  @ViewChild('popoverNotif') popoverNotif;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/sales', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  notifications: Notification[] = [
    
  ];
  notificationsarr : Array<any> = []
  selectedYear : any = null 
  selectedProj :  {projId:any ,projType:any}

  year : {id:any ,yearDesc:any ,yearStart :any,yearEnd:any}
   store_info : {id:any ,store_ref:any , store_name:any , location :any } 
   USER_INFO :  {
    id: number;
    user_name: string;
    store_id: number;
    full_name: string;
    password: string;
    job_title: string;
    email: string;
    phone: string;
    level: number;
    subiscriber_id: number;
    company_email2: string;
    company_email: string;
    company_phone1: string;
    company_phone2: string;
    region: string;
    city: string;
    country: string;
    full_address: string;
    company_name: string;
    short_desc: string;
    full_desc: string;
    logo_url: string;
    subscriptions: Array<{
      package_id: number;
      status: string;
      start_date: string;
      end_date: string;
    }>;
  }
   isAuth :   boolean ;
   locale : string 
   selectedIdx : any;
   
   isOpenProfile = false;
   isOpenNotif = false;

   unreadCount = 0;

   showEmpty = false
  userActions = [
    { id: 1, title: 'الملف الشخصي', icon: 'person-circle', action: 'profile', checked: false },
    { id: 2, title: 'تغيير كلمة المرور', icon: 'key', action: 'password', checked: false },
    { id: 3, title: 'خروج', icon: 'log-out', action: 'logout', checked: false }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private api:ServicesService ,private languageService: LanguageService ,private alertController :AlertController ,private storage: Storage,private authenticationService: AuthServiceService,private router: Router) {
   
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); 
    this.toggleDarkTheme(prefersDark.matches); 
    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
    this.selectedIdx = 'light';
     
    this.USER_INFO = {
      id: null,
      user_name: "",
      store_id: 0,
      full_name: "",
      password: "",
      job_title: "",
      email: "",
      phone: "",
      level: 0,
      subiscriber_id: 0,
      company_email2: "",
      company_email: "",
      company_phone1: "",
      company_phone2: "",
      region: "",
      city: "",
      country: "",
      full_address: "",
      company_name: "",
      short_desc: "",
      full_desc: "",
      logo_url: "",
      subscriptions: [],
    }; 

   
    
  }

  getTopTasks(){
    
    this.api.getTopNtification().subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No cases Found'){
        this.notificationsarr = res['data']
      }else{
        this.showEmpty = true
      } 
    }, (err) => {
     
    } ,
    ()=>{ 
      
  }
  )  
  }
 ngOnInit(){
  this.initializeApp();
  this.getTopTasks()
 }

  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => n.is_read == 'true').length;
  }

  markAsRead(notification: Notification) {
    notification.is_read = 'true';
    this.updateUnreadCount();
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.is_read = 'true');
    this.updateUnreadCount();
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.updateUnreadCount();
  }

 
  getIconByType(type: string) {
    switch(type) {
      case 'info': return 'information-circle';
      case 'warning': return 'warning';
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      default: return 'notifications';
    }
  }
 


  presentPopoverNotif(e?: Event) {   
      this.popoverNotif.event = e;
      this.isOpenNotif = true;  
    }

    didDissmisNotif(){
      this.isOpenNotif= false 
    }

    presentPopoverProfile(e?: Event) { 
        this.popoverProfile.event = e;
        this.isOpenProfile = true;  
      }
  
      didDissmisProfile(){
        this.isOpenProfile = false
        
      }


  handleAction(event: any, item: any) {
    switch (item.action) {
      case 'profile':
        this.navigateToProfile();
        break;
      case 'password':
        this.changePassword();
        break;
      case 'logout':
        this.logout();
        break;
    }
  }

  private navigateToProfile() {
    this.didDissmisProfile()
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.USER_INFO)
      }
    };
    if (this.USER_INFO.level == 2) {
      this.router.navigate(['edit-profile'], navigationExtras);
    } else {
      this.router.navigate(['edit-user'], navigationExtras);
    }
  }

  private changePassword() {
    this.didDissmisProfile()
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user_info: JSON.stringify(this.USER_INFO)
      }
    };
    this.router.navigate(['new-password'], navigationExtras);
    
  }

  private logout() {
   this.authenticationService.logout();
  }

  switchLanguage(locale: string) {
    this.languageService.setLocale(locale);
    this.locale = locale;
  }

  getCurrentLanguage() {  
    return this.languageService.getCurrentLocale().subscribe(locale => {
      this.locale = locale;
    });
  }

  initializeApp() {  
   this.auth();  
  }

//theming 

filter(indx){
  console.log(indx) 
  this.selectedIdx = indx 
  if (indx == 'black') { 
    document.body.setAttribute('data-theme', 'dark');
  } else if (indx == 'light') { 
    document.body.setAttribute('data-theme', 'light');
  } else if (indx == 'gray') { 
    document.body.setAttribute('data-theme', 'gray');
  }else if (indx == 'yallow') { 
    document.body.setAttribute('data-theme', 'yallow');
  }
}
 
   toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }

  
  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

  checkhange(ev){
    console.log(ev)
    console.log(ev.target.value)
    document.body.setAttribute('data-theme', 'gray');
  }
  
   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
 
  async  getAppInfo(){
      await this.storage.create(); 
      this.storage.get('USER_INFO').then((response) => {
        if (response) {
          this.USER_INFO = response
          console.log(response) 
        }
      });

      this.getCurrentLanguage()
      
 
     
    }

  
      async auth (){ 
        this.storage.create().then(() => {
          this.authenticationService.authState.subscribe(state => {
          this.isAuth = this.authenticationService.isAuthenticated()
          console.log(state)
          if (state === true) { 
            this.getAppInfo()  
          } else {
            this.router.navigate(['folder/login']);
          }
        });
      })
      }

async presentAlertConfirm() {
  let msg:string = 'please set the defualt project and the default finance year , we will redirect you to settings page '
   
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'تأكيد!',
    mode:'ios' ,
    message: msg,
    buttons: [
       {
        text: 'موافق',
        id: 'confirm-button',
        handler: () => {
        //  routing to setting 
        this.router.navigate(['folder/settings']);
        }
      }
    ]
  });

  await alert.present();
}



logOut(){
  this.didDissmisProfile()
  this.authenticationService.logout()
}
 

}
