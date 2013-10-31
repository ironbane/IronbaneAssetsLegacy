// halloween related quests and triggers

// hack! how to avoid this?
var _ = require(global.APP_ROOT_PATH + '/node_modules/underscore');

var phrases = [
    'trick or treat!',
    'boo!',
    'Happy Halloween!',
    'Nice costume!',
    'got any candy?'
];

var h3Heckles = [
    'hey! pumpkins only!',
    'beat it!',
    'get lost!',
    'your not even orange!',
    'move it human!',
    'only pumpkins understand!',
    'do you have a stem?',
    'pumpkin business, move along',
    'the great pumpkin shall punish you!'
];

module.exports = {
    "quest-halloween1": {
        onEnter: function(unit) {
            var trigger = this;

            if (unit.id > 0) { // only for players!
                trigger.Say(_.sample(phrases));
            }
        },
        onExit: function(unit) {

        },
        onTick: function(unit) {

        }
    },
    "quest-halloween2": {
        onEnter: function(unit) {
            var trigger = this;

            // gimme candy!
            // player drops candy
            // get item (pumpkin mask?)

            //console.log('h2 enter: ', unit.id, ' :: ', unit.data, ' :: ', unit.loot);
        },
        onExit: function(unit) {

        },
        onTick: function(unit) {

        }
    },
    "quest-halloween3": {
        onEnter: function(unit) {
            var trigger = this;

            // other pumpkins
            trigger.chanters = trigger.chanters || []; //todo: *really* need init method!
            // pumpkin players
            trigger.kin = trigger.kin || {};

            if (unit.data && unit.data.name === 'pumpkin-chanter') {
                trigger.chanters.push(unit);
            }

            if (unit.id > 0) { // only for players!
                if (unit.hasItemEquipped('Pumpkin Head')) {
                    // begin chanting
                    trigger.kin[unit.id] = 0;
                }
            }
        },
        onExit: function(unit) {
            var trigger = this;
            if (unit.id > 0) {
                // remove them from the lists just in case
                delete trigger.kin[unit.id];
            }
        },
        onTick: function(unit) {
            var trigger = this;

            if (unit.id > 0) {
                // if we're not already kin
                if (!trigger.kin.hasOwnProperty(unit.id)) {
                    if (unit.hasItemEquipped('Pumpkin Head')) {
                        // begin chanting
                        trigger.kin[unit.id] = 0;
                    }
                } else {
                    if (!unit.hasItemEquipped('Pumpkin Head')) {
                        // took the mask off!
                        delete trigger.kin[unit.id];
                    }
                }

                if (trigger.kin.hasOwnProperty(unit.id)) {
                    _.each(trigger.chanters, function(chanter) {
                        chanter.Say('one of us!');
                    });
                    trigger.kin[unit.id]++;

                    if (trigger.kin[unit.id] >= 3) {
                        // teleport time! (hard coded for now)
                        unit.Teleport(15, {
                            x: 1.41,
                            y: 6.11,
                            z: -1.85
                        });
                    }
                } else {
                    _.each(_.sample(trigger.chanters, 3), function(chanter) {
                        chanter.Say(_.sample(h3Heckles));
                    });
                }
            }
        }
    },
    "quest-halloween4": {
        onEnter: function(unit) {
            var trigger = this;
            var rewardItem = 'Ghost Cloak';

            trigger.questers = trigger.questers || {
                active: [],
                complete: []
            };

            if (unit.id > 0) { // only for players!
                // make this repeatable instead?
                if (trigger.questers.complete.indexOf(unit.id) >= 0 || unit.getItem(rewardItem)) {
                    trigger.Say('Thank you for bringing my notebook back.');
                    return;
                }

                var notebook = unit.getItem('Piano Notebook');
                if (!notebook && trigger.questers.active.indexOf(unit.id) < 0) {
                    trigger.Say('Some rogue ghosts have stolen my precious notebook!');
                    trigger.Say('Without it I can\'t play my favorite song.');
                    trigger.Say('Please find it and bring it to me!');
                    if (trigger.questers.active.indexOf(unit.id) < 0) {
                        trigger.questers.active.push(unit.id);
                    }
                } else {
                    if (unit.replaceItem('Piano Notebook', rewardItem, {
                        data: {
                            permanent: true
                        }
                    })) {
                        trigger.questers.complete.push(unit.id);
                        trigger.Say('Thank you so much for returning my notebook!');
                    } else {
                        console.error('unable to replaceItem for quest for : ', unit.id);
                    }
                }
            }
        },
        onExit: function(unit) {

        },
        onTick: function(unit) {

        }
    }
//     "quest-halloween5": {
//         onEnter: function(unit) {
//             if (unit.id > 0) {
//                 if (unit.getItem('Golden Sickle') || unit.getItem('Skull Staff') || unit.getItem('Bloody Cleaver') || unit.getItem('Sword of the Raven') ||
//                     unit.getItem('Pumpkin Armor') || unit.getItem('Pumpkin Island Key') || unit.getItem('Ghost House Key') || unit.getItem('Undead Crypt Key')) {
//                     debugger;
//                     var exit = worldHandler.FindUnit(-2085);
//                     if(exit) {
//                         unit.TeleportToUnit(exit);
//                     }
//                 }
//             }
//         },
//         onExit: function(unit) {
//             if (unit.id > 0) {
//                 if (unit.getItem('Golden Sickle') || unit.getItem('Skull Staff') || unit.getItem('Bloody Cleaver') || unit.getItem('Sword of the Raven') ||
//                     unit.getItem('Pumpkin Armor') || unit.getItem('Pumpkin Island Key') || unit.getItem('Ghost House Key') || unit.getItem('Undead Crypt Key')) {
// debugger;
//                     var exit = worldHandler.FindUnit(-2085);
//                     if(exit) {
//                         unit.TeleportToUnit(exit);
//                     }
//                 }
//             }
//         },
//         onTick: function(unit) {
//             if (unit.id > 0) {
//                 if (unit.getItem('Golden Sickle') || unit.getItem('Skull Staff') || unit.getItem('Bloody Cleaver') || unit.getItem('Sword of the Raven') ||
//                     unit.getItem('Pumpkin Armor') || unit.getItem('Pumpkin Island Key') || unit.getItem('Ghost House Key') || unit.getItem('Undead Crypt Key')) {
// debugger;
//                     var exit = worldHandler.FindUnit(-2085);
//                     if(exit) {
//                         unit.TeleportToUnit(exit);
//                     }
//                 }
//             }
//         }
//     }
};