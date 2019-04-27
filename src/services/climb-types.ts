export interface Category {
  Name: string;
  Location: string;
}

export interface Climb {
  climb_name: string;
  climb_description: string;
  climb_lat: number;
  climb_long: number;
  category; Category;
}
