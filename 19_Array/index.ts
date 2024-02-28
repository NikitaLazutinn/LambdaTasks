interface Array<T> {
  multiply(this: Array<number>, multiplier?: number): Array<number>;
  all(this: Array<T>, func: (v: T) => boolean): boolean;
  any(this: Array<T>, func: (v: T) => boolean): boolean;
  average(this: Array<number>): number;
  chunked(this: Array<T>, size: number): Array<Array<T>>;
  distinctBy(this: Array<T>, func?: Function): Array<Object>;
  filter1(this: Array<T>, func: (v: T) => boolean): Array<T>;
  filterIndexed(this: Array<T>, func: (v: T, u: T) => boolean): Array<T>;
  filterNot(this: Array<T>, func: (v: T) => boolean): Array<T>;
  find1(this: Array<T>, func: (v: T) => boolean): T;
  findLast(this: Array<T>, func: (v: T) => boolean): T;
  fold(this: Array<T>, initial: any, func: Function): any;
  maxBy(this: Array<T>, func: Function): T;
  minBy(this: Array<T>, func: Function): T;
  count(this: Array<T>, key?: string): number;
  groupByKey(this: Array<T>, func: Function): { [key: string]: T[] };
}

console.log("multiply");
Array.prototype.multiply = function (multiplier = 10) {
  const resArray: Array<number> = [];
  this.forEach((element) => {
    resArray.push(element * multiplier);
  });
  return resArray;
};
console.log([1, 2, 3, 4, 5].multiply(2));

console.log("average");
Array.prototype.average = function (): number {
  let sum = 0;
  this.map((value) => (sum += value));
  return sum / this.length;
};
console.log([1, 2, 3, 4, 5].average());

console.log("all");
Array.prototype.all = function <T>(func: (v: T) => boolean): boolean {
  let isAll = true;
  this.forEach((element: T) => {
    if (!func(element)) isAll = false;
  });
  return isAll;
};
console.log(
  [1, 2, 3, 4, 5].all((value: number) => {
    return value > 3;
  })
);

console.log("any");
Array.prototype.any = function <T>(func: (v: T) => boolean): boolean {
  let isAny = false;
  this.forEach((element: T) => {
    if (func(element)) isAny = true;
  });
  return isAny;
};
console.log(
  [1, 2, 3, 4, 5].any((value: number) => {
    return value > 3;
  })
);

console.log("chunked");
Array.prototype.chunked = function <T>(size: number) {
  const resultArray: Array<T[]> = [];
  let stepArray: Array<T> = [];
  this.forEach((element: T) => {
    if (stepArray.length === size) {
      resultArray.push(stepArray);
      stepArray = [];
    }
    stepArray.push(element);
  })
  resultArray.push(stepArray);
  return resultArray;
};

let words = "one two three four five six seven eight nine ten".split(" ");
console.log(words.chunked(3));

console.log("distinct");
Array.prototype.distinctBy = function <T>(func?: Function) {
  if (!func) {
    return Array.from(new Set(this));
  } else {
    const resultArray: Array<T> = [];
    this.forEach((element: T) => resultArray.push(func(element)));
    return Array.from(new Set(resultArray));
  }
};
let arr = ["a", "A", "b", "B", "A", "a"];
console.log(arr.distinctBy());
console.log(arr.distinctBy((el: string) => el.toLowerCase()));


console.log("filter");
Array.prototype.filter1 = function <T>(func: (v: T) => boolean) {
  const resultArray: Array<T> = [];
  this.forEach((element: T) => {
    if (func(element)) resultArray.push(element);
  });
  return resultArray;
};

let testFilter = [1, 2, 3, 4, 5, 6, 7];
console.log(
  testFilter.filter1((el: number) => {
    return el % 2 === 0;
  })
);

console.log("filterIndexed");
Array.prototype.filterIndexed = function <T>(func: (v: number, u: T) => boolean) {
  const resultArray: Array<T> = [];
  for (let index = 0; index < this.length; index++) {
    if (func(index, this[index])) {
      resultArray.push(this[index]);
    }
  }
  return resultArray;
};

let testFilterIndexed = [0, 1, 2, 3, 4, 8, 6];
console.log(
  testFilterIndexed.filterIndexed((index: number, element: any) => {
    return index === element;
  })
);

console.log("filterNot");
Array.prototype.filterNot = function <T>(func: (v: T) => boolean) {
  const resultArr: Array<T> = [];
  this.map((element: T) => {
    if (!func(element)) resultArr.push(element);
  });
  return resultArr;
};

console.log(
  testFilter.filterNot((el: number) => {
    return el % 3 === 0;
  })
);

console.log("find");
Array.prototype.find1 = function <T>(func: (v: T) => boolean) {
  for (let index = 0; index < this.length; index++) {
    if (func(this[index])) return index;
  }
  return null;
};

let testFind = [1, 2, 3, 4, 5, 6, 7];
console.log(
  testFind.find1((el: number) => {
    return el % 2 !== 0;
  })
);

console.log("findLast");
Array.prototype.findLast = function (func: (v: number) => boolean) {
  const reversed = this.reverse();
  return this.length - reversed.find1(func) - 1;
};

console.log(
  testFind.findLast((el: number) => {
    return el % 2 === 0;
  })
);

console.log("fold");
Array.prototype.fold = function (initial: any, func: Function) {
  this.forEach((element: any) => {
    initial = func(initial, element);
  });
  return initial;
};

console.log(
  [1, 2, 3, 4, 5].fold(
    1,
    (initial: number, element: number) => initial * element
  )
);

console.log("maxBy");
Array.prototype.maxBy = function (func: Function) {
  let maxEl = this[0];
  this.forEach((element: any) => {
    if (func(element) > func(maxEl)) maxEl = element;
  });
  return maxEl;
};
console.log(testFind.maxBy((element: number) => element < 4));


console.log("minBy");
Array.prototype.minBy = function (func: Function) {
  let minEl = this[0];
  this.forEach((element: any) => {
    if (func(element) < func(minEl)) minEl = element;
  });
  return minEl;
};
console.log(testFind.minBy((element: number) => element * 4));

console.log("count");
Array.prototype.count = function (key?: string): number {
  if (!key) {
    return this.length;
  } else {
    let sum = 0;
    this.forEach(element => {
      if (typeof element === "object") {
        if (Object.keys(element).includes(key)) {
          if (!isNaN(Number(element[key]))) sum += Number(element[key]);
        }
      }
    })
    return sum;
  }
};

let objects = [
  {
    name: "Anna",
    number: 3,
  },
  {
    name: "Bill",
    number: 5,
  },
  {
    name: "Joe",
    number: 2,
  },
];

console.log(objects.count("number"));

console.log("groupByKey");
Array.prototype.groupByKey = function<T>(func: Function) {
  let resultObject: { [key: string]: T[] } = {};

  this.forEach((element: T) => {
    const result = func(element);
    if (!Object.keys(resultObject).includes(String(result))) {
      resultObject[result] = [element];
    } else {
      resultObject[result].push(element);
    }
  })
  return resultObject;
};

let groupbytest = ["a", "abc", "ab", "def", "abcd"];
console.log(groupbytest.groupByKey((el: any) => el.length));

let object = [
  {
    name: "Anna",
    Work: "Football",
  },
  {
    name: "Bill",
    Work: "Football",
  },
  {
    name: "Joe",
    Work: "Sciense",
  },
];

console.log(object.groupByKey((el: any) => el.Work));
