import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [{
      id: 1,
      title: 'Grand Old Mansion',
      owner: 'Veruca Salt',
    }, {
      id: 2,
      title: 'Urban Living',
      owner: 'Mike TV',
    }, {
      id: 3,
      title: 'Downtown Charm',
      owner: 'Violet Beauregarde',
    }];
  }
});
