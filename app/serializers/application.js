import { underscore } from '@ember/string';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  }
});
