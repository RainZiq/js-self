# js 类型转换
// js所有数据在赋值的时候经过装箱操作，都会带上toString和valueOf方法，
// null undefined除外,所有这两个数据都是特殊处理
// toString 返回当前对象的字符串
// valueOf 返回当前对象的原始值

// 重写toString 和valueOf
```js
var a = {
  toString(val){
    console.log('执行string')
    return false
  },
  valueOf(val){
    console.log('执行value')
    return false
  }
}
```
# 显示类型转换
1. 转字符串 所有皆可当成字符串。底层实现先加''然后再去解析内容
String(a)  // (调用toString) {} ---> [Object Object] []--->'' function ---> 'function'

2. 转数字 所有皆可当成数字，但是数字有两种表现形式 1 or NaN
Number()
// string --->number 当string有不符合数字的特性的时候，全部返回NaN '1.1a' '1.1.1'   tip ''-->0
// boolean--->number false---0 true---1 
// undefined ---0  null ---0
// 引用类型--->number 先调用toSting() 然后再走string--->number
// {}--->'[Object Object]'---->NaN   
// []--->''-----> 0          [1]---->'1'--->1      [1,2,3]---->'1,2,3'---->NaN

3. 转bool 
Boolean()  // +0 -0 false '' undefined null NaN --->false   其它全部都是true

# 隐式类型转换
1. isNaN()  // 会调用Number()
2. ++ -- +（正数）-（负数） // Number() 1+ +'1' ---->2
3. +（加法）
```js
// 1 如果有一个值为字符串类型，则把另外的也转成字符串然后拼接 1+'1'--->11
// 2.其它基本数据类型会Number转成数字再进行运算
// 3.引用类型会先执行valueOf看是否先返回原始值不然才执行toStirng() 然后 走第一步 [] + [] --->[]+[]--->'' + ''--->''  (ToPrimitive)
// {} + {}--->{}+{} ---->'[Object Object]'+'[Object Object]'---->'[Object Object][Object Object]'
```
```js 
var obj ={
  toString(){
    console.log('string')
    return '200'
  },
  valueOf(){
    console.log('value')
    return 100
  }
}
obj + 3   // 103
```
4. -(减法)
// 1. 转成数字再运算 1 - '1' ---> 1- 1---->0
5. && || !
// 转成boolean再运算
6. == != 
// 优先转数字 1 == '1' --> 1 == 1  tip  null == null ---> 0 == 0 NaN == NaN  例外 -->false 
7. === 比较值和数据类型

typeof instanceof
1. typeof 底层实现只定义了6种返回值，而且没有错误处理机制，所以当你typeof 一个没有定义的数据，也不会返回xx is not defined console会
2. typeof null --->object   typeof NaN --->number
3. a instanceof b 判断a是否是b的实例 var a = {} a instanceof Object --> true
```js
console.log(a)  // undefined a变量提升
console.log(b) // b is not defined
var a = b = 3  ----> b=3; var a=b 
```



