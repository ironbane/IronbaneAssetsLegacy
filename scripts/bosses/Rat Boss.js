
actorScripts["Rat Boss"] = MonsterState.extend({
    init: function() {
        this._super();
    },
    handleMessage: function(unit, message, data) {
        switch(message) {
            case "attacked":
                unit.Say("<Squeak!>");
                break;
        }
        this._super(unit, message, data);
    }
});
