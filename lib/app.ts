/*
 * Generics
 */

/* What are generics ?
 *
 * A generic type is a type that is connected to another type and that offers
 * flexibility when choosing the type it is connected to.
 * Generic types help you to get additional type information:
 * -> In a more complex class / function something is done with the data and
 *    the type of that data doesn't really matter because it is stored in the generic
 *    In this case, in order to get better typescript support you need to specify
 *    the type the generic uses.
 *
 * Built-in generics: Array<T>, Promise<T>
 */

// const names: Array<string> = [];
// names[0].split(' ');
//
// const promise: Promise<string> = new Promise((resolve, reject) => {
//    setTimeout(() => resolve('This is done'), 2000);
// });
//
// promise.then(data => {
//    data.split(' ');
// });

/*
 * Generic functions.
 */

/* Without a generic function we would need to cast the result
 * to the obtained type in order for Typescript to identify the properties.
 */
function merge(objectA: object, objectB: object) {
    return Object.assign(objectA, objectB);
}

const object = merge({ name: 'Max' }, { age: 30 }) as { name: string, age: number };
console.log(object.name);

/* With a generic function, we don't need to cast the result to the obtained type.
 * In a generic function, Typescript will infer the resulting type dynamically,
 * when that function will be called because only at that moment the types will be defined.
 * The types are inferred per function call. This means that different generic function calls
 * can use different types and Typescript will infer correctly the result each time.
 */
function genericMerge<T, U>(first: T, second: U) {
    return Object.assign(first, second);
}

const someObject = genericMerge({ name: 'Max', hobbies: ['football'] }, { age: 30 });
console.log(someObject.name);


/*
 * Types can be also provided to generic functions, on function call, BUT THIS IS REDUNDANT.
 */
const anotherObject = genericMerge<{ name: string }, { age: number }>(
    { name: 'Max' }, { age: 30 }
);
console.log(anotherObject.age);

/*
 * The types of the generic should be restrained in order to comply with your code.
 * This can be done by extending the type the generic uses. It can be extended with
 * both user defined types or general types ( number, string, etc. ).
 */
function constrainedGenericMerge<T extends object, U extends object>(first: T, second: U) {
    return Object.assign(first, second);
}

interface Lengthy {
    length: number;
}

function countAndPrint<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value';

    if (element.length > 0) {
        descriptionText = `Got ${element.length} ${element.length === 1 ? 'element' : 'elements'}`;
    }

    return [element, descriptionText];
}

console.log(countAndPrint('Hi there!'));
console.log(countAndPrint(['Sports']));
console.log(countAndPrint([]));

/*
 * 'keyof' constraint
 */

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value: ${obj[key]}`;
}

extractAndConvert({ name: 'Max' }, 'name');

/*
 * Generic classes
 */

class DataStorage<T extends string | number | boolean> {
    private data: Array<T> = [];

    addItem(item: T) {
        this.data.push(item);
    }

    getItems() {
        return [ ...this.data ];
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: 'Max' });
// objectStorage.addItem({ name: 'Manu' });
// objectStorage.removeItem({ name: 'Max' });
// console.log(objectStorage.getItems());

/*
 * Generic Utility Types
 */

/* Partial type. */
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};

    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}

/* Readonly type. */
const names: Readonly<string[]> = ['Max', 'Anna'];

// names.push('Manu');
// names.pop();


/*
 * Generic Types vs Union Types
 *
 * Generic types are used when you want to have STRICTLY THE SAME TYPE from a list
 * of types. In other words, generic types lock in a type.
 *
 * Union types are used when you want to have ANY OF THE TYPES from a list of types.
 *
 */
