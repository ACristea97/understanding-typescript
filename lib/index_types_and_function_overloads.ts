/*
 * Index types
 */

/* HAS TO BE FLEXIBLE.
 * Therefore, we must define an interface in which we
 * DON'T KNOW THE NAME OF THE PROPERTIES BUT THEIR TYPE.
 */
interface ErrorContainer {
    //id: string;

    /* This defines that every property of this interface will be of type string
     * and the property identifier will also be a string.
     * Because of this, a property of type different than string can't be added.
     */
    [property: string]: string
}

const errorBag: ErrorContainer = {
    /* WRONG ! */
    //email: 1

    /* CORRECT! BECAUSE EVERYTHING THAT CAN BE CONVERTED TO A STRING IS VALID AS
     * A PROPERTY NAME !
     * 1: 'Not a valid email!'
     */

    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
}

/*
 * Function overloads
 */

/*
 * Because Combinable is either a string or a number, the implementation of addValues
 * function provides Typescript with the information that a Combinable will be returned.
 *
 * This is not wrong, but this prevents us from using string methods because Typescript has
 * no guarantee that the result is indeed a string ( it might be a number ).
 *
 * In order to fix this issue, there are 2 solutions:
 * 1. Use type casting
 * 2. Overload the function definition
 */

// type Combinable = string | number;

function addValues(a: number, b: number) : number;
function addValues(a: string, b: string) : string;
function addValues(a: string, b: number) : string;
function addValues(a: number, b: string) : string;

function addValues(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string')
        return a.toString() + b.toString();

    return a + b;
}
