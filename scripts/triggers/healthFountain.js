// healthFountain - script for health regen "spots"
var healing = {
    onEnter: function(unit) {
        if(unit.id > 0) { // players only
            unit.socket.emit('bigMessage', {message: 'You feel warmth wash over you.'});
        }
        unit.SetHealth(unit.health + 1);
    },
    onExit: function(unit) {
        if(unit.id > 0) {
            unit.socket.emit('bigMessage', {message: 'You feel the warmth fade away.'});
        }
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
