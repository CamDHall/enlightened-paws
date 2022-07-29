export default class Dog {
    name: string;
    breed: string;
    age: string;
    id?: string;

    constructor(name: string, breed: string, age: string) {
        this.name = name;
        this.breed = breed;
        this.age = age;
    }
}