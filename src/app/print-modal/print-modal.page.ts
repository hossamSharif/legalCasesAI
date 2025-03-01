import { Component, OnInit,Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-print-modal',
  templateUrl: './print-modal.page.html',
  styleUrls: ['./print-modal.page.scss'],
  standalone:false
})
export class PrintModalPage implements OnInit {
  @Input() printArr: any;

  @Input() page: any;
   mode = 'pos' 
   qrcodedata :any

   qrCodeDataUrl :any
   canvas :any 

  constructor(private modalController: ModalController,private toast :ToastController) {
    this.qrcodedata = "ARhBTCBBQkVFUiBNRURJQ0FMIENPTVBBTlkCDzMwMDIzMTM1ODUwMDAwMwMUMjAyNC0wNi0yOFQwMDozNjo0OFoEBjMzOC4xMAUFNDQuMTA="
    this.mode = 'pos' 
   
   }

  ngOnInit() {
    console.log(this.printArr[0]);
  }


  ionViewDidEnter(){
  //console.log('printing process')
  this.canvas = document.querySelector('.qrcode canvas') as HTMLCanvasElement;
  this.Print('printarea1')
  }

prepareQr(){

    this.canvas = document.querySelector('.qrcode canvas') as HTMLCanvasElement;
 
      if (this.canvas) {
      // Convert canvas to data URL
        this.qrCodeDataUrl = this.canvas.toDataURL('image/png') ; 
      // Include the QR code image in the print output
     // mywindow.document.write(`<img src="${qrCodeDataUrl}" alt="QR Code" />`);
  } else {
      console.error("QR code canvas not found. Make sure you have a canvas element inside the 'qrcode' div.");
  }

}

 Print(elem){  
  // const canvas = document.querySelector('.qrcode canvas') as HTMLCanvasElement;
 
  const qrCodeDataUrl = this.canvas.toDataURL('image/png') ;
   if (this.canvas) {
    //console.log('here we are')
    var mywindow = window.open('', 'PRINT', 'height=400,width=600'); 
    mywindow.document.write('<html><head>'); 
    mywindow.document.write('<style type="text/css">')
    mywindow.document.write('@media print {  body { margin: 0;  padding: 0; background-color: #fff; } .receipt-container { width: 80mm; /* Adjust as needed for your receipt paper size */ height: auto; /* Height will adjust to content */ }}  .receipt-container { max-width: 400px; margin: auto;  background-color: #fff; padding: 20px; border: 1px solid #ddd;  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);} .flr{ display: block; float: right; } .show{ } .hide{width:0px;height:0px} .w45 {width:45%} .w35 {width:35%} .w50 {width:50%} .w100 {width:100%} .bnone {border: 1px solid #000000;} .td,.th  {padding: 4px;} .hd {background-color: #b9b8b8;} .table{text-align: center;width: 100%; margin: 12px;} .ion-margin{ margin: 10px; } .ion-margin-top{ margin-top: 10px; } .rtl {  direction: rtl; } .ion-text-center{ text-align: center; } .ion-text-end{ text-align: left; } .ion-text-start{ text-align: right; } .td2{border-top-style: solid;border-top-width: 1px;border-top-color: gray}')
    mywindow.document.write('</style></head><body>'); 
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write(`<div *ngIf="printArr"  style="display : block ; margin-left: auto ;margin-right: auto ;width : 100px ;"> 
    <img src="${qrCodeDataUrl}" style = "width : 150px ; height:150px ;" alt="QR Code" /></div>`);
    mywindow.document.write(document.getElementById('printfooter').innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/ 

        setTimeout(() => {
        mywindow.print();
         mywindow.window.close();
         this.modalController.dismiss() 
        }, 50);    
    } else {
      console.error("QR code canvas not found. Make sure you have a canvas element inside the 'qrcode' div.");
    }

 
}



}

