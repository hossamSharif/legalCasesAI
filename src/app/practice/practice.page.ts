import { Component, OnInit } from '@angular/core';
import { student } from './student';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  standalone: false,
})
export class PracticePage implements OnInit {
  student :student
   arr : Array<any> = [1,12,23,4,5,6,7,8,9,10]

    products : Array<any> = [
    { name: "Product A", price: 10 },
    { name: "Product B", price: 20 },
    { name: "Product C", price: 15 }
  ];

  constructor() {
     this.student.getStudentInfo() 
     let pushArr = this.arr.push(999)
     console.log('pushArr' , pushArr) 
     let unfhishArr = this.arr.unshift('hdhd') 
     console.log('unfhishArr' , unfhishArr) 
     let popArr = this.arr.pop() 
     console.log('popArr' , popArr) 
     let shiftArr = this.arr.shift() 
     console.log('shiftArr' , shiftArr)
     let spliceArr = this.arr.splice(2,2)
     console.log('spliceArr' , spliceArr) 
     let sliceArr = this.arr.slice(2,4)
     console.log('sliceArr' , sliceArr)
     let concatArr = this.arr.concat(1,2,3,4,5,6,7,8,9,10)
     console.log('concatArr' , concatArr)
     let joinArr = this.arr.join('')
     console.log('joinArr' , joinArr)
     let reverseArr = this.arr.reverse()
     console.log('reverseArr' , reverseArr)
     let sortArr = this.arr.sort()
     console.log('sortArr' , sortArr)
     let indexOfArr = this.arr.indexOf(1)
     console.log('indexOfArr' , indexOfArr)
     let lastIndexOfArr = this.arr.lastIndexOf(1)
     console.log('lastIndexOfArr' , lastIndexOfArr)
     let includesArr = this.arr.includes(1)
     console.log('includesArr' , includesArr)
     let fillArr = this.arr.fill(1)
     console.log('fillArr' , fillArr)

   
    let sor2tArr =  this.products.sort((a,b)=> a.price - b.price)
     console.log('sort',sor2tArr)

     let filterArr = this.products.filter(product => product.price > 15)
     console.log('filterArr' , filterArr)

     let mapArr = this.products.map(product => product.price)
     console.log('mapArr' , mapArr)

     let reduceArr = this.products.reduce((total,product) => total + product.price,0)
     console.log('reduceArr' , reduceArr)

     let everyArr = this.products.every(product => product.price > 15)  
     console.log('everyArr' , everyArr)

     let someArr = this.products.some(product => product.price > 15)
      console.log('someArr' , someArr)

      let findArr = this.products.find(product => product.price > 15)
      console.log('findArr' , findArr)

      let findIndexArr = this.products.findIndex(product => product.price > 15)
      console.log('findIndexArr' , findIndexArr)
      let forEachArr = this.products.forEach(product => console.log(product.name))  
    
     }

  ngOnInit() {

    this.fetch().then(data => {
      console.log(data)

    }).catch(error=>{
      console.log(error)
    })
  }



async fetch(){
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
}


}
