import Route from '@ember/routing/route';

export default Route.extend({
  teamName: null,
  memberIDs: null,
  buyInAmount: null,

  actions: {
    createTeam: function() {
      const { teamName, memberIDs, buyInAmount } = this.controller.getProperties('teamName', 'memberIDs', 'buyInAmount');
      let team = this.get('store').createRecord('group', {
        groupName: teamName,
        userIDs: memberIDs.split(','),
        buyIn: buyInAmount
      });

      team.save().then((group) => {
        console.log(group);
        this.transitionTo('groups.show', group);
      })

    }
  }
});
