/*
 * Intersection, in case of OBJECT types, builds the
 * COMBINATION of the object properties.
 */

type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// type ElevatedEmployee = Admin & Employee;

interface ElevatedEmployee extends Employee, Admin {};

const e1 : ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};

/*
 * Intersection, in case of other types than OBJECT types,
 * builds the intersection of the given types.
 */

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;


/*
 * Type Guards
 */

function addCombinable(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string')
        return a.toString() + b.toString();

    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(`Name: ${emp.name}`);

    //if (typeof emp === 'Employee') { } WRONG -> typeof runs at Runtime so no type Employee exits, only JS types
    if ('privileges' in emp)
        console.log(`Privileges: ${emp.privileges}`);

    if ('startDate' in emp)
        console.log(`StartDate: ${emp.startDate}`);
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Manu', startDate: new Date() });

class Car {
    drive() {
        console.log('Driving a car.');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck');
    }

    loadCargo(amount: number) {
        console.log(`Loading cargo ${amount}`);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

/*
 * instanceof type guard can't be used with Interfaces.
 * ONLY WITH Classes as a right hand operator because those are available at runtime.
 *
 * For interfaces use propertyString in object
 */

function useVechicle(vehicle: Vehicle) {
    vehicle.drive();

    if (vehicle instanceof Truck)
        vehicle.loadCargo(100);
}

useVechicle(v1);
useVechicle(v2);
