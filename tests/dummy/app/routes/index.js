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
    }, {
      text: 'Leah Silber',
      url:  'https://avatars2.githubusercontent.com/u/25433?v=3&s=400'
    }, {
      text: 'Erik Bryn',
      url:  'https://avatars0.githubusercontent.com/u/3018?v=3&s=400'
    }, {
      text: 'Kris Selden',
      url:  'https://avatars0.githubusercontent.com/u/61024?v=3&s=400'
    }, {
      text: 'Stefan Penner',
      url:  'https://avatars3.githubusercontent.com/u/1377?v=3&s=400'
    }]);
  }
});
