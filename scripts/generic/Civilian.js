// A civilian NPC that wanders around and has a random appearance
// Not hostile to the player


var MonsterState = require(global.APP_ROOT_PATH + '/src/server/game/ai/states/monster'),
    FleeEnemy = require(global.APP_ROOT_PATH + '/src/server/game/ai/states/fleeEnemy'),
    Wander = require(global.APP_ROOT_PATH + '/src/server/game/ai/states/wander'),
    Constants = require(global.APP_ROOT_PATH + '/src/common/constants'),
    // hack! how to avoid this?
    _ = require(global.APP_ROOT_PATH + '/node_modules/underscore');

var Civilian = MonsterState.extend({
    init: function() {
        this._super();
        this.isMale = _.sample([false, true]);
        this.wanderRange = 20;
        this.wanderConfig = {};
    },
    enter: function(unit) {
        unit.maxSpeed = _.random(2, 4);

        if (this.isMale) {
            unit.skin = _.random(Constants.skinIdMaleStart, Constants.skinIdMaleEnd);
            unit.hair = _.random(Constants.hairIdMaleStart, Constants.hairIdMaleEnd);
            unit.eyes = _.random(Constants.eyesIdMaleStart, Constants.eyesIdMaleEnd);
        }
        else {
            unit.skin = _.random(Constants.skinIdFemaleStart, Constants.skinIdFemaleEnd);
            unit.hair = _.random(Constants.hairIdFemaleStart, Constants.hairIdFemaleEnd);
            unit.eyes = _.random(Constants.eyesIdFemaleStart, Constants.eyesIdFemaleEnd);
        }

        unit.body = _.sample([0, 1, 2, 3, 4, 16, 19, 23, 81, 82, 83, 94]);
        unit.feet = _.sample([0, 1, 2, 13, 15, 20, 24, 84, 85]);

        if (_.sample([false, true])) {
            unit.head = _.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 17, 22, 86, 87, 89, 93]);
        }
        else {
            unit.head = 0;
        }

        this._super(unit);
    },
    execute: function(unit, dTime) {
        // This must stay because otherwise it will not overload MonsterState's
        // execute, causing the Civilian to look for enemies. Feel free to change if you know
        // a better solution
    },
    handleMessage: function(unit, message, data) {
        switch (message) {
            case "attacked":
                unit.maxSpeed = 4;

                unit.stateMachine.changeState(new FleeEnemy(data.attacker));
                break;
            case "stopFlee":
                // We lost the enemy or gave  up

                // Go back to wandering
                unit.stateMachine.changeState(new Wander());
                unit.maxSpeed = this.normalSpeed;
                break;
        }
    }
});

module.exports = {
    "Civilian": Civilian
};
