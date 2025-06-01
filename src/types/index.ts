export interface Pet {
	id: string;
	name: string;
	age: string;
	details: string;
	location: string;
	description: string;
	image?: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	phone?: string;
	city?: string;
	about?: string;
}
