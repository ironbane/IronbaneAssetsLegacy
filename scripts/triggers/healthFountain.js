var healing = {
    onEnter: function(unit) {
        if (unit.isA('Fighter')) { // players only
            if(unit.socket) {
                unit.socket.emit('bigMessage', {
                    message: 'You feel warmth wash over you.'
                });
            }
            unit.SetHealth(unit.health + 1);
        }
    },
    onExit: function(unit) {
        if (unit.isA('Fighter')) {
            if (unit.socket) {
                unit.socket.emit('bigMessage', {
                    message: 'You feel the warmth fade away.'
                });
            }
        }
    },
    onTick: function(unit) {
        if (unit.isA('Fighter')) {
            unit.SetHealth(unit.health + 1);
        }
    }
};

var poison = {
    onEnter: function(unit) {
        if (unit.isA('Fighter')) {
            unit.Say("Ouch! That's poison!");
            unit.SetHealth(unit.health - 1);
        }
    },
    onExit: function(unit) {
        if (unit.isA('Fighter')) {
            unit.Say("Oh, that feels better.");
        }
    },
    onTick: function(unit) {
        if (unit.isA('Fighter')) {
            unit.SetHealth(unit.health - 1);
        }
    }
};

module.exports = {
    "healthFountain": healing,
    "poisonFountain": poison
};