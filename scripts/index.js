import { HashMap } from './hashmap.js';
import { HashSet } from './hashset.js';

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("Current Hash Map: ", test.entries());
console.log("Number of entries: ", test.length());

// Overwriting some nodes
test.set('apple', 'green');
test.set('carrot', 'yellow');
test.set('frog', 'red');
test.set('banana', 'green and yellow');
test.set('kite', 'purple');

console.log("Nodes overwritten: ", test.entries());

// Add another node
test.set('moon', 'silver');

console.log("Populate HashMap Once More: ", test.entries());
console.log("Number of entries: ", test.length());

// Overwrite more nodes
test.set('grape', 'green');
test.set('lion', 'orange');
test.set('jacket', 'black');
test.set('hat', 'red');
test.set('ice cream', 'beige');

console.log("New values: ", test.entries());

// Test: get()
console.log("Test get() for 'apple' ", test.get('apple'));
console.log("Test get() for 'banana': ", test.get('banana'));
console.log("Test get() for nonexistent key 'zebra': ", test.get('zebra'));


// Test: has()
console.log("Test has() for 'carrot': ", test.has('carrot'));
console.log("Test has() for 'elephant': ", test.has('elephant'));
console.log("Test has() for nonexistent key 'lizard': ", test.has('lizard'));

// Test: remove()
console.log("Test remove() for 'dog': ", test.remove('dog'));
console.log("Test remove() for 'ice cream': ", test.remove('ice cream'));
console.log("Test remove() for nonexistent key 'tiger': ", test.remove('tiger'));

// Test: length()
console.log("Test length() after remove: ", test.length());

// Test: clear()
test.clear();
console.log("Test length after clear: ", test.length());

// Test: keys()
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
console.log("Test keys(): ", test.keys());

// Test: values()
console.log("Test values(): ", test.values());

// Test: entries()
console.log("Test entries(): ", test.entries());

const testSet = new HashSet();

testSet.set('apple');
testSet.set('banana');
testSet.set('carrot');
testSet.set('dog');

console.log("New set of nodes: ", testSet.keys());

// Test has()
console.log("Test has() for 'carrot': ", testSet.has('carrot'));
console.log("Test has() for 'elephant': ", testSet.has('elephant'));

// Test remove()
console.log("Test remove() for 'dog': ", testSet.remove('dog'));
console.log("Test remove() for 'ice cream': ", testSet.remove('ice cream'));

// Test length()
console.log("Test length() after remove: ", testSet.length());

// Test keys()
console.log("Test keys(): ", testSet.keys());

// Test clear()
testSet.clear();
console.log("Test length after clear: ", testSet.length());
