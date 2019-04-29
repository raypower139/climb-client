export interface Category {
  Name: string;
  Location: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export interface Climb {
  climb_name: string;
  climb_description: string;
  climb_lat: number;
  climb_long: number;
  category; Category;
}
