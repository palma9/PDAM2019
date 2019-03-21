export class School {
    name: string;
	contact: string;
	subscriptionEnd: Date;
	address: string;
	city: string;
    country: string; 
    location: number[];

    constructor(name: string, contact: string, subscriptionEnd: Date, address: string,
        city: string, country: string, location: number[]) {
            this.name = name;
            this.contact = contact;
            this.subscriptionEnd = subscriptionEnd;
            this.address = address;
            this.city = city;
            this.country = country;
            this.location = location;
    }
}
