import { A } from '@ember/array';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return A([{
      text: 'Yehuda Katz',
      url:  'http://emberjs.com/images/team/ykatz.jpg'
    }, {
      text: 'Tom Dale',
      url:  'http://emberjs.com/images/team/tdale.jpg'
    }, {
      text: 'Peter Wagenet',
      url:  'http://emberjs.com/images/team/pwagenet.jpg'
    }, {
      text: 'Trek Glowacki',
      url:  'http://emberjs.com/images/team/tglowaki.jpg'
    }, {
      text: 'Erik Bryn',
      url:  'http://emberjs.com/images/team/ebryn.jpg'
    }, {
      text: 'Kris Selden',
      url:  'http://emberjs.com/images/team/kselden.jpg'
    }, {
      text: 'Stefan Penner',
      url:  'http://emberjs.com/images/team/spenner.jpg'
    }, {
      text: 'Leah Silber',
      url:  'http://emberjs.com/images/team/lsilber.jpg'
    }, {
      text: 'Alex Matchneer',
      url:  'http://emberjs.com/images/team/amatchneer.jpg'
    }, {
      text: 'Robert Jackson',
      url:  'http://emberjs.com/images/team/rjackson.jpg'
    }, {
      text: 'Igor Terzic',
      url:  'http://emberjs.com/images/team/iterzic.jpeg'
    }]);
  }
});
