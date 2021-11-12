// js为了语言的便利性，内置了很多操作的方法，我们在会用的基础上还需要弄懂实现原理，这样才能在更合适
// 的地方使用

// 按照数据类型划分

// string
String.prototype.charAt() // 返回对应索引的字符
String.prototype.charCodeAt() // 返回对应索引字符的unicode值
String.prototype.startsWith() // 判断一个字符串是否以什么开头
String.prototype.endsWith() // 判断一个字符串是否以什么结尾
String.prototype.match() // 返回正则匹配的相关信息
String.prototype.replace() // 对字符串进行匹配替换，改变原字符串
String.prototype.search() // 返回匹配字符的开始索引
String.prototype.split() // 返回 字符串分隔之后的数组，不传按照length分隔
String.prototype.substring() // 返回开始到结束索引的字符，end<start 互换位置
String.prototype.toLocaleLowerCase() // 返回指定子符串的小写
String.prototype.toLocaleUpperCase() // 返回指定字符串的大写
String.prototype.trim() // 返回字符串两端去除空格之后的字符串
String.prototype.trimStart() // 返回字符串开头去除空格之后的字符串
String.prototype.trimEnd() // 返回字符串结尾去除空格之后的字符串

// number
Number.isFinite() // 判断传入的是否是有穷数
Number.isInteger() // 判断传入的是否是整数
Number.isNaN() // 判断传入的是否是NaN
Number.parseFloat() // 返回字符串转换成浮点数的值
Number.parseInt() // 返回字符串转换成整数的值
Number.prototype.toFixed() // 返回数字的保留几位小数 四舍五入

// Object对象
Object.assign() // 源对象的可枚举属性值分配到的目标对象，改变目标对象并且返回
Object.create() // 返回一个对象，__proto__是传入的对象
Object.defineProperties() // 直接在对象上定义修改属性，并返回该对象，
Object.defineProperty() // 直接在对象定义一个属性，并返回该对象
Object.getOwnPropertyDescriptor() // 返回对象对应属性的描述
Object.getOwnPropertyDescriptors() // 返回对象所有属性的描述
Object.getOwnPropertyNames() // 返回对象所有属性的数组
Object.getOwnPropertySymbols() // 返回对象所有symbol属性的数组
Object.getPrototypeOf() // 返回指定对象的原型
Object.entries() // 返回一个对象的键值对数组 [[a,1],[b:2]]
Object.keys() // 返回对象属性名数组
Object.values() // 返回对象属性值数组
Object.freeze() // 将一个对象冻结，不能新增修改删除...
Object.seal() // 将一个对象冻结，只有原来可写的属性可以删除

// Array
Array.prototype.copyWithin() // 浅复制数组的一部分到数组本身的位置，不改变长度 并且返回
Array.prototype.entries()    // 返回一个新的array iterator 对象
Array.prototype.every()      // 判断数组的每一项是否都符合条件
Array.prototype.some()       // 判断数组是否有一项符合条件
Array.prototype.fill()       // 用指定的值填充数组
Array.prototype.filter()     // 过滤出数组中符合条件的值并返回
Array.prototype.find()       // 过滤出数组中符合条件的第一个值并返回
Array.prototype.findIndex()  // 找对数组对应元素的第一个索引并返回
Array.prototype.flat()       // 深拷贝遍历数组几次，返回扁平化之后的数组，默认1
Array.prototype.flatMap()    // 映射数组每个元素，并且返回一个新的数组跟map类似
Array.prototype.forEach()    // 对数组的每个元素执行一次给定的函数
Array.from()                 // 将类数组结构浅拷贝成一个新的数组
Array.isArray()              // 判断是否是数组
Array.prototype.join()       // 将数组用分隔符转成字符串
Array.prototype.keys()       // 返回数组的索引的新的 array iterator对象
Array.prototype.values()     // 返回数组的值的新的 array iterator对象
Array.prototype.map()        // 将数组每项执行操作并且返回新的数组
Array.of()                   // 用值创建数组，单个值不代表length
Array.prototype.pop()        // 推出最后一个元素，改变原数组
Array.prototype.push()       // 推入数组最后，改变原数组
Array.prototype.shift()      // 推出第一个元素，改变原数组
Array.prototype.unshift()    // 推入数组开头，改变原数组
Array.prototype.reduce(()=>{},默认第一个元素)     // 对数组每个元素累加求和 acc,累加器 cur 当前值 curI 当前索引 old 原始数组
Array.prototype.reduceRight  // 从右往左
Array.prototype.reverse()    // 反转数组
Array.prototype.sort()       // 对数组进行排序，默认按首位排序
Array.prototype.splice()     // 操作数组，start，delete,charu，改变原数组

//string array

concat                       // 拼接
includes                     // 判断是否包含
indexOf                      // 找到对应的第一个索引
slice(s,e)                   // 返回一个新的被分隔之后的数组或字符串，不改变原数组