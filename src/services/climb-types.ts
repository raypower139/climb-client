export interface Category {
  category_name: string;
  category_location: string;
  _id: string;

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

export interface RawClimb {
  climb_name: string;
  climb_description: string;
  climb_lat: number;
  climb_long: number;
  category: string;
  editor: string;
}
