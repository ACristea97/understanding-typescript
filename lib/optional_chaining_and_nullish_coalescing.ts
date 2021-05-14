/*
 * Optional Chaining
 */

const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: {
        title: 'CEO',
        description: 'My own company'
    }
};

/*
 * Used when you're not sure if the property exists on the object.
 * This actually compiles to a classic javascript if check.
 */

console.log(fetchedUserData?.job?.title);


/*
 * Nullish Coalescing
 */

const userInput = null;

/*
 * This works by evaluating data to truthy of falsy. As you know,
 * '', 0, null and undefined evaluate to falsy in javascript. Therefore, if you
 * want your data to remain '' or 0, you can't use || operator.
 *
 * const storedData = userInput || 'DEFAULT';
 */

/*
 * To check if the data is ONLY NULL OR UNDEFINED NULLISH COALESCING operator has
 * to be used ( '??' ).
 */
const storedData = userInput ?? 'DEFAULT'

