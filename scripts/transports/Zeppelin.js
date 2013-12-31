// the mighty Zepplins!
var State = require(global.APP_ROOT_PATH + '/src/server/game/ai/state'),
    Patrol = require(global.APP_ROOT_PATH + '/src/server/game/ai/states/patrol');

var Zeppelin = State.extend({
    init: function() {

        this.waypoints = [];

        this.slowSpeed = 2;
        this.normalSpeed = 8;
    },
    load : function() {

        var self = this;

        return worldHandler.BuildWaypointListFromUnitIds(
            [1030, 1031, 1032, 1033, 1037, 1038, 1039, 1040, 1044, 1045, 1046]
        ).then(function(waypoints) {
            self.waypoints = waypoints;
        }); 
    },
    enter: function(unit) {

        unit.mass = 3;

        var self = this;

        self.load().then(function() { 
            unit.position.copy(self.waypoints[0].pos);
            unit.stateMachine.changeState(new Patrol(self.waypoints));
        });

    },
    handleMessage: function(unit, message, data) {
        switch (message) {
            case "changeWaypoint":
                var seek = true;
                var pause = 0;

                if (data.id === 1030) {
                    seek = false;
                    pause = 20000;
                }
                if (data.id === 1039) {
                    seek = false;
                    pause = 20000;
                }
                if (data.id === 1038) {
                    unit.maxSpeed = this.slowSpeed;
                }
                if (data.id === 1040) {
                    unit.maxSpeed = this.normalSpeed;
                }

                if (data.id === 1046) {
                    unit.maxSpeed = this.slowSpeed;
                }
                if (data.id === 1031) {
                    unit.maxSpeed = this.normalSpeed;
                }

                unit.stateMachine.changeState(new Patrol(this.waypoints, {
                    seek: seek,
                    pause: pause,
                    firstWaypoint: data.id
                }));

                //console.log("Going to waypoint "+data.id);
                break;
        }
    }
});

var ZeppelinB = Zeppelin.extend({
    init: function() {
        this._super();
    },
    enter: function(unit) {
        unit.mass = 3;

        var self = this;

        self.load().then(function() { 

            unit.position.copy(self.waypoints[7].pos);

            unit.stateMachine.changeState(new Patrol(self.waypoints, {
                firstWaypoint: 1040
            }));

        });
    }
});

module.exports = {
    "Zeppelin": Zeppelin,
    "ZeppelinB": ZeppelinB
};
