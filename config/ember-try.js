/* jshint node: true */

module.exports = {
  scenarios: [{
    name: 'ember-1.12',
    dependencies: {
      "ember": "1.12"
    }
  }, {
    name: 'ember-release',
    dependencies: {
      "ember": "components/ember#release"
    },
    resolutions: {
      "ember": "release"
    }
  }]
};
