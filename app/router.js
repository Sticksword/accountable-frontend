import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('teams', function() {
    this.route('show', { path: '/:team_id' });
  });
  this.route('player-profile');
  this.route('signin');
});

export default Router;
