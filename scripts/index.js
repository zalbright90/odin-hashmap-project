import { HashMap } from './hashmap.js';

const myMap = new HashMap();
myMap.set('name', 'Odin');
console.log("A wise diety: ", myMap.get('name'));