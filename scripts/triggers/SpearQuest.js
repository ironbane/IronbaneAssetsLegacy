// spearQuest.js
module.exports = {
    "quest-spear1": {
        onEnter: function(unit) {
            var trigger = this;

            trigger.questers = trigger.questers || {active: [], complete: []};

            if(unit.id > 0) { // only for players!
                // make this repeatable instead?
                if(trigger.questers.complete.indexOf(unit.id) >= 0) {
                    trigger.Say('Helping you is not my priority right now.');
                    return;
                }

                var weapon = unit.GetEquippedWeapon();
                //console.log('weapon: ', weapon);
                if(weapon === null) {
                    trigger.Say('Bring me a Dull Spear, and I will help you!');
                    if(trigger.questers.active.indexOf(unit.id) < 0) {
                        trigger.questers.active.push(unit.id);
                    }
                } else if(weapon.$template.name !== 'Dull Spear') {
                    if(trigger.questers.active.indexOf(unit.id) >= 0) {
                        trigger.Say('Prove to me you have the Dull Spear.');
                    } else {
                        trigger.Say('Come to me when you are in need of help!');
                    }
                } else if(weapon.$template.name === 'Dull Spear') {
                    // todo: replace their spear instead of just giving another...
                    unit.GiveItem(dataHandler.items['//insert sharp spear here']);  Sharp Spear
                    trigger.questers.complete.push(unit.id);
                    trigger.Say('Stay strong with my blessing!');
                }
            }
        },
        onExit: function(unit) {

        },
        onTick: function(unit) {

        }
    }
};
