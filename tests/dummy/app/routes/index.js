import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    return Ember.A([{
      text: 'Yehuda Katz',
      url:  'https://avatars3.githubusercontent.com/u/4?v=3&s=400'
    }, {
      text: 'Tom Dale',
      url:  'https://avatars0.githubusercontent.com/u/90888?v=3&s=400'
    }, {
      text: 'Godfrey Chan',
      url:  'https://avatars0.githubusercontent.com/u/55829?v=3&s=400'
    }]);
  }
});
