
actorScripts["Rat Boss"] = State.extend({
    Init: function() {


    },
    Enter: function(unit) {
        //unit.Say("<Squeak?>");
    },
    Execute: function(unit, dTime) {



    },
    Exit: function(unit) {


    },
    HandleMessage: function(unit, message, data) {
        switch(message) {
            case "attacked":
                unit.Say("<Squeak!>");
                break;
        }
    }
});
