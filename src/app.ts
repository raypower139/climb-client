import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'climb'],
        name: 'Climb',
        moduleId: PLATFORM.moduleName('views/climbs'),
        nav: true,
        title: 'Climb'
      },
      {
        route: 'categories',
        name: 'categories',
        moduleId: PLATFORM.moduleName('views/categories'),
        nav: true,
        title: 'Category'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      }

    ]);
    this.router = router;
  }
}
