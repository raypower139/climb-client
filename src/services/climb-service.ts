import {inject} from 'aurelia-framework';
import {Category, Climb} from "./climb-types";
import {HttpClient} from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalUpdate} from "./messages";

@inject(HttpClient, EventAggregator)
export class ClimbService {
  categories : Category[] = [];
  climbs: Climb[] = [];
  total = 0;


  constructor(private httpClient: HttpClient, private ea: EventAggregator) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    this.getCategories();
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

}
