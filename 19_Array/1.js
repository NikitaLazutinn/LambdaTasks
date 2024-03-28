Array.prototype.multiply = function (multiplier = 10) {
    const resArray = [];
    this.forEach((element) => {
      resArray.push(element * multiplier);
    });
    return resArray;
  };

  Array.prototype.associateBy = function (key) {
    const resultArray = [];
      this.forEach((element) => {
        result = element[key];
        resultArray.push(result);
      });
      return resultArray;
    
  }
  
  Array.prototype.average = function () {
    let sum = 0;
    this.forEach((value) => (sum += value));
    return sum / this.length;
  };
  
  Array.prototype.all = function (func) {
    let isAll = true;
    this.forEach((element) => {
      if (!func(element)) isAll = false;
    });
    return isAll;
  };
  
  Array.prototype.any = function (func) {
    let isAny = false;
    this.forEach((element) => {
      if (func(element)) isAny = true;
    });
    return isAny;
  };
  
  Array.prototype.chunked = function (size) {
    const resultArray = [];
    let stepArray = [];
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
  
  Array.prototype.distinctBy = function (func) {
    if (!func) {
      return Array.from(new Set(this));
    } else {
      const resultArray = [];
      this.forEach((element) => resultArray.push(func(element)));
      return Array.from(new Set(resultArray));
    }
  };
  
  Array.prototype.filter1 = function (func) {
    const resultArray = [];
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
  
  Array.prototype.filterNot = function (func) {
    const resultArr = [];
    this.forEach((element) => {
      if (!func(element)) resultArr.push(element);
    });
    return resultArr;
  };
  
  Array.prototype.find1 = function (func) {
    for (let index = 0; index < this.length; index++) {
      if (func(this[index])) return index;
    }
    return null;
  };
  
  Array.prototype.findLast = function (func) {
    const reversed = this.slice().reverse();
    return this.length - reversed.findIndex(func) - 1;
  };
  
  Array.prototype.fold = function (initial, func) {
    this.forEach((element) => {
      initial = func(initial, element);
    });
    return initial;
  };
  
  Array.prototype.maxBy = function (func) {
    let maxEl = this[0];
    this.forEach((element) => {
      if (func(element) > func(maxEl)) maxEl = element;
    });
    return maxEl;
  };
  
  Array.prototype.minBy = function (func) {
    let minEl = this[0];
    this.forEach((element) => {
      if (func(element) < func(minEl)) minEl = element;
    });
    return minEl;
  };
  
  Array.prototype.count = function (key) {
    if (!key) {
      return this.length;
    } else {
      let sum = 0;
      this.forEach((element) => {
        if (typeof element === 'object') {
          if (Object.keys(element).includes(key)) {
            if (!isNaN(Number(element[key]))) sum += Number(element[key]);
          }
        }
      });
      return sum;
    }
  };
  
  Array.prototype.groupByKey = function (func) {
    const resultObject = {};
  
    this.forEach((element) => {
      const result = func(element);
      if (!Object.keys(resultObject).includes(String(result))) {
        resultObject[result] = [element];
      } else {
        resultObject[result].push(element);
      }
    });
    return resultObject;
  };

  Array.prototype.flatten = function (count = 0) {
    const isIterable = (object) =>
      object != null && typeof object[Symbol.iterator] === "function";
    let resArr = this;
    if (count !== 0) {
      for (let i = 0; i < count; i++) {
        const stepArr = [];
        resArr.forEach(element => {
          if(isIterable(element)) {
            element.forEach((newElement) => {
              stepArr.push(newElement)
            });
          }else {
            stepArr.push(element)
          }
        });
        resArr = stepArr;
      }
    } else {
      while (resArr.filter((el) => isIterable(el)).length !== 0) {
        const stepArr = [];
        resArr.forEach(element => {
          if(isIterable(element)) {
            element.forEach((newElement) => {
              stepArr.push(newElement)
            });
          }else {
            stepArr.push(element)
          }
        });
        resArr = stepArr;
      }
    }
    return resArr;
  };
  
  
  // Usage examples
  console.log("multiply (Multiply all elements by parameter)");
  console.log([1, 2, 3, 4, 5].multiply(2));
  console.log("average (Returns an average value of elements in the sequence)");
  console.log([1, 2, 3, 4, 5].average());
  console.log("all (Returns true if all elements match the given function.)");
  console.log([1, 2, 3, 4, 5].all((value) => value > 3));
  console.log("any (Checks if at least 1 elemeent satisfy condition)");
  console.log([1, 2, 3, 4, 5].any((value) => value > 3));
  console.log("chunked (Splits this sequence into a sequence of lists each not exceeding the given size)");
  console.log([1, 2, 3, 4, 5].chunked(2));
  console.log("distinctBy (Returns a sequence containing only elements from the given sequence having distinct keys returned by the given selector function)");
  console.log([1, 2, 3, 4, 5].distinctBy((value) => value > 3));
  console.log("filter1 (Returns a sequence containing only elements matching the given predicate)");
  console.log([1, 2, 3, 4, 5].filter1((el) => el % 2 === 0));
  console.log("filterIndexed (Returns a sequence of elements which value = index)");
  console.log([0, 2, 2, 4, 5].filterIndexed((index, element) => index === element));
  console.log("filterNot (Returns a sequence containing only elements not matching the given predicate)");
  console.log([1, 2, 3, 4, 5].filterNot((el) => el % 3 === 0));
  console.log("find1 (find first element that satisfy condition)");
  console.log([1, 2, 3, 4, 5].find1((el) => el % 2 == 0));
  console.log("findLast (find last element that satisfy condition)");
  console.log([1, 2, 3, 4, 6].findLast((el) => el % 2 === 0));
  console.log("fold (multiply all elements between themselves)");
  console.log([1, 2, 3, 4, 5].fold(1, (initial, element) => initial * element));
  console.log("maxBy (Returns the first element yielding the largest value of the given function)");
  console.log([1, 2, 3, 4, 5].maxBy((element) => element));
  console.log("minBy (Returns the first element yielding the smallest value of the given function)");
  console.log([1, 2, 3, 4, 5].minBy((element) => element * 4));
  console.log("flatten (Returns a sequence of all elements from all sequences in this sequence)");
  console.log([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]].flatten(4));

  const array = [
    { firstname: "Grace", lastname: "Hopper" },
    { firstname: "Jacob", lastname: "Bernoulli" },
    { firstname: "Johann", lastname: "Bernoulli" },
  ];

  console.log("associateBy (Returns array of values according to key");
  console.log(array.associateBy("firstname"));
  
  const objects = [
    { name: 'Anna', number: 3 },
    { name: 'Bill', number: 5 },
    { name: 'Joe', number: 2 },
  ];
  console.log("count (count object values)");
  console.log(objects.count('number'));
  
  const groupbytest = ['a', 'abc', 'ab', 'def', 'abcd'];
  console.log("groupByKey1 (group by index)");
  console.log(groupbytest.groupByKey((el) => el.length));
  
  const object = [
    { name: 'Anna', Work: 'Football' },
    { name: 'Bill', Work: 'Football' },
    { name: 'Joe', Work: 'Sciense' },
  ];
  console.log("groupByKey2");
  console.log(object.groupByKey((el) => el.Work));
  