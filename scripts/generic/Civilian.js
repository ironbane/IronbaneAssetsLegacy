

// A civilian NPC that wanders around and has a random appearance
// Not hostile to the player

actorScripts["Civilian"] = State.extend({
    Init: function() {

        this.isMale = getRandomInt(0,1) ? true : false;

        this.wanderRange = 20;

    },
    Enter: function(unit) {

        unit.maxSpeed = getRandomFloat(1,3);

        if ( this.isMale) {
            unit.skin = getRandomInt(skinIdMaleStart, skinIdMaleEnd);
            unit.hair = getRandomInt(hairIdMaleStart, hairIdMaleEnd);
            unit.eyes = getRandomInt(eyesIdMaleStart, eyesIdMaleEnd);
        }
        else {
            unit.skin = getRandomInt(skinIdFemaleStart, skinIdFemaleEnd);
            unit.hair = getRandomInt(hairIdFemaleStart, hairIdFemaleEnd);
            unit.eyes = getRandomInt(eyesIdFemaleStart, eyesIdFemaleEnd);
        }

        unit.body = ChooseRandom([0,1,2,3,4,16,19,23,81,82,83,94]);
        unit.feet = ChooseRandom([0,1,2,13,15,20,24,84,85]);

        if ( getRandomInt(0,1) ) {
            unit.head = ChooseRandom([1,2,3,4,5,6,7,8,9,12,17,22,86,87,89,93]);
        }
        else {
            unit.head = 0;
        }

        var me = this;
        var waypointList = [];
        _.each(unit.connectedNodeList, function(node) {
            if ( unit.InRangeOfPosition(node.pos, me.wanderRange) ) {
                waypointList.push(node.pos);
            }
        });

        unit.stateMachine.ChangeState(new Wander(waypointList));
    },
    Execute: function(unit, dTime) {



    },
    Exit: function(unit) {


    },
    HandleMessage: function(unit, message, data) {

    }
});
