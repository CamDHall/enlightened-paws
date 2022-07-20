export default class Dog {
    name: string;
    breed: string;
    age: string;

    constructor(name: string, breed: string, age: string, id: string | null = null) {
        this.name = name;
        this.breed = breed;
        this.age = age;
    }
}