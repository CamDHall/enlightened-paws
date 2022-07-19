export class User {
    name: string;
    phone: string;
    address1: string;
    address2: string | null;
    city: string;
    state: string;
    zipCode: number;

    constructor(name: string, phone: string, city: string, state: string, zipCode: number, address1: string, address2: string | null = null) {
        this.name = name;
        this.phone = phone;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}