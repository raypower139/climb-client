import { inject } from 'aurelia-framework';
import { ClimbService } from '../services/climb-service';

@inject(ClimbService)
export class Signup {
  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';
  prompt = '';

  constructor(private ds: ClimbService) {}

  signup(e) {
    console.log(`Trying to sign up ${this.email}`);
    const success = this.ds.signup(this.firstName, this.lastName, this.email, this.password);
    // @ts-ignore
    if (!success) {
      this.prompt = 'Oops! Try again...';
    }
  }
}
