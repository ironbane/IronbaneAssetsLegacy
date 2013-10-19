// healthFountain - script for health regen "spots"
var healing = {
    onEnter: function(unit) {
        //unit.Say('entered healing thing');
        unit.SetHealth(unit.health + 1);
    },
    onExit: function(unit) {
        //unit.Say('left healing thing');
    },
    onTick: function(unit) {
        unit.SetHealth(unit.health + 1);
    }
};

var poison = {
    onEnter: function(unit) {
        unit.Say('ouch!');
        unit.SetHealth(unit.health - 1);
    },
    onExit: function(unit) {
        //unit.Say('left poison thing');
    },
    onTick: function(unit) {
        unit.SetHealth(unit.health - 1);
    }
};

module.exports = {
    "healthFountain": healing,
    "poisonFountain": poison
};
