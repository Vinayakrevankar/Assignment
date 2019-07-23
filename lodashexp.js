var _ = require('lodash');
let array = [14,1,99,45,88,74,789];
// _.times(5,(i)=>{
//     console.log(i);
// });

console.log(array);
console.log(_.forIn(array,(i,index)=>{
    console.log(index)
}));
var users = [
      { 'user': 'barney',  'active': true },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': false }
    ]; 

console.log(_.dropRightWhile(users, function(o) { return o.active; }));
console.log("------------------------------");
// => objects for ['barney']
 
// The `_.matches` iteratee shorthand.
console.log(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }));
// => objects for ['barney', 'fred']
 console.log("------------------------------");
// The `_.matchesProperty` iteratee shorthand.
console.log(_.dropRightWhile(users, ['active', false]));
// => objects for ['barney']
 console.log("------------------------------");
// The `_.property` iteratee shorthand.
console.log(_.dropRightWhile(users, 'active'));
// => objects for ['barney', 'fred', 'pebbles']
// 

var array1 = [1, 2, 3];
 
 console.log(_.fill(array1, 'a'));
console.log(array1);
// => ['a', 'a', 'a']
 
 console.log(_.fill(Array(3), 2));
// => [2, 2, 2]
 
 console.log(_.fill([4, 6, 8, 10], '*', 1, 3));
// => [4, '*', '*', 10]