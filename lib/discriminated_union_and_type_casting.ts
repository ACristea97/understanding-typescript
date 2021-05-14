/*
 * Discriminated Union
 */

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    groundSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {

    // if (animal instanceof Bird) => WRONG BECAUSE INTERFACES ARE NOT AVAILABLE AT RUNTIME
    // if ('flyingSpeed' in animal) => CORRECT BUT ERROR PRONE
    //     console.log(`Moving with speed: ${animal.flyingSpeed}`);

    let speed;

    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.groundSpeed;
            break;
    }

    console.log(`Moving with speed: ${speed}`);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

/*
 * Type Casting
 */

// const userInputElement = <HTMLInputElement>document.getElementById('user-input'); => MIGHT CONFLICT WITH JSX REACT SYNTAX
// const userInputElement = document.getElementById('user-input') as HTMLInputElement; => ENSURES TS THAT userInputElement is found when it might not
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hi there!';
}