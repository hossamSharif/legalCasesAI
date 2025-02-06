import { Component, OnInit, ViewChild, ElementRef ,Renderer2,Input} from '@angular/core';
import { FilterPipe } from '../new-case/pipe';
import { FilterPipe2 } from '../new-case/pipe2';
import { FilterPipe3  } from '../new-case/pipe3';
import { Location } from '@angular/common'; 
import { ServicesService } from '../stockService/services.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastButton, ToastController } from '@ionic/angular';
import { Case } from '../new-case/new-case.page';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NewCourtPage } from '../new-court/new-court.page';
import { NewCaseStatusPage } from '../new-case-status/new-case-status.page';
import { PortalserviceService } from '../portal/portalservice.service';
var ls = window.localStorage;
import { Storage } from '@ionic/storage';
import { LanguageService } from '../services/language.service';
 
@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.page.html',
  styleUrls: ['./edit-case.page.scss'],
  standalone: false,
})
export class EditCasePage implements OnInit {
 
 locale : string = 'ar-SA';
  searchTermCaseType : any = ""
      searchTermCustomer : any = "" 
      searchTermCourt : any = ""
  caseTypeArr2: Array<any> = [
    { id: 1, name: "إقامة حارس قضائي", category: "أحوال شخصية", sub_category: "التصنيف العام", isFinancial: false },
    { id: 2, name: "التعويض عن أضرار التقاضي", category: "أحوال شخصية", sub_category: "التصنيف العام", isFinancial: true },
    { id: 3, name: "أتعاب محامين أو وكلاء", category: "أحوال شخصية", sub_category: "التصنيف العام", isFinancial: true },
    { id: 4, name: "مطالبة بمستندات", category: "أحوال شخصية", sub_category: "التصنيف العام", isFinancial: false },
    { id: 5, name: "معارضة على صك إنهائي", category: "أحوال شخصية", sub_category: "التصنيف العام", isFinancial: false },
    { id: 6, name: "منع من السفر", category: "أحوال شخصية", sub_category: "التصنيف العام", isFinancial: false },
    { id: 7, name: "هبة أو رجوع عنها", category: "أحوال شخصية", sub_category: "التصنيف العام", isFinancial: false },
    { id: 8, name: "إثبات شهادة", category: "أحوال شخصية", sub_category: "التصنيف العام", isFinancial: false },
    { id: 9, name: "إبطال وقف أو وصية", category: "أحوال شخصية", sub_category: "دعاوى الأوقاف والوصايا", isFinancial: false },
    { id: 10, name: "إثبات وقف أو وصية", category: "أحوال شخصية", sub_category: "دعاوى الأوقاف والوصايا", isFinancial: false },
    { id: 11, name: "استحقاق في وقف أو وصية", category: "أحوال شخصية", sub_category: "دعاوى الأوقاف والوصايا", isFinancial: true },
    { id: 12, name: "عزل ناظر وقف أو وصية", category: "أحوال شخصية", sub_category: "دعاوى الأوقاف والوصايا", isFinancial: false },
    { id: 13, name: "محاسبة ناظر وقف أو وصية", category: "أحوال شخصية", sub_category: "دعاوى الأوقاف والوصايا", isFinancial: true },
    { id: 14, name: "أجرة رضاع أو حضانة", category: "أحوال شخصية", sub_category: "دعاوى الحضانة والزيارة والنفقة", isFinancial: true },
    { id: 15, name: "تسليم صغير لحاضنه", category: "أحوال شخصية", sub_category: "دعاوى الحضانة والزيارة والنفقة", isFinancial: false },
    { id: 16, name: "حضانة", category: "أحوال شخصية", sub_category: "دعاوى الحضانة والزيارة والنفقة", isFinancial: false },
    { id: 17, name: "رؤية صغير", category: "أحوال شخصية", sub_category: "دعاوى الحضانة والزيارة والنفقة", isFinancial: false },
    { id: 18, name: "زيادة نفقة أو إنقاصها أو إلغائها", category: "أحوال شخصية", sub_category: "دعاوى الحضانة والزيارة والنفقة", isFinancial: true },
    { id: 19, name: "زيارة أولاد أو غيرهم", category: "أحوال شخصية", sub_category: "دعاوى الحضانة والزيارة والنفقة", isFinancial: false },
    { id: 20, name: "إثبات المراجعة", category: "أحوال شخصية", sub_category: "دعاوى الزواج والفرقة", isFinancial: false },
    { id: 21, name: "إثبات طلاق", category: "أحوال شخصية", sub_category: "دعاوى الزواج والفرقة", isFinancial: false },
    { id: 22, name: "إثبات زواج", category: "أحوال شخصية", sub_category: "دعاوى الزواج والفرقة", isFinancial: false },
    { id: 23, name: "مهر", category: "أحوال شخصية", sub_category: "دعاوى الزواج والفرقة", isFinancial: true },
    { id: 24, name: "عفش الزوجية", category: "أحوال شخصية", sub_category: "دعاوى الزواج والفرقة", isFinancial: true },
    { id: 25, name: "فسخ عقد زواج", category: "أحوال شخصية", sub_category: "دعاوى الزواج والفرقة", isFinancial: false },
    { id: 26, name: "إثبات نسب أو نفيه", category: "أحوال شخصية", sub_category: "دعاوى الولاية", isFinancial: false },
    { id: 27, name: "حجر أو رفعه", category: "أحوال شخصية", sub_category: "دعاوى الولاية", isFinancial: false },
    { id: 28, name: "عزل ولي", category: "أحوال شخصية", sub_category: "دعاوى الولاية", isFinancial: false },
    { id: 29, name: "عضل", category: "أحوال شخصية", sub_category: "دعاوى الولاية", isFinancial: false },
    { id: 30, name: "محاسبة ولي", category: "أحوال شخصية", sub_category: "دعاوى الولاية", isFinancial: true },
    { id: 31, name: "دعوى قسمة تركة أكثر من خمسين مليون ريال", category: "أحوال شخصية", sub_category: "دعاوى قسمة التركات", isFinancial: true },
    { id: 32, name: "قسمة تركة عقارية", category: "أحوال شخصية", sub_category: "دعاوى قسمة التركات", isFinancial: true },
    { id: 33, name: "قسمة تركة مالية", category: "أحوال شخصية", sub_category: "دعاوى قسمة التركات", isFinancial: true },
    { id: 34, name: "محاسبة في تركة", category: "أحوال شخصية", sub_category: "دعاوى قسمة التركات", isFinancial: true },
    { id: 35, name: "التحكيم (تجاري)", category: "تجاري", sub_category: "الاستئناف", isFinancial: true },
    { id: 36, name: "الاستثمار الأجنبي", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 37, name: "البيانات التجارية", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 38, name: "التجارة البحرية", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 39, name: "الامتياز التجاري", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 40, name: "الرهن التجاري", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 41, name: "السجل التجاري", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 42, name: "مكافحة الغش التجاري", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 43, name: "الأوراق التجارية", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 44, name: "المنافسة غير المشروعة", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 45, name: "الوكالات التجارية", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 46, name: "الأسماء التجارية", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 47, name: "حماية الأسرار التجارية", category: "تجاري", sub_category: "الأنظمة التجارية", isFinancial: true },
    { id: 48, name: "شركات المضاربة", category: "تجاري", sub_category: "الشركات", isFinancial: true },
    { id: 49, name: "الشركات النظامية", category: "تجاري", sub_category: "الشركات", isFinancial: true },
    { id: 50, name: "عقد الشركة", category: "تجاري", sub_category: "الشركات", isFinancial: true },
    { id: 51, name: "أتعاب محاماة أو وكلاء", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: true },
    { id: 52, name: "دعوى الضرر بين التجار بسبب المسؤولية التقصيرية", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: true },
    { id: 53, name: "المعينين في القضايا التجارية", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: false },
    { id: 54, name: "أوامر الأداء", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: true },
    { id: 55, name: "التعويض عن مصاريف التقاضي", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: true },
    { id: 56, name: "التظلم على أمر الأداء", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: false },
    { id: 57, name: "إجارة", category: "تجاري", sub_category: "العقود التجارية", isFinancial: true },
    { id: 58, name: "الحوالة التجارية", category: "تجاري", sub_category: "العقود التجارية", isFinancial: true },
    { id: 59, name: "الدعاية والإعلان والتسويق", category: "تجاري", sub_category: "العقود التجارية", isFinancial: true },
    { id: 60, name: "الكفالة التجارية", category: "تجاري", sub_category: "العقود التجارية", isFinancial: true },
    { id: 61, name: "المقاولات", category: "تجاري", sub_category: "العقود التجارية", isFinancial: true },
    { id: 62, name: "المكاتب والمحلات التجارية", category: "تجاري", sub_category: "العقود التجارية", isFinancial: true },
    { id: 63, name: "حماية حقوق المؤلف", category: "تجاري", sub_category: "الملكية الفكرية", isFinancial: true },
    { id: 64, name: "براءات الاختراع", category: "تجاري", sub_category: "الملكية الفكرية", isFinancial: true },
    { id: 65, name: "العلامات التجارية", category: "تجاري", sub_category: "الملكية الفكرية", isFinancial: true },
    { id: 66, name: "حجز تحفظي", category: "تجاري", sub_category: "الدعاوى المستعجلـة", isFinancial: true },
    { id: 67, name: "حراسة قضائية", category: "تجاري", sub_category: "الدعاوى المستعجلـة", isFinancial: true },
    { id: 68, name: "منع من السفر", category: "تجاري", sub_category: "الدعاوى المستعجلـة", isFinancial: false },
    { id: 69, name: "وقف الأعمال الجديدة", category: "تجاري", sub_category: "الدعاوى المستعجلـة", isFinancial: false },
    { id: 70, name: "معاينة لإثبات الحالة", category: "تجاري", sub_category: "الدعاوى المستعجلـة", isFinancial: false },
    { id: 71, name: "وقف تنفيذ", category: "تجاري", sub_category: "الدعاوى المستعجلـة", isFinancial: false },
    { id: 72, name: "الامتناع", category: "تنفيذ", sub_category: "الامتناع عن قبول السند", isFinancial: false },
    { id: 73, name: "دعوى الملاءة", category: "تنفيذ", sub_category: "دعوى الإعسار أو الملاءة", isFinancial: true },
    { id: 74, name: "عدم توفر شرط شكلي للسند أو تزويره أو إنكار التوقيع", category: "تنفيذ", sub_category: "منازعات شكلية", isFinancial: false },
    { id: 75, name: "عدم الصفة", category: "تنفيذ", sub_category: "منازعات شكلية", isFinancial: false },
    { id: 76, name: "الإبراء بعد صدور السند التنفيذي", category: "تنفيذ", sub_category: "منازعات غير شكلية", isFinancial: true },
    { id: 77, name: "التأجيل بعد صدور السند التنفيذي", category: "تنفيذ", sub_category: "منازعات غير شكلية", isFinancial: true },
    { id: 78, name: "الحوالة بعد صدور السند التنفيذي", category: "تنفيذ", sub_category: "منازعات غير شكلية", isFinancial: true },
    { id: 79, name: "الصلح بعد صدور السند التنفيذي", category: "تنفيذ", sub_category: "منازعات غير شكلية", isFinancial: true },
    { id: 80, name: "المال المحجوز يفوق مقدار الدين المطالب به", category: "تنفيذ", sub_category: "منازعات غير شكلية", isFinancial: true },
    { id: 81, name: "المقاصة بموجب سند تنفيذي", category: "تنفيذ", sub_category: "منازعات غير شكلية", isFinancial: true },
    { id: 82, name: "المطالبة بالحق الخاص", category: "جزائية", sub_category: "الحق الخاص", isFinancial: true },
    { id: 83, name: "منع من السفر", category: "جزائية", sub_category: "الطلبات القضائية", isFinancial: false },
    { id: 84, name: "إثبات تنازل", category: "جزائية", sub_category: "الطلبات القضائية", isFinancial: false },
    { id: 85, name: "تسليم مضبوطات", category: "جزائية", sub_category: "الطلبات القضائية", isFinancial: false },
    { id: 86, name: "المعاينة لإثبات الحالة", category: "جزائية", sub_category: "الطلبات القضائية", isFinancial: false },
    { id: 87, name: "إثبات شهادة", category: "جزائية", sub_category: "الطلبات القضائية", isFinancial: false },
    { id: 88, name: "التظلم من أمر توقيف", category: "جزائية", sub_category: "الطلبات القضائية", isFinancial: false },
    { id: 89, name: "قذف", category: "جزائية", sub_category: "حدود", isFinancial: false },
    { id: 90, name: "ما دون النفس", category: "جزائية", sub_category: "قصاص", isFinancial: false },
    { id: 91, name: "نفس", category: "جزائية", sub_category: "قصاص", isFinancial: false },
    { id: 92, name: "أتعاب محاماة أو وكلاء", category: "جزائية", sub_category: "مطالبة مالية", isFinancial: true },
    { id: 93, name: "التعويض عن السجن", category: "جزائية", sub_category: "مطالبة مالية", isFinancial: true },
    { id: 94, name: "أرش", category: "جزائية", sub_category: "مطالبة مالية", isFinancial: true },
    { id: 95, name: "دية", category: "جزائية", sub_category: "مطالبة مالية", isFinancial: true },
    { id: 96, name: "رد العين", category: "جزائية", sub_category: "مطالبة مالية", isFinancial: true },
    { id: 97, name: "التعويض عن أضرار التقاضي", category: "جزائية", sub_category: "مطالبة مالية", isFinancial: true },
    { id: 98, name: "منع من السفر", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: false },
    { id: 99, name: "حراسة قضائية", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: false },
    { id: 100, name: "وقف الأعمال الجديدة", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: false },
    { id: 101, name: "أجرة الأجير اليومية أو الأسبوعية", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: true },
    { id: 102, name: "استرداد حيازة عقار", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: false },
    { id: 103, name: "المعاينة لإثبات الحالة", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: false },
    { id: 104, name: "منع التعرض للحيازة", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: false },
    { id: 105, name: "حجز تحفظي", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: true },
    { id: 106, name: "إثبات شهادة", category: "عامة", sub_category: "الدعاوى المستعجلة", isFinancial: false },
    { id: 107, name: "حق الشفعة", category: "عامة", sub_category: "عقارية", isFinancial: false },
    { id: 108, name: "ملكية عقار", category: "عامة", sub_category: "عقارية", isFinancial: false },
    { id: 109, name: "قسمة عقارات مشتركة", category: "عامة", sub_category: "عقارية", isFinancial: false },
    { id: 110, name: "مساهمة عقارية", category: "عامة", sub_category: "عقارية", isFinancial: true },
    { id: 111, name: "مساييل أو حمى", category: "عامة", sub_category: "عقارية", isFinancial: false },
    { id: 112, name: "مقاولات إنشاء مباني", category: "عامة", sub_category: "عقارية", isFinancial: true },
    { id: 113, name: "إثبات رهن أو بيع المرهون", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 114, name: "رد مسروق", category: "عامة", sub_category: "مالية", isFinancial: false },
    { id: 115, name: "عاريّة", category: "عامة", sub_category: "مالية", isFinancial: false },
    { id: 116, name: "قرض أو سلف", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 117, name: "هبة في غير عقار", category: "عامة", sub_category: "مالية", isFinancial: false },
    { id: 118, name: "أتعاب محامين أو وكلاء", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 119, name: "أجرة أعمال", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 120, name: "أجرة عقار", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 121, name: "أجرة عين منقول", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 122, name: "التعويض عن أضرار التقاضي", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 123, name: "ثمن مبيع", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 124, name: "حوالة الدين من ذمة شخص لآخر", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 125, name: "شراكة في أملاك غير عقارية", category: "عامة", sub_category: "مالية", isFinancial: false },
    { id: 126, name: "ضمان (كفالة)", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 127, name: "محاسبة وكيل", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 128, name: "مطالبة الضامن للمضمون عنه (كفيل لمكفوله)", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 129, name: "أرش إصابة أو دية في غير حادث مروري", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 130, name: "وديعة", category: "عامة", sub_category: "مالية", isFinancial: true },
    { id: 131, name: "حق خاص ناشئ عن حادث مروري", category: "عامة", sub_category: "مروري", isFinancial: true },
    { id: 132, name: "التحكيم (عامة)", category: "عامة", sub_category: "الاستئناف", isFinancial: false },
    { id: 133, name: "التأمينات الاجتماعية", category: "عامة", sub_category: "اعتراض على قرارات", isFinancial: true },
    { id: 134, name: "إثبات السبب الصحيح لإنهاء العلاقة", category: "عامة", sub_category: "اعتراض على قرارات", isFinancial: false },
    { id: 135, name: "إيقاع العقوبات النظامية", category: "عامة", sub_category: "اعتراض على قرارات", isFinancial: false },
    { id: 136, name: "دعوى اعتراض على قرار المنشأة الإداري", category: "عامة", sub_category: "اعتراض على قرارات", isFinancial: false },
    { id: 137, name: "لجان الخدمة المنزلية", category: "عمالية", sub_category: "اعتراض على قرارات", isFinancial: false },
    { id: 51, name: "أتعاب محاماة أو وكلاء", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: true },
    { id: 52, name: "دعوى الضرر بين التجار بسبب المسؤولية التقصيرية", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: true },
    { id: 53, name: "المعينين في القضايا التجارية", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: false },
    { id: 54, name: "أوامر الأداء", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: true },
    { id: 55, name: "التعويض عن مصاريف التقاضي", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: true },
    { id: 56, name: "التظلم على أمر الأداء", category: "تجاري", sub_category: "الطلبات القضائيـة", isFinancial: false },
    { id: 138, name: "منع من السفر", category: "عمالية", sub_category: "الطلبات العارضة والعاجلة", isFinancial: false },
    { id: 139, name: "أجرة الأجير اليومية أو الأسبوعية", category: "عمالية", sub_category: "الطلبات العارضة والعاجلة", isFinancial: true },
    { id: 140, name: "إيقاف التنفيذ", category: "عمالية", sub_category: "الطلبات العارضة والعاجلة", isFinancial: false },
    { id: 141, name: "المعاينة لإثبات الحالة", category: "عمالية", sub_category: "الطلبات العارضة والعاجلة", isFinancial: false },
    { id: 142, name: "حجز تحفظي", category: "عمالية", sub_category: "الطلبات العارضة والعاجلة", isFinancial: true },
    { id: 143, name: "إثبات شهادة", category: "عمالية", sub_category: "الطلبات العارضة والعاجلة", isFinancial: false },
    { id: 144, name: "مكافأة", category: "عمالية", sub_category: "حقوق مالية", isFinancial: true },
    { id: 145, name: "أتعاب محاماة أو وكلاء", category: "عمالية", sub_category: "حقوق مالية", isFinancial: true },
    { id: 146, name: "أجر", category: "عمالية", sub_category: "حقوق مالية", isFinancial: true },
    { id: 147, name: "بدل", category: "عمالية", sub_category: "حقوق مالية", isFinancial: true },
    { id: 148, name: "دفع أو استرداد الرسوم", category: "عمالية", sub_category: "حقوق مالية", isFinancial: true },
    { id: 149, name: "قيمة متلف", category: "عمالية", sub_category: "حقوق مالية", isFinancial: true },
    { id: 150, name: "مبالغ مالية أنفقها العامل لصالح العمل", category: "عمالية", sub_category: "حقوق مالية", isFinancial: true },
    { id: 151, name: "العمولات", category: "عمالية", sub_category: "حقوق مالية", isFinancial: true },
    { id: 152, name: "تأمين سكن", category: "عمالية", sub_category: "حقوق وظيفية", isFinancial: true },
    { id: 153, name: "توسيع مجال خدمات التأمين الصحي", category: "عمالية", sub_category: "حقوق وظيفية", isFinancial: true },
    { id: 154, name: "تذاكر سفر", category: "عمالية", sub_category: "حقوق وظيفية", isFinancial: true },
    { id: 155, name: "ترقية أو علاوة", category: "عمالية", sub_category: "حقوق وظيفية", isFinancial: true },
    { id: 156, name: "تسكين على وظيفة أو تعديل أو مساواة في المرتبة", category: "عمالية", sub_category: "حقوق وظيفية", isFinancial: false },
    { id: 157, name: "تسليم عهدة أو استرداد قرض", category: "عمالية", sub_category: "حقوق وظيفية", isFinancial: true },
    { id: 158, name: "تمكين من العمل", category: "عمالية", sub_category: "حقوق وظيفية", isFinancial: false },
    { id: 159, name: "نسخة من عقد العمل", category: "عمالية", sub_category: "مستندات ووثائق", isFinancial: false },
    { id: 160, name: "مستندات ووثائق", category: "عمالية", sub_category: "مستندات ووثائق", isFinancial: false },
    { id: 161, name: "شهادة الخدمة", category: "عمالية", sub_category: "مستندات ووثائق", isFinancial: false },
    { id: 162, name: "تكاليف العلاج", category: "عمالية", sub_category: "تعويض", isFinancial: true },
    { id: 163, name: "التعويض عن عدم التسجيل في التأمينات", category: "عمالية", sub_category: "تعويض", isFinancial: true },
    { id: 164, name: "إنهاء العلاقة العمالية من صاحب العمل", category: "عمالية", sub_category: "تعويض", isFinancial: false },
    { id: 165, name: "إنهاء العلاقة العمالية من العامل", category: "عمالية", sub_category: "تعويض", isFinancial: false },
    { id: 166, name: "عدم إلتزام صاحب العمل بمهلة الإشعار", category: "عمالية", sub_category: "تعويض", isFinancial: true },
    { id: 167, name: "عدم إلتزام العامل بمهلة الإشعار", category: "عمالية", sub_category: "تعويض", isFinancial: true },
    { id: 168, name: "التعويض عن أضرار التقاضي", category: "عمالية", sub_category: "تعويض", isFinancial: true },
    { id: 169, name: "رصيد الإجازات", category: "عمالية", sub_category: "تعويض", isFinancial: true },
    { id: 170, name: "إصابة العمل", category: "عمالية", sub_category: "تعويض", isFinancial: true },
    { id: 171, name: "عدم المنافسة وحماية الأسرار", category: "عمالية", sub_category: "تعويض", isFinancial: false },
    { id: 172, name: "التحكيم (عمالي)", category: "عمالية", sub_category: "الاستئناف", isFinancial: false },
    { id: 173, name: "إقامة ولاية على قاصر سناً", category: "إنهاءات", sub_category: "الولايات", isFinancial: false },
    { id: 174, name: "إقامة ولاية على قاصر عقلاً", category: "إنهاءات", sub_category: "الولايات", isFinancial: false },
    { id: 175, name: "إثبات رشد من كان قاصراً عقلاً", category: "إنهاءات", sub_category: "الولايات", isFinancial: false },
    { id: 176, name: "فسخ ولاية بطلب من الولي", category: "إنهاءات", sub_category: "الولايات", isFinancial: false },
    { id: 177, name: "تقدير نفقة قاصر", category: "إنهاءات", sub_category: "الولايات", isFinancial: true },
    { id: 178, name: "فسخ الولاية لموت الولي", category: "إنهاءات", sub_category: "الولايات", isFinancial: false },
    { id: 179, name: "إقامة ولاية على مال مفقود", category: "إنهاءات", sub_category: "الولايات", isFinancial: false },
    { id: 180, name: "فسخ ولاية على مال مفقود", category: "إنهاءات", sub_category: "الولايات", isFinancial: false },
    { id: 181, name: "ولاية ورعاية وحضانة يتيم أو ذوي احتياجات خاصة", category: "إنهاءات", sub_category: "الولايات", isFinancial: false },
    { id: 182, name: "الموافقة على الزواج المبكر", category: "إنهاءات", sub_category: "إثباتات اجتماعية", isFinancial: false },
    { id: 183, name: "إثبات انقطاع الأولياء عن المرأة لغرض الزواج", category: "إنهاءات", sub_category: "إثباتات اجتماعية", isFinancial: false },
    { id: 184, name: "عقد زواج بولاية القاضي", category: "إنهاءات", sub_category: "إثباتات اجتماعية", isFinancial: false },
    { id: 185, name: "إثبات أقرب ولي لتزويج", category: "إنهاءات", sub_category: "إثباتات اجتماعية", isFinancial: false },
    { id: 186, name: "إثبات فقد وغيبة", category: "إنهاءات", sub_category: "إثباتات اجتماعية", isFinancial: false },
    { id: 187, name: "إثبات تبين حال مفقود بالسلامة والحضور", category: "إنهاءات", sub_category: "إثباتات اجتماعية", isFinancial: false },
    { id: 188, name: "إذن تصرف بأملاك وقف أو وصية", category: "إنهاءات", sub_category: "الأوقاف والوصايا", isFinancial: true },
    { id: 189, name: "تعديل وإضافة لصك الوقف أو الوصية", category: "إنهاءات", sub_category: "الأوقاف والوصايا", isFinancial: false },
    { id: 190, name: "طلب المستثمر فسخ أو تعديل على عقد الاستثمار المأذون به من المحكمة", category: "إنهاءات", sub_category: "الأوقاف والوصايا", isFinancial: true },
    { id: 191, name: "تسليم أموال الوقف أو الوصية المودعة لدى الهيئة", category: "إنهاءات", sub_category: "الأوقاف والوصايا", isFinancial: true },
    { id: 192, name: "إقامة مشرف على وقف أو وصية", category: "إنهاءات", sub_category: "الأوقاف والوصايا", isFinancial: false },
    { id: 193, name: "استقالة ناظر على وقف أو وصية", category: "إنهاءات", sub_category: "الأوقاف والوصايا", isFinancial: false },
    { id: 194, name: "إثبات وقف أو وصية لمتوفى ومن ضمن الورثة غائب أو قاصر أو مفقود", category: "إنهاءات", sub_category: "الأوقاف والوصايا", isFinancial: false },
    { id: 195, name: "إذن التصرف بأملاك القاصر أو المفقود أو الغائب", category: "إنهاءات", sub_category: "الأذونات", isFinancial: true },
    { id: 196, name: "تعديل وتهميش على صك إنهائي", category: "إنهاءات", sub_category: "تعديلات الصكوك", isFinancial: false } ,
    { id: 197, name: "إثبات زواج سابق", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 198, name: "إثبات رجعة", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 199, name: "إثبات طلاق", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 200, name: "إثبات خلع", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 201, name: "إثبات حضانة", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 202, name: "إثبات زواج أحد الزوجين غير سعودي", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 203, name: "إثبات ورثة متوفى", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 204, name: "الموافقة على الزواج المبكر", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 205, name: "إثبات وقف", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 206, name: "إثبات وصية", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false },
    { id: 207, name: "قسمة تركة بالتراضي مع وجود قاصر أو غائب أو مفقود أو وقف أو وصية", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: true },
    { id: 208, name: "إنشاء عقد زواج", category: "إنهاءات", sub_category: "إنهاءات الأوقاف والمواريث في الأحساء والقطيف", isFinancial: false }
  ]
  
  
  
  segVal:string = "basics"
  @ViewChild('popInput') popInput; 
  @ViewChild('popover') popover;
  @ViewChild('popoverNotif') popoverNotif;
  @ViewChild('popoverCase') popoverCase;
  @ViewChild('popoverCaseNagz') popoverCaseNagze;
  @ViewChild('popoverCategNagz') popoverCategNagze;
  @ViewChild('popoverِCustomer') popoverِCustomer;
  @ViewChild('popoverِBranch') popoverِBranch;
  @ViewChild('popoverِِCourt') popoverِِCourt;
  @ViewChild('popoverِِAgent') popoverِِAgent;
  @ViewChild('popoverِِِِCost') popoverِِِِCost;
  @ViewChild('popoverِِِِInvoice') popoverِِِِInvoice;
  @ViewChild('popoverِِِِServClass') popoverِِِِServClass;


  loading:boolean = false
  showEmpty:boolean = false
  sessionsArray:any = []

   isOpenCustType = false ;
   showCustType = false
   usersArr :Array<any> =[]
   selectedLawyersTeamArr :Array<any> =[]
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

  isOpen = false; 
  isOpenNotif = false ;
  isOpenCase = false ;
  isOpenCaseNagz = false ;
  isOpenCategNagz = false ;
  searchTerm : any = ""
  aliasTerm :any =""
  searchResult :Array<any> =[]
  costumerArr :Array<any> =[]
  caseTypeArr :Array<any> =[]
  caseTypeArrNagz :Array<any> =[]
  caseCategArrNagz :Array<any> =[]
  caseStatusArr :Array<any> =[]
  aliasResult :Array<any> =[]  
  finalResult :Array<any> =[]
  notifArr : Array<any> =[]
  showNotif = false
  showCase = false
  showCaseNagz = false
  showCategNagz = false
  selectedCustomer : {id:any ,cust_name:any};
  selectedType : {id:any ,name:any };
  selectedCaseStatus : {id:any ,name:any , status_color:any };
  selectedCaseNagz : {id:any ,name:any };
  selectedCategNagz : {id:any ,name:any };

  //intial values of case interface 
   newCase: Case =  {
    id: 0,
    case_title: '',
    client_id: 0,
    case_type: '',
    client_role: '',
    service_classification: '',
    branch: '',
    court_name: '',
    opponent_name: '',
    opponent_id: 0,
    opponent_representative: '',
    case_open_date: new Date().toISOString(),
    deadline: new Date().toISOString(),
    billing_type: '',
    claim_type: '',
    work_hour_value: 0,
    estimated_work_hours: 0,
    case_status: '',
    constraintId_najz: '',
    archive_id_najz: '',
    caseId_najz: '',
    case_classification_najz: '',
    case_open_date_najz: new Date().toISOString(),
    case_docs: '',
    Plaintiff_Requests: '',
    case_status_najz: '',
    case_subject: '',
    court_id: 0
  }

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



  ionicForm: UntypedFormGroup;
  isSubmitted = false;
  constructor(private languageService : LanguageService ,private storage: Storage,private modalController : ModalController, private route: ActivatedRoute ,private rout : Router ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: UntypedFormBuilder,private _location :Location ,private api:ServicesService ,private apiPortal:PortalserviceService  ) {
    this.ionicForm = this.formBuilder.group({
    case_title: ['' , Validators.required],
   
  })

    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.USER_INFO = response  
        console.log('USER_INFO',this.USER_INFO) 
        this.getLawyers() 
      }  
      })

      this.getAppInfo()

    this.route.queryParams.subscribe(params => {
      if (params && params.case) {
        this.segVal = JSON.parse(params.segVal)
        console.log('segment',JSON.parse(params.segVal))
        console.log('caseRoute',JSON.parse(params.case))
        this.newCase = JSON.parse(params.case)
        this.selectedType.name = this.newCase.case_type
        this.selectedAgent.name = this.newCase.client_role
        this.selectedServ.name = this.newCase.service_classification
        this.selectedBranch.name = this.newCase.branch
        this.selectedCourt.name = this.newCase.court_name
        this.selectedInvoice.name = this.newCase.billing_type
        this.selectedCost.name = this.newCase.claim_type
        this.newCase.case_status =  this.newCase.case_status
        this.selectedCaseStatus.name = this.newCase['status_name']
        this.selectedCaseStatus.status_color = this.newCase['status_color'] 
        this.selectedCategNagz.name = this.newCase.case_classification_najz
        this.addParam()
      }
    });
  }

  ngOnInit() {
   
  }


  addParam() {
    this.rout.navigate([],
      {
        queryParams: { case: JSON.stringify(this.newCase) },
         queryParamsHandling: 'merge' // This will keep the existing query params and add the new one  
      }
    );
  //  console.log('queryParams', this.rout.getCurrentNavigation().extras.queryParams)
  }

  close(){
    this._location.back();
  }

  prepareTeam(){
    this.route.queryParams.subscribe(params => {
      if (params && params.case) {
        let cs = JSON.parse(params.case)
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
                    case_id :this.newCase.id ,
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

  saveBasics() {
    // let d: Date = this.payInvo.pay_date
    // this.payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.newCase) 
      this.saveInvo() 
    }
  }

  saveInvo() {
    console.log('saveInvo')
    this.api.updateCase(this.newCase).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Updated') { 
      this.deleteCaseLawers() 
      }else{
      this.presentToast('1لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('2لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  deleteCaseLawers() {
    console.log('deleteCaseLawers')
    this.api.deleteCaseLawers(this.newCase.id).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Deleted') {
      if (this.selectedLawyersTeamArr.length > 0) {
        this.selectedLawyersTeamArr.forEach(element => {
          element.case_id = this.newCase.id
         });
         this.saveCaseLawers()
       }else{
        this.presentToast('تم حفظ البيانات بنجاح', 'success')
        this.prepareCace()
        this._location.back();
       } 
      }else{
      this.presentToast('3لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('4لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  getCourts(){ 
    this.api.getCourts().subscribe(data =>{
      console.log(data)
      let res = data
      if(data['message'] != 'No courts Found'){ 
        this.courtArr = res['data']
      }   
    }, (err) => {

    } ,
    ()=>{ 
   }
   )  
  }

  getCaseStatus(){ 
    this.api.getCaseStatus().subscribe(data =>{
      console.log(data)
      let res = data
      if(data['message'] != 'No case status Found'){ 
        this.caseStatusArr = res['data']
      }   
    }, (err) => {

    } ,
    ()=>{ 
   }
   )  
  }

  saveCaseLawers() {
    console.log('saveInvo' , this.selectedLawyersTeamArr)
    // let arr =[]
    // for (let index = 0; index < this.selectedLawyersTeamArr.length; index++) {
    //   const element = this.selectedLawyersTeamArr[index];
    //   arr.push({
    //     case_id:element.case_Id,
    //     user_id :element.user_id
    //   })
    // }
    console.log('arr' , this.selectedLawyersTeamArr)
    this.api.saveCaseLawyer(this.selectedLawyersTeamArr).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
     //this.newCase.id = data['message']
     this.presentToast('تم حفظ البيانات بنجاح', 'success')
     this.addParam()
     this.prepareCace()
     this._location.back();
      }else{
      this.presentToast('5لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('6لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  async presentStatusModal(id?, status?) {
       
    const modal = await this.modalController.create({
      component: NewCaseStatusPage ,
      // componentProps: {
      //   "item": this.selectedItem,
      //   "colSetting": this.colSetting, 
      //   "filterArrayOrign": this.filterArrayOrign, 
      //   "filterArray": this.filterArray, 
      //   "brandList": this.brandList, 
      //   "modelList": this.modelList,  
      //   "status": status
      // }
    });
    
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
         console.log(dataReturned )
        this.doAfterDissmissStatus(dataReturned)
      }
    });
 
    return await modal.present(); 
  }
  async presentCourtModal(id?, status?) {
       
    const modal = await this.modalController.create({
      component: NewCourtPage ,
      // componentProps: {
      //   "item": this.selectedItem,
      //   "colSetting": this.colSetting, 
      //   "filterArrayOrign": this.filterArrayOrign, 
      //   "filterArray": this.filterArray, 
      //   "brandList": this.brandList, 
      //   "modelList": this.modelList,  
      //   "status": status
      // }
    });
    
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
         console.log(dataReturned )
        this.doAfterDissmiss(dataReturned)
      }
    });
 
    return await modal.present(); 
  }

  doAfterDissmiss(data){
    if (data.role == 'reload' ) { 
          this.getCourts()
      }   
  }

  doAfterDissmissStatus(data){
    if (data.role == 'reload' ) { 
          this.getCaseStatus()
      }   
  }

  prepareCace(){  
    this.caseTypeArr.push(
      {id:1,name:"احوال شخصية"},
      {id:2,name:"تنفيذ"},
      {id:3,name:"جزائية"},
      {id:4,name:"عامة"},
      {id:5,name:"عمالية"},
      {id:6,name:"إنهائات"}
    )

    this.caseTypeArrNagz.push(
      {id:1,name:"احوال شخصية"},
      {id:2,name:"تنفيذ"},
      {id:3,name:"جزائية"},
      {id:4,name:"عامة"},
      {id:5,name:"عمالية"},
      {id:6,name:"إنهائات"}
    )


    this.caseCategArrNagz.push(
      {id:1,name:"تصنيف 1"},
      {id:2,name:"تصنيف 2"},
      {id:3,name:"تصنيف 3"}
    )

  
    this.servArr.push(
      {id:1,name:"مرافعة "},
      {id:2,name:"تنفيذ"} ,
      {id:3,name:"استشارة"}
    )

    this.selectedServ = {id:"",name:""}

    this.caseStatusArr .push(
      {id:1,name:"مفتوح"},
      {id:2,name:"مغلق"}
    ) 

    this.selectedCustTye = {id:1,name:"فرد"}
    
     this.BranchArr.push(
      {id:1,name:"الرياض"},
      {id:2,name:"الدمام"},
      {id:3,name:"القصيم"},
      {id:4,name:"المدينة"}
    )

    this.selectedBranch = {id:"",name:""}
   
    this.invoiceArr.push(
      {id:1,name:"مبلع مقطوع"},
      {id:2,name:"ساعات عمل"} 
     )
    this.selectedInvoice = {id:"",name:""}


     this.courtArr.push(
      {id:1,name:"الرياض"},
      {id:2,name:"الدمام"},
      {id:3,name:"القصيم"},
      {id:4,name:"المدينة"}
      )

     this.selectedCourt = {id:"",name:""}

      this.agentArr.push(
      {id:1,name:"مدعي"},
      {id:2,name:"مدعي عليه"} ,
      {id:3,name:"إدخال  مكتب"} ,
      {id:4,name:"تدخل مكتب"} ,
      {id:5,name:"تحت الدراسة"}  
      )

      this.selectedAgent = {id:"",name:""}

      this.costArr.push(
        {id:1,name:"مطالبة بأجرة"} ,
        {id:2,name:"عين وقف"} ,
        {id:3,name:"تعويض"} ,
        {id:4,name:"إيصال مذايدة"} ,
        {id:5,name:"عربون "} ,
        {id:6,name:"بيع وقف "} ,
        {id:7,name:"أخري"} ,
        {id:8,name:"لا يوجد"} ,
        {id:9,name:"تحت الدراسة"}
       )

    this.selectedLawyersTeamArr = []   
    this.selectedCost = {id:"",name:""}
    this.selectedCustomer = {id:"",cust_name:""}
    this.selectedType = {id:"",name:""}
    this.selectedCaseStatus = {id:"",name:"",status_color:""}
    this.selectedCaseNagz = {id:"",name:""}
    this.selectedCategNagz = {id:"",name:""}
    this.ionicForm.reset() 
    this.isSubmitted = false 
  }

    get errorControl() {
      return this.ionicForm.controls;
    }

    validate(){ 
      this.isSubmitted = true; 
      console.log('validate' , this.isSubmitted , this.newCase.case_title)
      if (this.newCase.case_title == "") { 
        return false
      } else if(this.newCase.client_id == 0){
        return false
      } else if(this.newCase.case_type == ""){
        return false
      } else if(this.newCase.service_classification == ""){
        return false
      } else if(this.newCase.client_role == ""){
        return false
      } else {
        return true
      }  
    }


 getLawyers(){ 
        this.apiPortal.getUsersBySubiscriberId(this.USER_INFO.subiscriber_id).subscribe(data =>{
          console.log(data)
          let res = data
          this.usersArr = res['data']  
          this.prepareTeam() 
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



  presentPopoverAgent(e?: Event) {
    this.popoverِِAgent.event = e;
    console.log('preent me', e)
     this.showAgent = false 
    this.isOpenAgent = true;  
  }


  presentPopoverServ(e?: Event) {
    this.popoverِِِِServClass.event = e;
    console.log('preent me', e)
     this.showServ = false 
    this.isOpenServ = true;  
  }

  presentPopoverCost(e?: Event) {
    this.popoverِِِِCost.event = e;
    console.log('preent me', e)
    this.showCost = false
    this.isOpenCost = true;  
  }

  presentPopoverInvoice(e?: Event) {
    console.log('preent me', e)
    this.showInvoice = false
   this.popoverِِِِInvoice.event = e;
    this.isOpenInvoice = true;  
  }


  presentPopoverCourt(e?: Event) {
    console.log('preent me', e)
    this.showCourt = false
   this.popoverِِCourt.event = e;
    this.isOpenCourt = true;  
  }


  presentPopoverBranches(e?: Event) {
    console.log('preent me', e)
    this.showBranch = false
   this.popoverِBranch.event = e;
    this.isOpenBranch = true;  
  }

  didDissmisCourt( ) {
    this.isOpenCourt = false
    //console.log('dismissOver') 
  }

  didDissmisServ( ) {
    this.isOpenServ = false
    //console.log('dismissOver') 
  }

  didDissmisInvoice( ) {
    this.isOpenInvoice = false
    //console.log('dismissOver') 
  }

  didDissmisCost( ) {
    this.isOpenCost = false
    //console.log('dismissOver') 
  }

  didDissmisAgent( ) {
    this.isOpenAgent = false
    //console.log('dismissOver') 
  }


  selectFromPopServ(item){
    console.log(item )
     this.selectedServ = {
      id:item.id,
      name:item.name
    }   //console.log( this.selectedItem); 
    this.newCase.service_classification = item.name
      this.didDissmisServ()
      //perform calculate here so moataz can get the qty
    }

  selectFromPopCourt(item){
    console.log(item )
     this.selectedCourt = {
      id:item.id,
      name:item.court_name
    }   //console.log( this.selectedItem);
    this.newCase.court_name = item.court_name 
    this.newCase.court_id = item.id
      this.didDissmisCourt()
      //perform calculate here so moataz can get the qty
    }

    selectFromPopInvoice(item){
      console.log(item )
      this.newCase.billing_type = item.name
       this.selectedInvoice = {
        id:item.id,
        name:item.name
      }   //console.log( this.selectedItem); 
        this.didDissmisInvoice()
        //perform calculate here so moataz can get the qty
      }

    selectFromPopCost(item){
      console.log(item )
      this.newCase.claim_type = item.name
       this.selectedCost = {
        id:item.id,
        name:item.name
      }   //console.log( this.selectedItem); 
        this.didDissmisCost()
        //perform calculate here so moataz can get the qty
      }

    selectFromPopAgent(item){
      console.log(item )
       this.selectedAgent = {
        id:item.id,
        name:item.name
      }    
      this.newCase.opponent_representative=item.name
      this.didDissmisAgent()
       
      }

      getAppInfo(){ 

        this.languageService.getCurrentLocale().subscribe(locale => {
          this.locale = locale
          console.log('Current edit sision locale:', locale ,  this.locale); 
        });
        this.prepareCace() 
        this.getTopCustomers()
       
        this.getCourts() 
        this.getCaseStatus() 
      }

  didDissmisBranches( ) {

    this.isOpenBranch = false
    //console.log('dismissOver') 
  }

  selectFromPopBranch(item){
    console.log(item )
     this.selectedBranch = {
      id:item.id,
      name:item.name
    } 
     this.newCase.branch = item.name
      //console.log( this.selectedItem); 
      this.didDissmisBranches()
      //perform calculate here so moataz can get the qty
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

    selectFromPopCustTypes(item , index){
      console.log(item ,index)
      // push and pop
      this.selectedCustTye = {
        id:item.id,
        name:item.name
      } 
       
        //console.log( this.selectedItem); 
      //  this.didDissmisCustType()
        //perform calculate here so moataz can get the qty
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
            case_id :this.newCase.id ,
            full_name : this.usersArr[i].full_name 
          })
          }
        }else{
          this.usersArr[i].checked = false
          this.selectedLawyersTeamArr.splice(this.selectedLawyersTeamArr.indexOf(item),1)
        } 
        console.log(this.selectedLawyersTeamArr)
      }

      getTopCustomers(){ 
        this.api.getTopCustomers().subscribe(data =>{
          console.log(data)
          let res = data
          this.costumerArr = res['data']  
          let flt = this.costumerArr.filter(x=>x.id == this.newCase.client_id)
          console.log('flt custoer',flt)
          this.selectedCustomer = flt[0] 
        }, (err) => {} ,
        ()=>{ 
      }
      )  
     }


  presentPopover(e?: Event) {
    //console.log('preent me', e)
     this.popover.event = e;
     this.isOpen = true;
     this.clear()
     this.searchResult = this.costumerArr
     setTimeout(() => {
     this.setFocusOnInput('popInput')
     }, 2000);
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

     

     presentPopoverCaseNagz(e?: Event) {
      console.log('preent me', e)
         this.showCaseNagz = false
        this.popoverCaseNagze.event = e;
         this.isOpenCaseNagz = true;
       }

       newSession(){
        
       }

       presentPopoverCategNagz(e?: Event) {
        console.log('preent me', e)
           this.showCategNagz = false
          this.popoverCategNagze.event = e;
           this.isOpenCategNagz = true;
      }
  
  
  
  didDissmisNotif(){
    this.isOpenNotif = false
    //console.log('dismissOver') 
  }
  didDissmisCase(){
    this.isOpenCase = false
    //console.log('dismissOver') 
  }
  didDissmisCaseNagz(){
    this.isOpenCaseNagz = false
    //console.log('dismissOver')
  }
  didDissmisCategNagz(){
    this.isOpenCategNagz = false
    //console.log('dismissOver')
  }
  setFocusOnInput(Input) {
    //console.log('setFocusOnInput')
    // if (Input == 'dst') { 
    //   this.nameField.nativeElement.focus(); 
    //  } else if(Input == 'dstPop') {
    //   this.dstPop.setFocus();
    //   this.isOpen = true;
    //   this.clear()
    //   this.searchResult = this.items
    //   setTimeout(() => {
    //       this.popInput.setFocus(); 
    //   }, 1500);
    
    //  }else if(Input == 'qtyId') {
    //   this.qtyId.setFocus();  
    //  }else
    if(Input == 'popInput'){
     this.popInput.setFocus();  
    }
  }

  selectFromPop(item){
    //console.log(item)
    this.selectedCustomer = {
      id:item.id,
      cust_name:item.cust_name
    }
     this.newCase.client_id = item.id
     this.searchTerm = item.item_name
      //console.log( this.selectedItem); 
      this.didDissmis()
      //perform calculate here so moataz can get the qty
  }

    
    selectFromPopTypes(item    ){
       
      // Push to arr
      // remove fro Array where index = item.
      
      this.selectedType = {
        id:item.id,
        name:item.name
      } 
       this.newCase.case_type = item.name
        //console.log( this.selectedItem); 
         this.didDissmisNotif()
        //perform calculate here so moataz can get the qty
      }



      selectFromPopCase(item){
        console.log(item)
        this.newCase.case_status = item.id
        this.selectedCaseStatus = {
          id:item.id,
          name:item.status_name,
          status_color:item.status_color
        }  
          this.didDissmisCase() 
      }

        selectFromPopCaseNagz(item){
          console.log(item)
          this.selectedCaseNagz = {
            id:item.id,
            name:item.name
          }  
            this.didDissmisCaseNagz()   
          }

          selectFromPopCategNagz(item){
            this.newCase.case_classification_najz = item.name
            console.log(item)
            this.selectedCategNagz = {
              id:item.id,
              name:item.name
            }  
              this.didDissmisCategNagz()   
          }
          getSessionsByCaseId() {
            this.loading = true 
            this.api.getSessionsByCaseId(this.newCase.id).subscribe(data =>{
              console.log(data)
              let res = data 
              if(res['message'] != 'No Sessions Found'){
                this.sessionsArray = res['data']
              }else{
                this.showEmpty = true
              } 
             
            }, (err) => {
              this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
            } ,
            ()=>{ 
              this.loading = false
          }
          )  
         }  

          segmentCHange(event){
            console.log(event.detail.value)
            this.segVal = event.detail.value
            if(this.segVal == 'sessions'){
              if(this.newCase.id){ 
                this.getSessionsByCaseId() 
              }else{
                this.showEmpty = true
              }
            } 
          }

          newSessionPage(){
            if(this.newCase.id != null){ 
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  team: JSON.stringify(this.selectedLawyersTeamArr) ,
                  case: JSON.stringify(this.newCase) 
                }
              }; 
              this.rout.navigate(['/new-session'] , navigationExtras)
            }else{
             this.presentToast('الرجاء حفظ البيانات الأساسية أولاً' ,"danger" ) 
            } 
           }

            saveNagz(){
              console.log("save basics")
              this.segVal = 'nagz'
            }
}
