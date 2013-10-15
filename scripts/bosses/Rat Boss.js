// the Rat Boss! - much worse than Cake Boss
var MonsterState = require(global.APP_ROOT_PATH + '/src/server/game/ai/states/monster');

var RatBoss = MonsterState.extend({
    init: function() {
        this._super();
    },
    handleMessage: function(unit, message, data) {
        switch (message) {
            case "attacked":
                unit.Say("<Squeak!>");
                break;
        }
        this._super(unit, message, data);
    }
});

module.exports = {
    "Rat Boss": RatBoss
};
