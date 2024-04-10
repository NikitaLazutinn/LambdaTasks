  Array.prototype.forEach = function <T>(this: T[], callback: (value: T, index: number, array: T[]) => void) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };


Array.prototype.push = function <T>(this: T[], value: T): number {
  this[this.length] = value; 
  return this.length; 
};

// Array.prototype.customFilter = function <T>(this: T[][], callback: (value: T[][], index: number, array: T[]) => boolean): T[][] {
//   const filteredArray: T[][] = [];
//   for (let i = 0; i < this.length; i++) {
//     if (callback(this, i, this[i])) {
//       filteredArray.push(this[i]);
//     }
//   }
//   return filteredArray;
// };

Array.prototype.customFilter = function <T>(this: T[], callback: (value: T, index: number, array: T[]) => boolean): T[] {
  const filteredArray: T[] = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      filteredArray.push(this[i]);
    }
  }
  return filteredArray;
};

Array.prototype.reverse = function <T>(this: T[]): T[] {
  const reversedArray: T[] = [];
  for (let i = this.length - 1; i >= 0; i--) {
    reversedArray.push(this[i]);
  }
  return reversedArray;
};


interface AssociateOptions {
  keys: (string | keyof object)[];
}

interface Array<T> {
    reverse(): T[];
    customFilter(callback: (value: T, index: number, array: T[]) => boolean): T[];
    forEach(callback: (value: T, index: number, array: T[]) => void): void;
    push(value: T): number;
    multiply(this: Array<number>, multiplier?: number): Array<number>;
    associateBy(this: Array<object>, options: string[]): (Result | string[])[];
    all(this: Array<T>, func: (v: T) => void): boolean;
    any(this: Array<T>, func: (v: T) => void): boolean;
    average(this: Array<number>): number;
    chunked(this: Array<T>, size: number): Array<Array<T>>;
    distinctBy(this: Array<T>, func?: (v: T) => void): Array<T>;
    filter1(this: Array<T>, func: (v: T) => boolean): Array<T>;
    filterIndexed(this: Array<number>, func: (v: T, u: T) => boolean): Array<number>;
    filterNot(this: Array<T>, func: (v: T) => boolean): Array<T>;
    find1(this: Array<T>, func: (v: T) => boolean): T;
    findLast(this: Array<T>, func: (v: T) => boolean): T;
    fold(this: Array<T>, acc: T, func: (acc: T, elemrnt: T) => void): T;
    maxBy(this: Array<T>, func: (v: T) => void): T;
    minBy(this: Array<T>, func: (v: T) => void): T;
    count(this: Array<T>, key?: string): number;
    groupBy(this: Array<string>): Array<Array<string>>;
    groupBy_Key(this: Array<T>, func: (v: T) => string, key:string): { [key: string]: string[] };
    flatten(this: Array<T>, count?: number): string[];
  }
  

  type Result = {
    value: string;
    element: object;
  };


  interface MyObject {
    [key: string]: string; 
}
  
Array.prototype.associateBy = function(this: MyObject[], options: string[]): (Result | string[])[] {
    if (options.length === 0) {
      throw new Error('At least one key must be provided.');
    }

    if(options.length > 1){
       let Arr:string[][] = [];
       let resultArr:string[][] = [];
       let values: string[] = [];
       for(let i = 0; i < this.length; i++){
        for(let r = 0; r < options.length; r++){
          values[r] = this[i][options[r]];

        }
        Arr.push(values);
        values = [];
       }


       resultArr.push(Arr[Arr.length-1]);

      let br = 0;
      let b = 0;
      for(let r = Arr.length - 2; r >= 0; r--){

        for(let i = 0; i < Arr[r].length; i++){
          if(!Arr[r][i]){
            b = 1;
            break;
        }
        }
        if(b){
          b = 0;
          continue;
        }

        const value = Arr[r][0];

        for(let i = 0; i < resultArr.length; i++){

          if(value === resultArr[i][0]){
            br = 1;
            break;
          }

      }

    if(br){
      br = 0;
    }else{
    resultArr.push(Arr[r]);
    }
    }

       for(let i = 0; i < resultArr[0].length; i++){
          if(!resultArr[0][i] && resultArr.length == 1){
            throw new Error('Unexisting key!');
          }else if(!resultArr[0][i] && resultArr.length > 1){
            let newtArr:string[][] = [];
            for(let r = 0; r < resultArr.length - 1; r++){
              newtArr[r] = resultArr[r+1];
            }
            return newtArr;
          }
       }
       return resultArr;
    }else{
    const Array: Array<Result> = [];
    let Values: Array<string> = [];

    this.forEach((element) => {
      const key = options[0] as keyof typeof element;
      const value = element[key];
      Values.push(value);
      const el = {value, element}; 
      Array.push(el);
    });

     for(let i = 0; i < Values.length; i++){
      if(Values[i]){
        break;
      }
      if(i == Values.length - 1){
        throw new Error('Wrong key!');
      }
     }

    let resultArr: Array<Result> = [];
    resultArr.push(Array[Array.length-1]);

    for(let r = Array.length - 2; r >= 0; r--){
      const value = Array[r]["value"];

      for(let i = 0; i < resultArr.length; i++){
        if(!value || value === resultArr[i]["value"]){
          break;
        }else if(i === resultArr.length-1){
          resultArr.push(Array[r]);
        }
        
      }
    }

    
      if(!resultArr[0]['value'] && resultArr.length == 1){
        throw new Error('Unexisting key!');
      }else if(!resultArr[0]['value'] && resultArr.length > 1){
        let newtArr:Array<Result> = [];
        for(let r = 0; r < resultArr.length - 1; r++){
          newtArr[r] = resultArr[r+1];
        }
        return newtArr;
      }
   
  
    return resultArr;
  }
  };
  

  Array.prototype.multiply = function (multiplier = 10) {
    const resArray:number[] = [];
    this.forEach((element) => {
      resArray.push(element * multiplier);
    });
    return resArray;
  };
  
  Array.prototype.average = function () {
    let sum = 0;
    this.forEach((value) => (sum += value));
    return sum / this.length;
  };
  
  Array.prototype.all = function <T>(func: (f:T) => T) {
    let isAll = true;
    this.forEach((element) => {
    let res = func(element);
      if (!res) isAll = false;
    });
    return isAll;
  };
  
  Array.prototype.any = function <T>(func: (f:T) => T) {
    let isAny = false;
    this.forEach((element) => {
      if (func(element)) isAny = true;
    });
    return isAny;
  };
  
  Array.prototype.chunked = function (size) {
    if(!Number.isInteger(size)){
      console.log("Only integers!") 
      return[];
    }
    if(size < 1){
      console.log("Minimum size is 1 !") 
      return[];
    }
    const resultArray = [];
    let stepArray:number[] = [];
    this.forEach((element) => {
      if (stepArray.length === size) {
        resultArray.push(stepArray);
        stepArray = [];
      }
      stepArray.push(element);
    });
    resultArray.push(stepArray);
    return resultArray;
  };
  
  Array.prototype.distinctBy = function <T>(func: (f:T) => T) {
    if (!func) {
      return Array.from(new Set(this));
    } else {
      const resultArray:T[] = [];
      this.forEach((element) => {
       if(!func(element)){
        resultArray.push(element);
       }
      });
      
      return Array.from(new Set(resultArray));
    }
  };
  
  Array.prototype.filter1 = function <T>(func: (f:T) => T) {
    const resultArray:T[] = [];
    this.forEach((element) => {
      if (func(element)) resultArray.push(element);
    });
    return resultArray;
  };
  
  Array.prototype.filterIndexed = function (func) {
    const resultArray = [];
    for (let index = 0; index < this.length; index++) {
      if (func(index, this[index])) {
        resultArray.push(this[index]);
      }
    }
    return resultArray;
  };
  
  Array.prototype.filterNot = function <T>(func: (f:T) => T) {
    const resultArr:T[] = [];
    this.forEach((element) => {
      if (!func(element)) resultArr.push(element);
    });
    return resultArr;
  };
  
  Array.prototype.find1 = function (func) {
    for (let index = 0; index < this.length; index++) {
      if (func(this[index])) return this[index];
    }
    return null;
  };
  
  Array.prototype.findLast = function (func) {
    const reversed = this.reverse();
    for (let index = 0; index < reversed.length; index++) {
      if (func(reversed[index])){ 
        return reversed[index];
      }
    }
    return null;
  };
  
  Array.prototype.fold = function (initial, func) {

    for(let i = 0; i < this.length; i++){
      this[i] = func(initial, this[i]);
    }

    return this;
  };
  
  Array.prototype.maxBy = function (func) {
    let maxEl = this[0];
    if(!maxEl){
      console.log("no empty array!");
    }
    this.forEach((element) => {
      if (func(element) > func(maxEl)) maxEl = element;
    });
    return maxEl;
  };
  
  Array.prototype.minBy = function (func) {
    let minEl = this[0];
    if(!minEl){
      console.log("no empty array!");
    }
    this.forEach((element) => {
      if (func(element) < func(minEl)) minEl = element;
    });
    return minEl;
  };
  
  Array.prototype.count = function (key) {
    if (!key) {
      console.log("error");
      return 0;
    } else {
      let sum = 0;
      let b = 0;
      this.forEach((element) => {
        if (typeof element === 'object' && Object.keys(element).includes(key) && typeof element[key] === 'number') {
            if (!isNaN(Number(element[key]))) sum += Number(element[key]);
        }else{
          b = 1;
        }
      });
      // if(b){
      // console.log("error");
      // return 0;
      // }
      return sum;
    }
  };
  
  Array.prototype.groupBy = function () {
    
    let result: Array<Array<string>> = [];
    let temporary: Array<string> = [];
    let length = 0;
    let lengths = [];
    let b = 0;

    for(let i = 0; i < this.length; i++){
      for(let l = 0; l < lengths.length; l++){
        if(this[i].length == lengths[l]){
          b = 1;
          break;
        }
      }
      if(b){
        b = 0;
        continue;
      }

        length = this[i].length;
        lengths.push(length);
        for(let r = 0; r < this.length; r++){
          if(this[r].length == length){
            temporary.push(this[r]);
          }
        }
        result.push(temporary);
        temporary = [];
      

    }
  

      
    return result;
  };

  Array.prototype.groupBy_Key = function (func, key) {
    const resultObject: { [key: string]: string[] } = {};
  
    this.forEach((element) => {
      const result = func(element);
      if (!Object.keys(resultObject).includes(String(result))) {
        resultObject[result] = [element[key]];
      } else {
        resultObject[result].push(element[key]);
      }
    });
    return resultObject;
  };


  Array.prototype.flatten = function(){
    
  let isIterable = (object:any) =>
    object != null && typeof object[Symbol.iterator] === "function";
    if(typeof this[0] === "string"){
      isIterable = (object:any) =>
      object != null && (object[0].length > 1);
       
    }

  let resArr :any = this;


    while (resArr.customFilter((el: any) => isIterable(el)).length !== 0) {
      let stepArr = [];
      for(let i = 0; i < resArr.length; i++){
      //console.log(resArr[i]);


        if(isIterable(resArr[i])) {
            for(let r = 0; r < resArr[i].length; r++){
            stepArr.push(resArr[i][r]);
            }
        }else {
          stepArr.push(resArr[i])
        }

    }
      resArr = stepArr;
    }
  
  return resArr;
};
  
  
  // Usage examples
//   console.log("multiply (Multiply all elements by parameter)");
//   console.log([1, 2, 3, 4, 5].multiply(2));
//   console.log("average (Returns an average value of elements in the sequence)");
//   console.log([2, 3, 4, 7, 9].average());
//  console.log("all (Returns true if all elements match the given function.)");
//  console.log([1, 2, 3, 4, 5].all((value) => value > 3));
//   console.log("any (Checks if at least 1 elemeent satisfy condition)");
//   console.log([1, 2, 3, 4, 5].any((value) => value > 3));
//   console.log("chunked (Splits this sequence into a sequence of lists each not exceeding the given size)");
//  console.log([1, 2, "f", "d"].chunked(0));
//   console.log("distinctBy (Returns a sequence containing only elements from the given sequence having distinct keys returned by the given selector function)");
//   console.log([2, 3, 2, 5, 7].distinctBy((value:any) => value > 3));
//   console.log("filter1 (Returns a sequence containing only elements matching the given predicate)");
//   console.log([2, 2, 3, 4, 6].filter1((el) => el % 2 === 0));
//   console.log("filterIndexed (Returns a sequence of elements which value = index)");
//   console.log([0,1,4,1,2,3,4,5].filterIndexed((index, element) => index === element));
//    console.log("filterNot (Returns a sequence containing only elements not matching the given predicate)");
//    console.log([1, 2, 3, 4, 5].filterNot((el) => el % 3 === 0));
//   console.log("find1 (find first element that satisfy condition)");
//   console.log([1, 2, 3, 4, 5].find1((el) => el % 2 === 0));
//   console.log("findLast (find last element that satisfy condition)");
//    console.log(["ff", "dd", "ss", "aa", "r"].findLast((el) => el.length === 2));
//   console.log("fold (Accumulates value starting with initial value and applying operation from left to right to current accumulator value and each element.)");
  //  console.log(["apple", "apricot", "banana", "blueberry", "cherry", "coconut"].fold("", (initial:string, element:string) => {if(element.length % 2 == 0){
  //   return initial + element;
  //   }else{ return initial}}));

//   console.log("maxBy (Returns the first element yielding the largest value of the given function)");
//   console.log([].maxBy((element:number) => element * -2));
//   console.log("minBy (Returns the first element yielding the smallest value of the given function)");
//   console.log([1, 2, 3, 4, 5].minBy((element:number) => element * 4));
//   console.log("flatten (Returns a sequence of all elements from all sequences in this sequence)");
   // console.log(["1, 2" ,["3, 4,", ["5, 6,", ["3 4"],["7, 8,", ["9, 10"]]]]].flatten());
 //  console.log(["dddd", "dsds", "m", ["dddd", ["mmmmmm"], "rr", ["fdfdf", "dsff",["d", "m"]]]].flatten());


  // const array = [
  //   { firstname: "Grace", lastname: "Hopper", population: 2},
  //   { firstname: "Jacob", lastname: "Bernoulli", population: 2 },   
  //   { firstname: "Jeb", lastname: "Bernoulli", population: 3 },
    
  // ];

  // const array = [
  //   { firstname: "Grace", lastname: "Hopper"},
  //   { firstname: "Jacob", lastname: "Bernoulli"},
  //   { firstname: "Johann", lastname: "Bernoulli"},
  // ];

  // console.log("associateBy (Returns array of values according to key");
   // console.log(array.associateBy(["firstname", "lastname", "population"]));
  
//   const objects1 = [
//     { name: 'Anna', population: 1 },
//     { name: 'Bill', population: 2 },
//     { name: 'Joe', population: 2.5 },
//     { name: 'Joe'}
//   ];
//   // console.log("count (count object values)");
//    console.log(objects1.count('population'));
  
  //const groupbytest1 = ["a", "abc","d", "d", "d", "s", "", "ab", "def", "abcd"];
//   console.log("groupBy1 (group by length)");
   //console.log(groupbytest1.groupBy());
  
  
//   const objects2 = [
//     { name: 'Anna', Work: 'Football'},
//     { name: 'Bill', Work: 'Football'},
//     { name: 'Joe', Work: 'Sciense'},
//   ];
//   console.log("groupBy2");
  // console.log(objects2.groupBy_Key((el:{name:string, Work: string}) => el.Work, "name"));
  