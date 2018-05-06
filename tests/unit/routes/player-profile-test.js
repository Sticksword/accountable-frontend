import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | player-profile', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:player-profile');
    assert.ok(route);
  });
});
