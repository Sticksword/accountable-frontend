import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://8e7d4207.ngrok.io',
  namespace: 'api'
});
