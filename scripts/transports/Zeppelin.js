
actorScripts["Zeppelin"] = State.extend({
	Init: function() {



	},
	Enter: function(unit) {

		var waypoints = worldHandler.BuildWaypointListFromUnitIds(
			[1,2,3]
		);

		unit.stateMachine.ChangeState(new PatrolLine(waypoints));

	},
	Execute: function(unit, dTime) {



	},
	Exit: function(unit) {


	},
    HandleMessage: function(unit, message, data) {
		switch(message) {
			case "changeWaypoint":
				console.log("Reached waypoint "+data.id);
				break;
		}

    }
});
