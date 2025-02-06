interface Istudent{
    name:string;
    age:number;
    getStudentInfo():string;
}


export class student implements Istudent{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name=name;
        this.age=age;
    }

    getStudentInfo():string{
        return `Name:${this.name} Age:${this.age}`;
    }
}