import DS from 'ember-data';
import { underscore } from '@ember/string';
const { String: { pluralize } } = Ember;

export default DS.RESTAdapter.extend({
  host: 'http://20c67508.ngrok.io',
  namespace: 'api',
  pathForType(type) {
    return pluralize(underscore(type));
  },
  headers: function() {
    var headers = {};
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    return headers;
  }
});
