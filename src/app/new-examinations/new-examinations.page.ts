import { Component, OnInit, ViewChild, ElementRef ,Renderer2,Input} from '@angular/core';
 
import { Location } from '@angular/common'; 
import { ServicesService } from '../stockService/services.service';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { NavigationExtras, Route, Router } from '@angular/router';
import { NewCourtPage } from '../new-court/new-court.page';
 import * as moment from 'moment'; 
var ls = window.localStorage;

import { Storage } from '@ionic/storage';
import { PortalserviceService } from '../portal/portalservice.service';
import { LanguageService } from '../services/language.service';

interface Examination {
  id: number;
  exam_name: string;
  exam_desc: string;
  exsam_intructions: string;
  exam_date: string;
  duration: number;
  full_mark: number;
  pass_mark: number;
  status: string;
}

interface Question {
  id: number;
  question_text: string;
  exam_id: number;
  question_mark: number;
  question_type: number;
}

interface Answer {
  id: number;
  question_id: number;
  answer_text: string;
  answer_order: number;
  IsCorrect: boolean;
}


@Component({
  selector: 'app-new-examinations',
  templateUrl: './new-examinations.page.html',
  styleUrls: ['./new-examinations.page.scss'],
  standalone: false,
})

export class NewExaminationsPage implements OnInit {
  isSubmitted :boolean = false
  locale : string = 'en-US';
  ionicForm: FormGroup;
  exam: any = {
    id: null,
   exam_name: '',
   exam_date: '',
   duration :0 ,
   full_mark: 0,
   pass_mark: 0,
   exam_desc: '',
   exam_instructions: '',
    questions: []
  };
  
  ngOnInit() {
  }


  constructor(private languageService : LanguageService  ,private apiPortal:PortalserviceService  ,private storage: Storage, private modalController : ModalController,private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService ) {
    this.ionicForm = this.formBuilder.group({
    case_title: ['' , Validators.required]
    })
     }




// Add these methods to the exam-create.page.ts
removeQuestion(index: number) {
  this.exam.questions.splice(index, 1);
}

removeAnswer(question: any, answerIndex: number) {
  question.answers.splice(answerIndex, 1);
}

  addQuestion() {
    this.exam.questions.push({
      question_text: '',
      question_mark: 0,
      type: 'multiple',
      answers: []
    });
    this.onQuestionTypeChange(this.exam.questions[this.exam.questions.length - 1]);
  }

  addAnswer(question: any) {
    question.answers.push({
      answer_text: '',
      IsCorrect: false
    });
    
    // Ensure at least one correct answer is selected
    if (question.answers.filter((a: any) => a.IsCorrect).length === 0) {
      question.answers[0].IsCorrect = true;
    }
  }

  onQuestionTypeChange(question: any) {
    question.answers = [];
    if (question.type === 'multiple') {
      // Start with 2 answers minimum
      question.answers.push(
        { answer_text: '', IsCorrect: true , },
        { answer_text: '', IsCorrect: false  }
      );
    } else {
      // Single answer for other types
      question.answers.push({ answer_text: '' });
    }
  }

  validate(){ 
    this.isSubmitted = true; 
    console.log('validate' , this.isSubmitted , this.exam.exam_name)
    if (this.exam.exam_name == "") { 
      return false
    } else if(this.exam.duration == 0){
      return false
    } else {
      return true
    }  
  }

  saveBasics() {
    // let d: Date = this.payInvo.pay_date
    // this .payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.exam) 
      this.saveInvo() 
    }
  }

  saveInvo() {
    console.log('saveInvo')
    this.api.saveExam(this.exam).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Created') {
     this.exam.id = data['message']
     if (this.exam.question.length > 0) {
      this.exam.question.forEach(element => {
        element.exam_id = this.exam.id
       });
       this.saveCaseLawers()
     }else{
      this.presentToast('تم حفظ البيانات بنجاح', 'success')
      //this.prepareCace()
      //this._location.back(); 
     } 
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  
  saveExam() {
    // Add your save logic here
    console.log('Saving exam:', this.exam);
    // You would typically send this.exam to your backend service
  }

  saveCaseLawers() {
    console.log('saveInvo')
    this.api.saveQuestions(this.exam.questions).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') { 
      this.presentToast('تم حفظ البيانات بنجاح', 'success') 
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
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

}
 
