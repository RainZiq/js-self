# 继承
在原型对象上的所有属性和方法，都能被实例所共享
由于js是基于原型继承，所以从继承关系上分类，可以把对象的属性分为自有属性和继承属性两大类
自有属性：你直接在该对象上定义的属性。
继承属性：自己没有在对象上定义，在对象的原型属性中定义的属性，也可以理解为原型链上的属性。
继承的本质就是prototype属性，通过构造函数+原型链

# 构造函数
为什么叫构造函数，是因为它是用来生成对象的，为什么生成对象需要一个函数。
因为我们需要一个模板，表述一类物体的共同特征，类就是对象模板
使用构造函数生成对象会有什么性能问题
1. 对于构造函数中的方法，会存在与于每个生成的实例中，重复挂载导致资源浪费，不能复用，需要创建很多函数的引用，代码看上去复用了，内存其实没有


实例对象的__proto__是指向构造函数的prototype是一个引用，所以想要复用可以挂载到构造函数的原型对象上，存储公有方法
所以实例对象.__proto__ = {
  constructor:构造函数，
}
继承自构造函数的原型对象，指向构造函数

修改父类原型上面的引用属性的时候，会通过原型链一直找到父类的原型上面的属性，指向的内存地址是同一块，所以修改会影响，
修改父类原型上面的属性其实也会修改，只不过是用错方法修改了，因为父类原型就是一个对象地址，指向的一个内存空间，你修改属性肯定就改掉了同一个内存空间的值

直接在实例对象上面修改原型对象上的属性，其实会给你在实例对象里面重新赋值，所以不会修改原型


# 方法
1. 原型链继承(通过链)
将父类的属性方法，作为子类的原型
```js
function Parent(){
  this.name = 'parent'
}
function Son(){
  this.name = 'Son'
}
Son.prototype = new Parent()
let Jack = new Son()
console.log(Jack.name)
```
不能传参，因为传参只到子类的构造函数
父类属性会变成共享属性，能被修改

2. 构造函数继承
在子类构造函数内部调用父类的构造函数
```js
function Parent(name){
  this.name = name
  this.skin = ['s']
}
Parent.prototype.say = '123123'
function Son(name){
  Parent.call(this,name) // this指向新生成的实例
}
let Jack = new Son('jack')
let John = new Son('john')
Jack.skin.push('a')
console.log(John.skin)
```
原型上面的属性和方法无法获取

3. 组合继承
```js
function Parent(name){
  this.name = name
  this.skin = ['s']
}
Parent.prototype.say = [1]
function Son(name){
  Parent.call(this,name) // this指向新生成的实例
}
Son.prototype = new Parent() //两次要干掉一次，只有这里能干掉,那么怎么样干掉了还能取到原型属性的效果Object.create()
Son.prototype.constructor = Son
Son.prototype.lala = 'lala'
let Jack = new Son('jack')
// Jack.say = 123             //增加了一个自有属性，如果真的想要改原型上面的属性用下面的方法
let John = new Son('john')
Jack.__proto__.say = 123123123 
console.log(John.say,Jack.lala) // [1,2]  // 修改引用数据类型，因为原型上引用数据类型是地址，指向的内存是一样的，所以修改引用数据类型会影响其他的实例上
```
父类构造函数会被调用两次，正常情况执行两次没有关系，但是如果在父类构造函数有累加的这种操作就会导致问题

4. 寄生组合继承
```js
function Parent(name){
  this.name = name
  this.skin = ['s']
}
Parent.prototype.say = '123123'
function Son(name){
  // console.log(this.name)
  Parent.call(this,name) // this指向新生成的实例
  // console.log(this.name)
}
Son.prototype = Object.create(Parent.prototype)
Son.prototype.constructor = Son //显示的指回去，为了让其余的继承他的时候正确指向
let Jack = new Son('jack')
Jack.__proto__.say = 'jack'
let John = new Son('john')
console.log(John.say)
```

# 如何在js实现多重继承
```js
function Parent(name){
  this.name = name
  this.skin = ['s']
}
function Parent2(name){
  this.name = name
}
Parent.prototype.say = '123123'
function Son(name){
  Parent.call(this,name) // this指向新生成的实例
  Parent2.call(this,name)
}
Son.prototype = Object.create(Parent.prototype)
Object.assign(Son.prototype,Parent2.prototype) //相同属性会被覆盖，但是都是相同属性的话，那你为什么要从两个父类继承呢，真的要解决，那你再包一层，但是没意义，始终只能取到一个
let Jack = new Son('jack')
let John = new Son('john')
```

# class extends 
类的本质就是函数
extends本质就是寄生组合继承,为什么子类需要super(),其实把要搞清楚用途,一个子类Son继承了父类Parent,然后你用new关键字去创建子类的实例的时候,实例里面是有父类的属性的,因为extends本质就是寄生组合继承,Parent.call(this)就实现了这个效果,但是你在子类里面,子类也是一个函数是吧,你要在constructor使用父类的属性的话 就相当于你要在Parent.call(this)之后才能使用,否则就是undefined.所以es6就规定必须第一行用super(),做为一个语法规范,直接断绝了可能导致错误的源头
为什么不在有extends关键字的时候直接定义一个super()
1. 作为函数使用,指的就是父类构造函数
2. 作为对象使用,指的就是父类的prototype,可以获取父类的方法
es6 class 的实现
class A{
  go(){}
}
function A (){
  var _proto = A.prototype
  _proto.go = function go(){

  }
}