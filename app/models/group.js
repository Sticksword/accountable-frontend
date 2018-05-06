import DS from 'ember-data';

export default DS.Model.extend({
  groupName: DS.attr('string'),
  userIDs: DS.attr(),
  buyIn: DS.attr('number')
});
