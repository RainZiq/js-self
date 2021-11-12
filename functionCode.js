// function 内置方法code

// apply、call 改变函数的this指向
//1. 改变this指向，参数单个传入
Function.prototype.CopyCall = function(){
  let obj = [...arguments].slice(0,1)
  let args = [...arguments].slice(1)
  obj = obj ? Object(obj) :  window
  obj.fn(...args)
  delete obj.fn
  return obj
}

// 改变this指向，参数以数组的形式传入
Function.prototype.CopyApply = function(){
  let obj = [...arguments].slice(0,1)
  let args = [...arguments].slice(1)
  obj = obj ? Object(obj) :  window
  obj.fn(args)
  delete obj.fn
  return obj
}

// bind 返回一个函数
// 初始实现
Function.prototype.CopyBind = function(){
  let that = this
  let context = Array.prototype.shift.call(arguments)
  context = context ? Object(context) : window
  let args1 = [...arguments]
  return function Fuc(){
    // return that.call(context,...[...args1,arguments])
    return that.apply(this instanceof Fuc ? this : context,args1.concat(arguments))
  }
}
// 支持new创建实例对象，提供的this值被忽略并且可以获取到绑定函数原型的值
Function.prototype.CopyBind = function(){
  let that = this
  let context = Array.prototype.shift.call(arguments)
  context = context ? Object(context) : window
  let args1 = [...arguments]
  var Fuc =  function (){
    // return that.call(context,...[...args1,arguments])
    return that.apply(this instanceof Fuc ? this : context,args1.concat(arguments))
  }
  Fuc.prototype = this.prototype   // 把fuc的原型赋值给构造函数的原型,直接赋值地址，指向同一个内存空间
  return Fuc
}
// 但是直接修改
// obj.__proto__.ceshi = 'new' // 会改变原绑定函数的原型属性
Function.prototype.CopyBind = function(){
  if(typeof this !== 'function'){
    throw new Error('不是一个函数')
  }
  let that = this
  console.log(that)
  let context = Array.prototype.shift.call(arguments)
  context = context ? Object(context) : window
  let args1 = [...arguments]
  var Fuc =  function (){
    console.log(that,123123,context)
    // return that.call(context,...[...args1,arguments])
    return that.apply(this instanceof Fuc ? this : context,args1.concat(arguments))
  }
  // Fuc.prototype = this.prototype
  Fuc.prototype = Object.create(this.prototype)   // 把fuc的原型赋值给构造函数的原型,直接赋值地址，指向同一个内存空间
  return Fuc
}

// Object.create(this.prototype)
// // 等价
// function fNOP(){}
// fNOP.prototype = this.prototype
// Fuc.prototype = new fNOP()
// fuc.连续bind之后fuc的this指向谁
function fuc(){
  console.log(this.a)
}
var o1 = { a:1 }
var o2 = { a:2 }
fuc.CopyBind(o1).CopyBind(o2)() 
// 递归，指向that一直返回到最先开始的that所以context也就是第一次的o1

// new 创建构造函数的实例对象
// 1.创建一个对象，并且把构造函数的prototype地址赋值给proto
// 2.执行原始函数，用apply改变this指向为新的对象
// 3.判断是否返回对象或者function,true返回result
// 4.返回创建的对象
function CopyNew() {
  var obj = {}
  let [constructor,...args] = [...arguments]
  obj.__proto__ = constructor.prototype
  let result = fuc.apply(obj,args)
  if(typeof result === 'object' || typeof result === 'function'){
    return result
  }
  return obj 
}

window.addEventListener('resize',debouce(()=>console.log(12313),1000))

// 防抖 只执行最后一次
function debouce(fn,timeout){
  let timer;
  return function (){
    let context = this;
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context,arguments)
    }, timeout);
  }
}
// 立即执行版
function debouce(fn,timeout,immediate){
  let timer;
  return function (){
    let context = this
    clearTimeout(timer)
    if(immediate){
      let flag = !timer  // 第一次为true,直接执行，定时器n秒支持才变为null，所以中途的都不会执行
      timer = setTimeout(() => {
        timer = null
      }, timeout);
      if(flag){
        fn.apply(context,arguments)
      }
    }else{
      timer = setTimeout(() => {
        fn.apply(context,arguments)
      }, timeout);
    }
  }
}


// 节流 单位时间内执行一次
// 1. 时间戳实现
function throttle(fuc,timeout){
  let prev  = 0
  return function(){
    let context = this
    let nowTime = new Date().getTime()
    if(nowTime - prev > timeout){       // 当前时间 - 上次执行的时间 大于 等待时间才执行
      fuc.apply(context,arguments)
      prev = nowTime
    }
  }
}
// 2. 定时器实现
function throttle(fuc,timeout){
  let timer;
  return function(){
    let context = this
    if(!timer){
      timer = setTimeout(() => {     // 定时器会返回一个number代表是第几个定时器
        fuc.apply(context,arguments) // 清除定时器，但是变量值还是一直存在的
        timer = null                 // 将变量置为null，释放变量的值，不清除只null setInterval会一直执行
      }, timeout);
    }
  }
}
// 基本数据类型：赋值，赋值之后两个变量互不影响
// 引用数据类型：赋址，两个变量具有相同的引用，指向同一个对象，相互之间有影响
// 深浅拷贝都是针对对象来说的，浅拷贝，对于引用数据类型只拷贝地址，
// Object.assign() [...] Array.prototype.slice.call() 只是对最外层的对象拷贝了里面的值，里面的引用数据类型还是只拷贝地址所以是浅拷贝
// js提供的一些方法基本都是浅拷贝，因为深拷贝耗时比较复杂
// JSON.stringfy()虽然可以完成深拷贝，但是其实是把对象变成字符串，然后复制字符串重新解析，为了不影响js内部逻辑
// 他重新开辟了一个空间存放
// 深拷贝的关键就是把引用数据类型的每个属性挨个执行基本数据类型复制
// JSON.stringfy()
// 因为JSON是一个通用的文本格式，和语言无关。设想如果将函数定义也stringify的话，如何判断是哪种语言，并且通过合适的方式将其呈现
// 出来将会变得特别复杂。特别是和语言相关的一些特性，比如JavaScript中的Symbol
// 1. undefined symbol function 会被忽略，可能是他觉得你都转成字符串了，为了避免转成字符串出现问题忽略
// 2. 不能解决循环引用的对象
// 3. 不能正确处理new Date()
// 4. symbol for in hasOwnProperty都会忽略

  function deepClone(obj,hash = new WeakMap()){
    if(typeof obj === 'object' && obj !== null){
      if (hash.has(obj)) {
        return hash.get(obj)
      }
      let result = Array.isArray(obj) ? [] :{}
      hash.set(obj,result)
      let symKeys = Object.getOwnPropertySymbols(obj)
      if (symKeys.length) { // 查找成功	
        symKeys.forEach(key => {
          result[key] = deepClone(obj[key],hash)
        });
    }
      for(let key in obj){
        console.log(key)
        if(Object.prototype.hasOwnProperty.call(obj,key)){ // 自身属性
          console.log(123123,key)
          if(typeof obj[key] === 'object' && obj[key] !== null){  // 属性是对象
            result[key] = deepClone(obj[key],hash)
          }else if(Object.prototype.toString.call(obj[key])=== '[Object Date]'){ //属性是date
            result[key] = new Date(obj[key])
          }else if(typeof key === 'symbol'){
            console.log(123123,obj[key])
            result[Symbol(key)] = obj[key]
          }
          else{
            result[key] = obj[key]
          }
        }
      }
      return result
    }else{
      return obj
    }
  }

  var  obj = {
    a:[1,2,3],
    // f:function(){ console.log(123121) }
  }
  var b = Symbol("a");
  obj.c = obj
  obj[b] = 'local sm'
  var  s = cloneDeep5(obj)
  console.log(s)

//
Object.prototype.CopyAssign = function(target,...other){
  if(!target){
    throw new Error('cannot convert null & undefined to object')
  }
  target = Object(target)
  let objArr = [...other]
  objArr.forEach((obj)=>{
    for(let key in obj){
      if(Object.prototype.hasOwnProperty.call(obj,key)){
        target[key] = obj[key]
      }
    }
  })
  return target
}
var a = { a:1 }
var b = Object.CopyAssign(a,{a:2,b:3})
console.log(a,b)

// reduce 对数组升序执行给定的函数
Array.prototype.CopyReduce = function(fn,int){
  if(this.length === 0){
    throw new Error('cannot empty array')
  }
  let that = this
  let result = int ? int : that[0]
  for(let i = int ? 0 : 1; i<that.length;i++){
    code(result,that[i],i,that)
    // result = fn(result,that[i],i,that)
  }
  function code(acc,cur,idx,src){
    result = fn.call(null,acc,cur,idx,src)
  }
  return result
}
var s = [1,2,3]
s.CopyReduce((a,b)=>console.log(b))

// 
第一步：如果数组大小为零的话，说明是空节点了。

第二步：如果不为空，那么取后序数组最后一个元素作为节点元素。

第三步：找到后序数组最后一个元素在中序数组的位置，作为切割点

第四步：切割中序数组，切成中序左数组和中序右数组 （顺序别搞反了，一定是先切中序数组）

第五步：切割后序数组，切成后序左数组和后序右数组

第六步：递归处理左区间和右区间

// 作者：carlsun-2
// 链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/dai-ma-sui-xiang-lu-dai-ni-xue-tou-er-ch-g155/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。