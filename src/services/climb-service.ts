import {inject, Aurelia} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import {Category, Climb, User } from "./climb-types";
import {HttpClient} from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalUpdate} from "./messages";

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class ClimbService {
  categories : Category[] = [];
  climbs: Climb[] = [];
  users: Map<string, User> = new Map();
  total = 0;


  constructor(private httpClient: HttpClient, private ea: EventAggregator,private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    this.getCategories();
    this.getUsers();
  }

  async getCategories() {
    const response = await this.httpClient.get('/api/categories.json');
    this.categories = await response.content;
    console.log (this.categories);
  }

  async addClimb(climb_name: string,climb_description: string,climb_lat:number, climb_long: number, category:Category) {
    const climb = {
      climb_name: climb_name,
      climb_description: climb_description,
      climb_lat: climb_lat,
      climb_long: climb_long,
      category: category
    };
    this.climbs.push(<Climb>climb);
    this.total = this.total + 1;
    this.ea.publish(new TotalUpdate(this.total));
    console.log('No. of Climbs so far ' + this.total);
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users.json');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
    });
  }

  signup(firstName: string, lastName: string, email: string, password: string) {}

  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (user.password === password)) {
      this.changeRouter(PLATFORM.moduleName('app'))
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.changeRouter(PLATFORM.moduleName('start'))
  }

  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

}
