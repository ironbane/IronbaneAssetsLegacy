
actorScripts["Rat Boss"] = MonsterState.extend({
    Init: function() {
        this._super();
    },
    HandleMessage: function(unit, message, data) {
        switch(message) {
            case "attacked":
                unit.Say("<Squeak!>");
                break;
        }
        this._super(unit, message, data);
    }
});
