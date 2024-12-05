import { HashMap } from './hashmap.js';

const myMap = new HashMap();
myMap.set('name', 'Odin');
console.log("A wise diety: ", myMap.get('name'));

myMap.set('Carlos', 'I am the old value.');
myMap.set('Carlos', 'I am the new value.');
myMap.set('Carla', 'Collision example');

console.log("Carlos: ", myMap.get('Carlos'));
console.log("Carla: ", myMap.get('Carla'));
console.log("Nonexistent: ", myMap.get('Nonexistent'));