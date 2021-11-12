# Object 
js 万物皆对象，万物皆可抽象，js是面向对象的，对象就是用来抽象的
各种不同语言有不同的方法来描述面向对象，最成功的就是C++ java 使用类来描述对象，js是通过原型来描述对象的
对象：对于单个物体的简单抽象，对象是一个容器，封装了该物体的属性和方法
# 为什么要面向对象编程（oop）
逻辑迁移灵活
代码的可复用性够
高度模块化

# 特性
1. 对象具有唯一标识性，即使完全相同的两个对象，也不相等
2. 对象具有状态，属性
3. 对象具有行为，方法

对象可以解决复用，es6提供了类，但是也还是在原型的基础上实现的，复制去创建一个新的对象的过程，但是我更倾向于用class来定义类，让function回归函数本身的属性。
1. 宿主对象     window...宿主环境提供的
2. 内置对象     js内部提供的Object Array Date....
3. 自定义对象   自己通过{} new Object() Object.create()创建的对象

# prototype
每个函数都有自己的prototype原型属性
每个对象都有自己的隐式__proto__属性
1. new的时候会创建一个对象，fuc.prototype === 创建对象的.__proto__
2. 任何函数都是由Function这个函数创建的，Function.prototype === 所有函数的.__proto__
3. Object.prototype === 所有函数.prototype.__proto__

# 构造函数
为什么叫构造函数，是因为它是用来生成对象的，为什么生成对象需要一个函数。
因为我们需要一个模板，表述一类物体的共同特征，类就是对象模板
使用构造函数生成对象会有什么性能问题
1. 对于构造函数中的方法，会存在与于每个生成的实例中，重复挂载导致资源浪费，不能复用，需要创建很多函数的引用，代码看上去复用了，内存其实没有


# 原型链
查找一个对象属性的时候，先在自身查找，然后去原型上查找，一直到Object.prototype.__proto__还找不到就返回undefined,这样一层一层通过原型查找的就形成了原型链

# instanceof
obj instanceof fn
判断一个对象是不是函数的实例，由于原型的特性实际上就是
检测obj.__proto__的原型链上是否存在fn.prototype
任何函数都是由Function创建
Function instanceof Function
Function.__proto__ = Function.prototype  // true

对象也是函数
Object instanceof Function
Object.__proto__ = Function.prototype // true

Function.prototype是普通对象，普通对象是有Object创建的
Function instanceof Object
Function.__proto__.__proto__ === Function.prototype.__proto__ === Object.prototype

Object instanceof Object
Object.__proto__.__proto__ === Function.prototype.__proto === Object.prototype

