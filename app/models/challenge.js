import DS from 'ember-data';

export default DS.Model.extend({
  groupSubscriptionId: DS.attr('number'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  createdAt: DS.attr('date'),
  verified: DS.attr('boolean'),
  expiration: DS.attr('date')
});
