// swordQuest.js
// experiment using triggers for quests
module.exports = {
    "quest-sword1": {
        onEnter: function(unit) {
            var trigger = this;

            trigger.questers = trigger.questers || {active: [], complete: []};

            if(unit.id > 0) { // only for players!
                // make this repeatable instead?
                if(trigger.questers.complete.indexOf(unit.id) >= 0) {
                    trigger.Say('I can provide you with no more help.');
                    return;
                }

                var weapon = unit.GetEquippedWeapon();
                //console.log('weapon: ', weapon);
                if(weapon === null) {
                    trigger.Say('Bring me a Dull Sword, and I will help you!');
                    if(trigger.questers.active.indexOf(unit.id) < 0) {
                        trigger.questers.active.push(unit.id);
                    }
                } else if(weapon.$template.name !== 'Dull Sword') {
                    if(trigger.questers.active.indexOf(unit.id) >= 0) {
                        trigger.Say('You must brandish the Dull Sword!');
                    } else {
                        trigger.Say('Come to me when you are in need of help!');
                    }
                } else if(weapon.$template.name === 'Dull Sword') {
                    unit.replaceItem('Dull Sword', 'Blessed Dull Sword'); // Blessed Dull Sword
                    trigger.questers.complete.push(unit.id);
                    trigger.Say('May my strength be yours!');
                }
            }
        },
        onExit: function(unit) {

        },
        onTick: function(unit) {

        }
    }
};
