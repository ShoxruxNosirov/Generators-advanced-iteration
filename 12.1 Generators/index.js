function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}
// "generator function" creates "generator object"
let generator = generateSequence();
console.log(generator + ''); // [object Generator]

let one = generator.next();
console.log(one); // {value: 1, done: false}

let two = generator.next();
console.log(two); // {value: 2, done: false}

let three = generator.next();
console.log(three); // {value: 1, done: true}

generator = generateSequence();
for (let value of generator) {
    console.log(value); // 1, then 2
}

function* generateSequence1() {
    yield 1;
    yield 2;
    yield 3;
}
let generator1 = generateSequence1();
for (let value of generator1) {
    console.log(value); // 1, then 2, then 3
}

let sequence = [0, ...generateSequence1()];
console.log(sequence); // 0, 1, 2, 3

let range = {
    from: 1,
    to: 5,
    *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
        for (let value = this.from; value <= this.to; value++) {
            yield value;
        }
    }
};
console.log([...range]); // 1,2,3,4,5

function* generateSequence2(start, end) {
    for (let i = start; i <= end; i++) yield i;
}
function* generatePasswordCodes() {
    // 0..9
    yield* generateSequence2(48, 57);
    // A..Z
    yield* generateSequence2(65, 90);
    // a..z
    yield* generateSequence2(97, 122);
}
let str = '';
for (let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
}
console.log(str); // 0..9A..Za..z

/*
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
function* generateAlphaNum() {
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;
  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;
  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
}
let str = '';
for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}
console.log(str); // 0..9A..Za..z
*/

function* gen() {
    let ask1 = yield "2 + 2 = ?";
    console.log(ask1); // 4
    let ask2 = yield "3 * 3 = ?"
    console.log(ask2); // 9
}
let generator2 = gen();
console.log(generator2.next().value); // "2 + 2 = ?"
console.log(generator2.next(4).value); // "3 * 3 = ?"
console.log(generator2.next(9).done); // true

function* gen1() {
    try {
        let result = yield "2 + 2 = ?"; // (1)
        console.log("The execution does not reach here, because the exception is thrown above");
    } catch (e) {
        console.log(e); // shows the error
    }
}
let generator3 = gen1();
let question = generator3.next().value;
generator3.throw(new Error("The answer is not found in my database"));

function* generate() {
    let result = yield "2 + 2 = ?"; // Error in this line
}
let generator4 = generate();
let question1 = generator4.next().value;
try {
    generator4.throw(new Error("The answer is not found in my database"));
} catch (e) {
    console.log(e); // shows the error
}

function* gen2() {
    yield 1;
    yield 2;
    yield 3;
}
const g = gen2();
g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }

