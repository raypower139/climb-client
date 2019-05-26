import {inject, Aurelia} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import {Category, Climb, RawClimb, User} from "./climb-types";
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TotalUpdate} from "./messages";

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class ClimbService {
  categories : Category[] = [];
  climbs: Climb[] = [];
  users: Map<string, User> = new Map();
  total = 0;


  constructor(private httpClient: HttpClient, private ea: EventAggregator,private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getCategories();
    this.getUsers();
    this.getClimbs();
  }

  async getCategories() {
    const response = await this.httpClient.get('/api/categoriesapi');
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
    const response = await this.httpClient.post('/api/categoriesapi/' + category._id + '/climbs', climb);
    this.climbs.push(<Climb>climb);
    this.total = this.total + 1;
    this.ea.publish(new TotalUpdate(this.total));
    console.log('No. of Climbs so far ' + this.total);
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
    });
  }

  async getClimbs() {
    const response = await this.httpClient.get('/api/climbsapi');
    const rawClimbs: RawClimb[] = await response.content;
    rawClimbs.forEach(rawClimb => {
      const climb = {
        climb_name: rawClimb.climb_name,
        climb_description : rawClimb.climb_description,
        climb_lat : rawClimb.climb_lat,
        climb_long : rawClimb.climb_long,
        category :this.categories.find(category => rawClimb.category == category._id),
      }
      this.climbs.push(<Climb>climb);
    });
  }

  async createCategory(category_name: string, category_location: string) {
    const category = {
      category_name: category_name,
      category_location: category_location,
    };
    const response = await this.httpClient.post('/api/categoriesapi', category);
    const newCategory = await response.content;
    this.categories.push(newCategory);
  }


  signup(firstName: string, lastName: string, email: string, password: string) {
    //this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }

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
