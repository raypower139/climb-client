import { inject } from 'aurelia-framework';
import { ClimbService } from '../services/climb-service';

@inject(ClimbService)
export class Login {
  email = 'marge@simpson.com';
  password = 'secret';
  prompt = '';

  constructor(private ds: ClimbService) {}

  async login(e) {
    console.log(`Trying to log in ${this.email}`);
    const success = await this.ds.login(this.email, this.password);
    if(!success) {
      this.prompt = "Oops! Try again...";
    }
  }
}
