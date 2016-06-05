export class App {

  attached() {
    $(".button-collapse").sideNav();
  }

  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Flight search' }
    ]);

    this.router = router;
  }
}
