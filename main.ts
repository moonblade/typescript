/// <reference path="js/jquery.d.ts" />
var constants = {
    defaultPlayerName: 'player',
    endMarker: '.',
    invalidCommand: 'Invalid Command',
    emptyInventory: 'Your inventory is empty',
    noExit: 'There is no exit in that direction',
    debug: true,
    easterEgg: ['go up', 'go up', 'go down', 'go down', 'left ', 'right ', 'left ', 'right ', 'b ', 'a '],
    seperator: '..',
    maxHP: 5,


    games: [
        {
            startLocation: 'westRoom',
            // NAME OF GAME
            name: 'zork',
            // ROOMS IN GAME
            roomList: {
                westRoom: {
                    shortDescription: 'west room',
                    description: 'You are in the west end of a sloping east-west passage of barren rock.',
                    interactible: ['platinumKey', 'water'],
                    exits: [{
                        direction: 'east',
                        to: 'centerRoom',
                    }],
                },
                centerRoom: {
                    shortDescription: 'center room',
                    description: 'You are in the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above.',
                    interactible: ['copperKey', 'trophyStand'],
                    exits: [{
                            direction: 'west',
                            to: 'westRoom'
                        },
                        {
                            direction: 'east',
                            to: 'eastRoom'
                        },
                        {
                            direction: 'north',
                            to: 'northRoom'
                        },
                        {
                            direction: 'south',
                            to: 'southRoom'
                        }
                    ],
                },
                eastRoom: {
                    shortDescription: 'east room',
                    description: 'You arrive at a room of finished stone with high arched ceiling and soaring columns. The room has an aura of holyness to it.',
                    interactible: ['copperBox', 'scorpion'],
                    exits: [{
                        direction: 'west',
                        to: 'centerRoom'
                    }],
                },
                northRoom: {
                    shortDescription: 'north room',
                    description: 'You are in a dimly room littered with skulls. It has an eerie quiteness about it, the sound of death',
                    interactible: ['silverBox', 'bottle'],
                    exits: [{
                        direction: 'south',
                        to: 'centerRoom'
                    },{
                        direction: 'east',
                        to: 'treasureRoom',
                        locked: 'woodenDoor',
                        description: 'You expect the door to be a mirage and resolve to walk through it, you walk headlong into the door and hit your face hard.'
                    },{
                        direction: 'west',
                        to: 'treasureRoom',
                        locked: 'wroughtIronDoor',
                        description: 'You expect the door to be a mirage and resolve to walk through it, you walk headlong into the door and hit your face hard.'
                    }]
                },
                southRoom: {
                    shortDescription: 'south room',
                    description: 'You are in a damp musty smelling room. A small window overlooks a cliff where faint sounds of waves crashing can be faintly heard.',
                    interactible: ['goldBox', 'ivoryKey'],
                    exits: [{
                        direction: 'north',
                        to: 'centerRoom'
                    },{
                        direction: 'west',
                        to: 'burningRoom',
                        locked: 'marbleDoor'
                    }]
                },
                treasureRoom: {
                    shortDescription: 'treasure room',
                    description: 'You are in a room filled with treasures of all kinds imaginable, there are mounds of glittering gold and shining diamonds in a huge pile',
                    interactible: ['platinumBox', 'decayingBox'],
                    exits: [{
                        direction: 'west',
                        to: 'northRoom',
                    }]
                },
                burningRoom: {
                    shortDescription: 'burning room',
                    description: 'You are in a room with granite slabs for floors and ceiling, the room is really hot, you can barely stand on the floor',
                    interactible: ['fire', 'woodenClub'],
                    exits: [{
                        direction: 'east',
                        to: 'southRoom'
                    }]
                }

            },

            // INTERACTIBLES IN GAME
            interactible: {
                platinumKey: {
                    shortDescription: 'platinum key',
                    description: 'The key is made out of solid platinum, It must have cost a lot to make. It has an intricate pattern of a rose engraved on it.',
                    take: {
                        description: 'You bend down and pick up the platinum key. You examine it for a second and slip it in your pocket.',
                        able: true,
                    },
                },
                water: {
                    shortDescription: 'water',
                    description: 'Crystal clear water',
                    take: {
                        description: 'Uncapping your bottle, you scoop up some fresh water into it.',
                        able: true,
                        noremove: true,
                        needs: [{
                            key: 'bottle',
                            noremove: true,
                            description: 'You try to cup the water in your hands, but its not very effective. You realize that you need some kind of container to store water.',
                        }],
                    },
                    put: {
                        description: 'You pour the water out',
                        dissipate: true,
                    }
                },
                bottle: {
                    shortDescription: 'bottle',
                    description: 'A regular old plastic bottle.',
                    take: {
                        description: 'You pick up the bottle',
                        able: true
                    }
                },
                copperKey: {
                    shortDescription: 'copper key',
                    description: 'A key made of copper, it has an orchid emblem enbossed on it.',
                    take: {
                        description: 'You bend down and pick up the key. You keep it in the hopes of using it later',
                        able: true,
                    },
                },
                copperBox: {
                    shortDescription: 'copper box',
                    description: 'A knee high box, made completely from copper. There\'s a small keyhole at the front of the box, a small engraving of a orchid underneath it',
                    take: {
                        description: 'You try to lift the box, but it is too heavy.',
                    },
                    open: {
                        description: 'Fitting the key into the box, you give it a twist. It opens with a creak.',
                        able: true,
                        content: [{
                            description: 'You find a silver key inside the box. You slip it in your pocket for later use.',
                            interactible: ['silverKey'],
                        }],
                        needs: [{
                            key: 'copperKey',
                            description: 'You try to force the lock open, but its too strong.'
                        }]
                    }
                },
                silverBox: {
                    shortDescription: 'silver box',
                    description: 'A box made out of pure silver, you can see your face off its reflection. Its apparent that it was crafted with much care.',
                    take: {
                        description: 'You try to lift the box, but it is bolted to the floor.'
                    },
                    open: {
                        description: 'Fitting the silver key into the box, you open it, anxious for its contents.',
                        able: true,
                        content: [{
                            description: 'You find a gold key inside the box, this seems like a chain of boxes, you think as you pocket the key.',
                            interactible: ['goldKey']
                        }, {
                            description: 'The silver key falls out of the keyhole.',
                            interactible: ['silverKey'],
                            to: 'room'
                        }],
                        needs: [{
                            key: 'silverKey',
                            description: 'You try to force the lock open, but it won\'t give'
                        }]
                    }
                },
                goldBox: {
                    shortDescription: 'gold box',
                    description: 'A pure gold box, it glistens with a shiny lusture. It is ornately decorated with a ring of jewels around the opening.',
                    take: {
                        description: 'You try to take the gold box, but it does not budge, you overestimate your own strength',
                    },
                    open: {
                        description: 'Fitting the key into the lock, you give it a twist. ',
                        able:true,
                        content: [{
                            description: 'Expecting treasure you slowly open the box, you find a normal looking key inside the box. Disappointed, you pocket it.',
                            interactible: ['normalKey'],
                        }],
                        needs: [{
                            key: 'goldKey',
                            description: 'You try to hit the box repeatedly in an effort to open it, nothing happens'
                        }]
                    }
                },
                platinumBox: {
                    shortDescription: 'platinum box',
                    description: 'A box that looks to be made from platinum, on closer inspection it is a wooden box coated in a platinum finish.',
                    take: {
                        description: 'You try to take the box, but its too slippery',
                    },
                    open: {
                        description: 'You open the platinum box with its key.',
                        able: true,
                        content: [{
                            description: 'Peering inside, you see a sparkle, excited you grab it. Its the hilt of a marvellous sword. You take the sword out of the box',
                            interactible: ['sword']
                        }],
                        needs: [{
                            key: 'platinumKey',
                            description: 'You try to pry open the box, but it does not give.'
                        }]
                    }
                },
                decayingBox: {
                    shortDescription: 'decaying box',
                    description: 'A wooden box that is almost crumbling due to rot, You can\'t even find the lock on it. It might contain something',
                    take: {
                        description: 'You try to lift the box, a rotting splinter pierces your hand.',
                        able: false,
                        loss:{
                            health: -1
                        }
                    },
                    open: {
                        description: 'You smash the box with the wooden club, the club breaks as well',
                        able: true,
                        needs: [{
                            key: 'woodenClub',
                            noremove: true,
                            description: 'You try to pry open the box, a rotting splinter pierces your hand',
                            health: -1
                        }],
                        content: [{
                            description: 'The box breaks into rotting pieces of wood',
                            interactible: ['wood'],
                            to: 'room'
                        }]
                    }
                },
                silverKey: {
                    shortDescription: 'silver key',
                    description: 'A key made out of pure silver. It glistens when you turn it in your hands. A small tulip design is embossed on it.',
                    take: {
                        description: 'You take the silver key, and place it in your pocket for later use.',
                        able: true
                    },
                },
                goldKey: {
                    shortDescription: 'gold key',
                    description: 'A key made out of pure gold. You can see the light glow from it.',
                    take: {
                        description: 'You take the gold key, and place it in your pocket for later use.',
                        able: true
                    },
                },
                normalKey: {
                    shortDescription: 'normal key',
                    description: 'A key that looks like an everyday key, there seems to be nothing special about it',
                    take: {
                        able: true,
                        description: 'You take the normal key hoping that it has a use in the future',
                    }
                },
                woodenClub: {
                    shortDescription: 'wooden club',
                    description: 'A club made of wood. It does not look very strong, could be used to break something.',
                    take: {
                        able: true,
                        description: 'You pick up the wooden club and keep it with you.',
                    }
                },
                scorpion: {
                    shortDescription: 'scorpion',
                    description: 'A menacing scorpion with its stinger raised, poised to strike.',
                    kill: {
                        able: true,
                        removeWeakness: true,
                        health: 1,
                        weakness: [{
                            key: 'sword',
                            description: 'The scorpion strikes, you sidestep the attack and drive your sword through it. It thrashes around for sometime and finally dies.',
                            health: -1,
                            attack: -1,
                            isWeakness: true,
                            weaknessDescription: 'You take a swing at the scorpion with the sword, but the wily creature sidesteps you',
                        }],
                        loot: [{
                            description: 'From the hole in its stomach, a key falls to the floor, intrigued you take it.',
                            interactible: ['graniteKey'],
                        }],
                        loss: {
                            description: 'The scorpion strikes, you try to sidestep it and catch its tail with your bare hands, but it is faster than you and strikes you square in your heart',
                            health: -1,
                        },
                    }
                },
                sword: {
                    shortDescription: 'sword',
                    description: 'A glistening sword made with pure steel. You can see a small ruby set on its hilt.',
                    take: {
                        able: true,
                    }

                },
                graniteKey: {
                    shortDescription: 'granite key',
                    description: 'A key fashioned from granite, it must have been incredibly difficult to craft.'
                },
                ivoryKey: {
                    shortDescription: 'ivory key',
                    description: 'A key carved from ivory, it must have taken a lot of time and effor to craft.',
                    take: {
                        able: true
                    }
                },
                ironKey: {
                    shortDescription: 'iron key',
                    description: 'A solid iron key, it feels heavy in your hand, there is a lotus insignia on one side of it.',
                    take: {
                        able: true
                    }
                },
                woodenDoor: {
                    shortDescription: 'wooden door',
                    description: 'A large and impossing wooden door, with an old fashioned knocker. A keyhole is set into the wood with elegance.',
                    open: {
                        able: true,
                        description: 'You open the door lock with the normal Key, you try to push it open but it does not budge, You shove your weight on it, and it creaks and opens a bit allowing you room to pass',
                        needs: [{
                            key: 'normalKey',
                            description: 'You try to break the door open with a kick, but it is too strong and your legs hurt.',
                            health: -1
                        }]
                    }
                },
                wroughtIronDoor: {
                    shortDescription: 'wrought iron door',
                    description: 'An iron door, completely inpenetrable.',
                    open: {
                        able: true,
                        description: 'You try to insert the key, but the keyhole is a fake one. You look around and find a suspicious hole, you try the key in it, and it twists open.',
                        needs: [{
                            key: 'ironKey',
                            description: 'You try to break the door open with a flying shove with your shoulder. You hurt your shoulder badly.',
                            health: -1
                        }]
                    }
                },
                marbleDoor: {
                    shortDescription: 'marble door',
                    description: 'A door made from marble stone, Impossibly large. It blends perfectly with the surrounding walls, making it seem invisible',
                    open: {
                        able: true,
                        description: 'The key is sucked into the keylock as soon as it is inserted, the door silently slides into the wall leaving no trace of it ever exiting.',
                        needs: [{
                            key: 'graniteKey',
                            description: 'You try to shove the door out of the way, but it must be really heavy',
                        }]
                    }
                },
                fire: {
                    shortDescription: 'fire',
                    description: 'A burning fire, taller than you. It emits of waves of heat making it really hard to go near it.',
                    open: {
                        description: 'You try to open up the fire, wonder how. You get burned in the process',
                        able: false,
                        loss: {
                            health: -1
                        }
                    },
                    take: {
                        description: 'You put one end of the piece of wood in the fire, it immediately blazes into a flame.', 
                        able: true,
                        noremove: true,
                        needs: [{
                            key: 'wood',
                            description: 'You try to take the fire by cupping it in your hands, an admittedly stupid move, your hands get burned',
                            health: -1,
                        }],
                    }
                },
                wood: {
                    shortDescription: 'wood piece',
                    description: 'A very dry piece of wood',
                    take: {
                        description: 'You take the wood piece hoping it will be useful later',
                        able: true,
                        amount: 4,                        
                    }
                },
                stake: {
                    shortDescription: 'wooden stake',
                    description: 'A stake made by sharpening wood into a point, could be useful as a weapon',
                    take: {
                        able: true,
                    },
                    open: {
                        able: true,
                        description: 'You try to open the stake, you apply force and it breaks as a result.',
                        needs: [{
                            key: 'stake',
                            description: 'You need a stake to open it',
                        }],
                    },
                    make: {
                        description: 'Using your sword, you chip at the end of the wood piece till it is sharpened to a point.',
                        able: true,
                        needs: [{
                            key: 'wood',
                            description: 'You realise that you dont have anything that can be made into a stake with you',
                        },{
                            key: 'sword',
                            description: 'You dont have anything to sharpen the wood with',
                            noremove: true
                        }],
                    }
                },
                rope: {
                    shortDescription: 'rope',
                    description: 'A rope made from strips of snakeskin.',
                    alternatives: ['string', 'twine'],
                    take: {
                        able: true,
                    },
                    make: {
                        description: 'You cut the snakeskin into narrow strips and weave it into a rope',
                        able: true,
                        needs: [{
                            // TODO define snakeskin
                            key: 'snakeSkin',
                            description: 'You dont have anything that could be fashioned into a rope',
                        },{
                            key: 'sword',
                            description: 'You need something to cut the snake skin with to make it into a rope'
                        }]
                    }
                },
                cross: {
                    shortDescription: 'wooden cross',
                    description: 'A cross made from wood, maybe it could be used as a religious artifact',
                    alternatives: ['woodcross','wood cross', 'woodencross'],
                    take: {
                        able: true,
                    },
                    make: {
                        description: 'You break the piece of wood into two, and tie the pieces together with a piece of rope making a cross',
                        able: true,
                        needs: [{
                            key: 'wood',
                            description: 'You dont have any material to make a cross',
                        },{
                            key: 'sword',
                            description: 'You dont have anything to cut the wood piece to make a cross',
                            noremove: true
                        },{
                            key: 'rope',
                            description: 'You need something to tie the wood pieces with',
                            noremove: true
                        }]
                    }
                },
                holyWater: {
                    shortDescription: 'holy water',
                    description: 'Holy water, glowing lightly, its power is palpatable ',
                    alternatives: ['holywater'],
                    open: {
                        description: 'Seriously? You\'re trying to open water, did you stop to maybe think about it?'
                    },
                    make: {
                        description: 'You imbue the holyness of the room into the water using the cross. The water starts glowing lightly',
                        able: true,
                        needs: [{
                            key: 'water',
                            description: 'You dont have anything that can be converted to holy water',
                        },{
                            room: 'eastRoom',
                            description: 'You try to make holy water, but there is not enough holyness to imbue into the water',
                        },{
                            key: 'cross',
                            description: 'You try to make holy water, but you dont have anything to direct the holyness of the room to the water',
                        }]
                    }
                },
                trophyStand: {
                    shortDescription: 'trophy stand',
                    description: 'An impossing trophy stand, there seems to be no trophy on it.',
                    take: {
                        description: 'It is part of the room.'
                    },
                    open: {
                        description: 'It is completely solid.'
                    },
                }
            }
        },
    ],
}

var variables = {
    gameStepText: [],
    gameText: [],
    mute: false,
    thisGame: 0
}

function debug(string) {
    if (constants.debug) {
        console.log("d:", string);
    }
}

class Game {
    static savedGame = {};
    static commandHistory: Array < string > = [];
    static print(string: string) {
        if (variables.mute)
            return;
        // Save till endMarker, when endMarker comes, print it on screen
        if (constants.debug)
            console.log("print: " + string);
        if (string == constants.endMarker) {
            variables.gameText = variables.gameStepText.concat(variables.gameText);
            Game.updateGameScreen();
            variables.gameStepText = [];
        } else {
            variables.gameStepText.push(string);
        }
    }

    static currentGame() {
        return constants.games[variables.thisGame];
    }

    static printBold(string: string) {
        Game.print("<b>" + string + "</b>");
    }

    static save(command: Command) {
        // TODO remove this hack, use jQuery and do it properly
        Game.savedGame[command.object] = JSON.parse(JSON.stringify(Game.commandHistory));
        Game.print("Game saved")
    }

    static load(command: Command) {
        if (command.object in Game.savedGame) {
            Game.reset();
            Game.clear();
            Game.mute();
            for (let com of Game.savedGame[command.object]) {
                // Execute each of those commands
                Game.execute(new Command(com));
            }
            Game.unmute();
            Game.print("Game loaded");
        } else {
            if (Object.keys(Game.savedGame).length > 0) {
                Game.print("No such save game exists");
                Game.print("Saved Games are :");
                for (var key in Game.savedGame) {
                    Game.print(key);
                }
            } else {
                Game.print("No save games present");
            }

        }
    }

    static reset() {
        player.reset();
        Room.reset();
        Interactible.reset();
        Game.commandHistory = [];
    }

    static mute() {
        variables.mute = true;
    }

    static unmute() {
        variables.mute = false;
    }

    static clear() {
        var gameTextDiv = ( < HTMLElement > document.getElementById('gameText'));
        gameTextDiv.innerHTML = "<p></p>";
    }

    static execute(command: Command) {
        if (command.silent)
            Game.mute();
        Game.printBold(command.toString());
        if (!command.noSave) {
            Game.commandHistory.push(command.toString());
        }
        if (!command.checkValidity()) {
            if (command.missedExtra)
                Game.print(command.missedExtra);
            else
                Game.print(constants.invalidCommand);
        } else
            command.execute();
        Game.print(constants.endMarker);
        if (command.silent)
            Game.unmute();
        Game.checkEasterEgg();
        Game.updateHUD();
    }

    static checkEasterEgg() {
        var easterEggSize = constants.easterEgg.length;
        var easterEggString = JSON.stringify(constants.easterEgg);
        var lastCommandsString = JSON.stringify(Game.commandHistory.slice(-easterEggSize));
        if (easterEggString == lastCommandsString) {
            debug("EASTER EGG FOUND");
            // TODO add an interactible here
        }
    }

    static updateHUD() {
        ( < HTMLParagraphElement > document.getElementById("inventory")).innerHTML = "<b>Inventory :</b> " + player.toStringInventory();
        ( < HTMLParagraphElement > document.getElementById("health")).innerHTML = "<b>HP :</b> " + player.health + "/" + constants.maxHP;
        var enemy = Room.currentRoom().enemy();
        if (enemy)
            ( < HTMLParagraphElement > document.getElementById("enemyHealth")).innerHTML = "<b>" + enemy.name + " HP :</b> " + enemy.health + "/" + enemy.maxHealth;
        else
            ( < HTMLParagraphElement > document.getElementById("enemyHealth")).innerHTML = "";

    }

    // Send the gameStep to the screen
    static updateGameScreen() {
        var gameTextDiv = ( < HTMLElement > document.getElementById('gameText'))
        var pElement = document.createElement("pre");
        // Browser compatible pre element word wrap
        pElement.style.display = "table";
        pElement.style.whiteSpace = "pre-wrap";
        pElement.style.whiteSpace = "-pre-wrap";
        pElement.style.whiteSpace = "-o-pre-wrap";
        pElement.style.whiteSpace = "-moz-pre-wrap";
        pElement.style.wordWrap = "break-word";
        for (var key in variables.gameStepText) {
            pElement.innerHTML += variables.gameStepText[key] + "\n";
        }
        gameTextDiv.insertBefore(pElement, gameTextDiv.firstChild);

    }
}

// Can be used to check if element present in array, or substring present in string 
// second one is kind of hack
// TODO remove hack and do properly
function has(array, element) {
    return array && (array.indexOf(element) > -1);
}

// to remove an element from an array
function remove(array, element) {
    // remove if exist
    if (has(array, element)) {
        var index = array.indexOf(element);
        array.splice(index, 1);
    }
}

class Command {
    static commands = {
        'inventory': {
            desc: 'Print inventory',
            alternatives: ['inv'],
            execute: (command: Command) => {
                player.printInventory();
            }
        },
        'look': {
            desc: 'Give description of the room you\'re in',
            alternatives: ['info'],
            execute: (command: Command) => {
                Room.roomList[player.location].describe();
            }
        },
        'examine': {
            desc: 'Give description of the item',
            extra: '[item]',
            alternatives: ['ex', 'describe', 'desc'],
            missedExtra: 'Please specify what to examine',
            execute: (command: Command) => {
                player.examine(command.object);
            }
        },
        'go': {
            desc: 'Go to the specified direction',
            alternatives: ['move', 'walk'],
            extraDescription: '\tYou can also use north, east, south, west, up, down, n, e, s, w as well',
            extra: '[direction]',
            shortcut: {
                'north': ['go', 'north'],
                'n': ['go', 'north'],
                'south': ['go', 'south'],
                's': ['go', 'south'],
                'east': ['go', 'east'],
                'e': ['go', 'east'],
                'west': ['go', 'west'],
                'w': ['go', 'west'],
                'up': ['go', 'up'],
                'down': ['go', 'down'],
            },
            missedExtra: 'Please specify direction to go',
            execute: (command: Command) => {
                if (player.moveTo(command.object))
                    Room.roomList[player.location].describe();

            }
        },
        'take': {
            desc: 'Take an object',
            alternatives: ['pick', 'fill'],
            extra: '[object]',
            missedExtra: 'Please specify what to take',
            execute: (command: Command) => {
                player.take(command.object);
            }
        },
        'put': {
            desc: 'Put an object',
            alternatives: ['place', 'keep', 'fix', 'pour'],
            extra: '[object]',
            missedExtra: 'Please specify what to put',
        },
        'open': {
            desc: 'Try to open the object',
            alternatives: ['unlock'],
            extra: '[object]',
            missedExtra: 'Please specify what to open',
            execute: (command: Command) => {
                player.open(command.object);
            }
        },
        'kill': {
            desc: 'Try to kill the enemy',
            alternatives: ['attack'],
            extra: '[enemy]',
            missedExtra: 'Please specify what to attack',
            execute: (command: Command) => {
                player.kill(command.object);
            }
        },
        'make': {
            desc: 'Make object if the materials are present',
            alternatives: ['craft', 'build'],
            extra: '[object]',
            missedExtra: 'Please specify what to make',
            execute: (command: Command) => {
                player.make(command.object);
            }
        },
        'ls': {
            desc: 'Combination of inventory and look',
            execute: (command: Command) => {
                player.printInventory();
                Game.print(constants.seperator);
                Room.roomList[player.location].describe();
            }
        },
        'save': {
            desc: 'Create a checkpoint that can be loaded later',
            extra: '[tag]',
            defaultExtra: 'saveGame',
            noSave: true,
            missedExtra: 'Please specify tag to save under',
            execute: (command: Command) => {
                Game.save(command);
            }
        },
        'load': {
            desc: 'Load a checkpoint that has been saved',
            extra: '[tag]',
            noSave: true,
            defaultExtra: 'saveGame',
            missedExtra: 'Please specify tag to load from',
            execute: (command: Command) => {
                Game.load(command);
            }
        },
        'reset': {
            desc: 'Start game from beginning again',
            alternatives: ['redo', 'reboot', 'restart'],
            execute: (command: Command) => {
                Game.reset();
                Game.print('Game reset');
            }
        },
        'clear': {
            desc: 'Clear the screen of game text',
            silent: true,
            execute: (command: Command) => {
                Game.clear();
            }
        },
        'help': {
            desc: 'Print this help menu',
            execute: (command: Command) => {
                Command.generateHelp();
            }
        },
    }
    verb: string;
    object: string;
    missedExtra: string;
    defaultExtra: string;
    noSave: boolean;
    execute;
    silent: boolean;
    constructor(str ? : string) {
        if (!str)
            var str = ( < HTMLInputElement > document.getElementById('command')).value;
        // splits string into an array of words, taking out all whitespace
        var parts = str.split(/\s+/);
        // command is the first word in the array, which is removed from the array
        this.verb = parts.shift();
        // the rest of the words joined together.  If there are no other words, this will be an empty string
        this.object = parts.join(' ');
        // if given as input, take that
        // Check Validity
        this.checkValidity();
        // Clear the command
        ( < HTMLInputElement > document.getElementById('command')).value = "";
    }


    static generateControlString() {
        var controlString = "<b>Controls :</b> ";
        for (var key in Command.commands) {
            var command = Command.commands[key];
            var extra = (command.extra ? " " + command.extra : "");
            controlString += key + extra + ", ";
        }
        return controlString;
    }

    public toString() {
        return this.verb + " " + this.object;
    }

    static generateHelp() {
        Game.print("The following commands are available");
        for (var key in Command.commands) {
            var command = Command.commands[key];
            var extra = (command.extra ? " " + command.extra : "");
            var helpText = key + extra;
            if (command.alternatives) {
                for (let alternative of command.alternatives)
                    helpText += "/ " + alternative + extra;
            }
            Game.print(helpText + " : " + command.desc);

            if (command.extraDescription)
                Game.print(command.extraDescription);
        }
    }

    // Check if a given command is valid
    public checkValidity() {
        // If no command entered invalid
        if (this.verb == '')
            return false;
        for (var key in Command.commands) {
            var com = Command.commands[key];
            // If shortcut, replace with actual command
            if (com.shortcut) {
                for (var dkey in com.shortcut) {
                    if (this.verb == dkey) {
                        this.verb = com.shortcut[dkey][0];
                        this.object = com.shortcut[dkey][1];
                    }
                }
            }
            // If command is one of direct commands, then it is valid
            // If command is one of the alternatives, its valid
            if (key == this.verb || has(com.alternatives, this.verb)) {
                // If required extra field is not given, then its not valid
                this.verb = key;
                this.noSave = com.noSave;
                this.silent = com.silent;
                this.execute = () => {
                    if (com.execute)
                        com.execute(this);
                }
                if (com.extra)
                    if (this.object == '') {
                        this.missedExtra = com.missedExtra;
                        this.defaultExtra = com.defaultExtra;
                        if (this.defaultExtra) {
                            this.object = this.defaultExtra;
                            return true;
                        }
                        return false;
                    }
                return true;
            }
        }
        return false;
    }
}

class Unique {
    public name: string;
}

// Super of take, open, make classes
class Interaction extends Unique{
    description: string;
    able: boolean;
    needs: Array < Reward > ;
    progress: number;
    noremove: boolean;
    canString: string;
    loss: Reward;
    content: Array < Reward > ;
        

    constructor(interactionObject, name) {
        super();
        this.name = name;
        this.noremove = false;
        this.able = false;
        this.canString = 'cannot ';
        this.needs = [];
        this.progress = 0;
        this.description = 'You ' + this.canString + 'interact with ' + name;
        this.loss = new Reward({});
        this.content = [];
        if (interactionObject) {
            if (interactionObject.description)
                this.description = interactionObject.description;
            if (interactionObject.able)
                this.able = interactionObject.able;
            if (interactionObject.noremove)
                this.noremove = interactionObject.noremove;
            
            if (interactionObject.progress)
                this.progress = interactionObject.progress;
            
            if (interactionObject.loss)
                this.loss = new Reward(interactionObject.loss);
            
            if (interactionObject.needs) 
                for (var x of interactionObject.needs)
                    this.needs.push(new Reward(x));

            if (interactionObject.content)
                for (var x of interactionObject.content)
                    this.content.push(new Reward(x));
            
            if (interactionObject.loot)
                for (var x of interactionObject.loot)
                    this.content.push(new Reward(x));
            
        }
        this.canString = this.able ? '' : 'cannot ';
    }

    public takeLoss() {
        this.loss.giveReward();
    }

    public loseIfNotAble() {
        if(this.loss && !this.able)
            this.takeLoss();
    }

    public getContent() {
        for (var reward of this.content) {
            reward.giveReward();
        }
    }

    public satisfiedAll(silent?:boolean) {
        for (var reward of this.needs)
            if (!reward.satisfied()) {
                if(!silent)
                    reward.giveReward();
                return false;
            }
        return true;
    }

    public satisfiedOne() {
        for (var reward of this.needs)
            if (reward.satisfied()) {
                return reward;
            }
        return false;
    }

    public removeRequirements() {
        for (var reward of this.needs)
            if(!reward.noremove)
                reward.remove();
    }
}

class Take extends Interaction {
    amount: number;
    constructor(takeObject, name: string) {
        super(takeObject, name);
        this.amount = 1;
        this.description = 'You ' + this.canString + 'pick up ' + name;
        if (takeObject) {
            if (takeObject.description)
                this.description = takeObject.description;
            if (takeObject.amount)
                this.amount = takeObject.amount;
        }
    }

    public takeOne() {
        this.amount -= 1;
    }

    public moreThanOne() {
        return this.amount > 1;
    }

    public take(inRoom: string) {
        if (this.moreThanOne()) {
            this.takeOne();
        } else if (this.noremove) {
            // Don't remove item ever on take
        } else {
            var room: Room = Room.currentRoom();
            room.remove(inRoom);
        }
        this.removeRequirements();
        Game.print(this.description);
        player.addToInventory(inRoom);
    }
}

class Open extends Interaction {
    constructor(openObject, name) {
        super(openObject, name);
        this.description = 'You ' + this.canString + 'open ' + name;
        if (openObject) {
            if (openObject.description)
                this.description = openObject.description;
        }
    }

    public open(inRoom: string) {
        if (this.noremove) {
            // Don't remove item ever on open
        } else {
            var room: Room = Room.currentRoom();
            room.remove(inRoom);
        }
        this.removeRequirements();
        Game.print(this.description);
        // Apply loss if not able
        this.getContent();
    }

    public openDoor(exit: Exit) {
        exit.unlock();
        this.removeRequirements();
        Game.print(this.description);
    }
}

class Kill extends Interaction {
    removeWeakness: boolean;
    health: number;
    maxHealth: number;
    weakness: Array < Weakness > ;
    constructor(openObject, name) {
        super(openObject, name);
        this.description = 'You ' + this.canString + 'kill ' + name;
        this.removeWeakness = false;
        this.health = 1;
        this.health = 1;
        this.weakness = [];
        if (openObject) {
            if (openObject.description)
                this.description = openObject.description;

            if (openObject.removeWeakness)
                this.removeWeakness = openObject.removeWeakness;

            
            if (openObject.health) {
                this.health = openObject.health;
                this.maxHealth = openObject.health;
            }

            if (openObject.weakness)
                for (var x of openObject.weakness)
                    this.weakness.push(new Weakness(x));
        }
    }

    public getLoot(){
        this.getContent();
    }

    public updateHealth(health: number, identifier: string) {
        this.health += health;
        if (this.health <= 0) {
            Game.print('You defeated the ' + this.name);
            this.getLoot();
            Room.currentRoom().remove(identifier);
        }
    }

    public kill(inRoom: string) {
        var room: Room = Room.currentRoom();
        for (var x of this.weakness) {
            if (x.canUse()) {
                x.exploitWeakness(inRoom);
                return;
            }
        }
        for (var x of this.weakness) {
            if (x.has()) {
                x.exploitWeakness(inRoom);
                return;
            }
        }
        // TODO , check if remove requirement is needed
        this.takeLoss();
    }
}

class Make extends Interaction {
    public constructor(makeObject, name)
    {
        super(makeObject,name);
        this.description = 'You '+this.canString + 'make ' + name;
        if(makeObject)
        {
            if(makeObject.description)
                this.description = makeObject.description;
        }
    }

    public make(makeObject: string) {
        this.removeRequirements();
        Game.print(this.description);
        player.addToInventory(makeObject);
    }
}


class Put extends Interaction {
    candidates: Array<Candidate>;
    dissipate: boolean;
    public constructor(putObject, name){
        super(putObject, name);
        this.able = true;
        this.dissipate = false;
        this.description = 'You ' + this.canString + 'put ' + name;
        this.candidates = [];
        if(putObject)
        {
            if('able' in putObject)
                this.able = putObject.able;
            if('dissipate' in putObject)
                this.dissipate = putObject.dissipate;
            this.description = 'You ' + this.canString + 'put ' + name;
            if(putObject.description)
                this.description = putObject.description;
            if(putObject.candidates)
                for(var candidateObject of putObject.candidates)
                    this.candidates.push(new Candidate(candidateObject));
        }
    }

    public put(inHnad: string){
        for(var candidate of this.candidates)
        {
            if(candidate.satisfied())
            {
                // TODO figure this out
                candidate.giveReward();
            }
        }
    }
}

class Reward {
    public key: string;
    public to: string;
    public room: string;
    public description;
    public interactible: Array < string > ;
    public health: number;
    public execute;
    public noremove: false;
    constructor(rewardObject) {
        this.health = 0;
        this.to = 'player';
        this.interactible = [];

        if(rewardObject){
            if (rewardObject.key)
                this.key = rewardObject.key;

            if (rewardObject.room)
                this.room = rewardObject.room;

            if (rewardObject.description)
                this.description = rewardObject.description;

            if (rewardObject.noremove)
                this.noremove = rewardObject.noremove;

            if (rewardObject.interactible)
                this.interactible = rewardObject.interactible;

            if (rewardObject.to)
                this.to = rewardObject.to;

            if (rewardObject.execute)
                this.execute = rewardObject.execute;

            if (rewardObject.health)
                this.health = rewardObject.health;
            }
    }

    public remove() {
        if(!this.key)
            return;
        switch(this.to)
        {
            case 'player':
                player.removeFromInventory(this.key);
                break;
            case 'room':
                Room.currentRoom().remove(this.key);
                break;
        }
    }
    public satisfied() {
        return ((!this.key && !this.room)
        || (player.has(this.key) && this.to=='player') 
        || (Room.currentRoom().has(this.key) && this.to=='room') 
        || Room.currentRoom().is(this.room));
    }

    public giveReward() {
        if(this.description)
            Game.print(this.description);
        for (var x of this.interactible)
            switch(this.to)
            {
                case 'player':
                    player.addToInventory(x);
                    break;
                case 'room':
                    Room.currentRoom().add(x);
                    break;
            }
            debug(this)
        if(this.execute)
            this.execute();
        player.updateHealth(this.health);
    }
}

class Candidate extends Reward{
    public attack: boolean;
    constructor(candidateObject){
        super(candidateObject);
        this.attack = false;
        if(candidateObject)
        {
            if(candidateObject.attack)
                this.attack = candidateObject.attack;
        }
    }

    public giveReward(){
        if(this.attack && this.key)
            player.kill(this.key);
        // TODO figure out if this is in else part
        super.giveReward();
    }
}

class Weakness extends Reward {
    public isWeakness: boolean;
    public attack: number;
    public weaknessDescription: string;
    constructor(weaknessObject) {
        super(weaknessObject);
        this.isWeakness = true;
        this.attack = 1;
        this.weaknessDescription = 'The same trick won\' work twice';

        if ('isWeakness' in weaknessObject)
            this.isWeakness = weaknessObject.isWeakness;

        if (weaknessObject.attack)
            this.attack = weaknessObject.attack;

        if (weaknessObject.weaknessDescription)
            this.weaknessDescription = weaknessObject.weaknessDescription;
    }

    public has() {
        return player.has(this.key);
    }

    public canUse() {
        return player.has(this.key) && this.isWeakness;
    }

    public exploitWeakness(identifier: string) {
        // TODO complete this
        var enemy: Interactible = Interactible.findOne(identifier);
        if (this.canUse()) {
            Game.print(this.description);
            enemy.kill.updateHealth(this.attack, identifier);
            if (enemy.kill.removeWeakness) {
                this.isWeakness = false;
            }
        } else {
            Game.print(this.weaknessDescription);
            player.updateHealth(this.health);
        }
    }
}

class Interactible extends Unique{
    public shortDescription: string;
    public description: string;
    public alternatives: Array<string>;
    public take: Take;
    public open: Open;
    public kill: Kill;
    public make: Make;
    public put: Put;
    // public amount;
    static interactibleListObject = {};
    static interactibleList = {};

    constructor() {
        super();
        this.shortDescription = this.name;
        this.description = this.shortDescription;
    }

    static reset() {
        // TODO use jquery to remove this hack
        Interactible.interactibleListObject = JSON.parse(JSON.stringify(Game.currentGame().interactible));
        for (var key in Interactible.interactibleListObject) {
            var inter = Interactible.interactibleListObject[key];
            var insertInter = new Interactible();
            insertInter.name = key;

            if(inter.shortDescription)
                insertInter.shortDescription = inter.shortDescription;

            if(inter.description)
                insertInter.description = inter.description;

            if(inter.alternatives)
                insertInter.alternatives = inter.alternatives;

            insertInter.take = new Take(inter.take, inter.shortDescription);
            insertInter.open = new Open(inter.open, inter.shortDescription);
            insertInter.kill = new Kill(inter.kill, inter.shortDescription);
            insertInter.make = new Make(inter.make, inter.shortDescription);
            insertInter.put = new Put(inter.put, inter.shortDescription);

            Interactible.interactibleList[key] = (insertInter);
        }
    }

    public takeable() {
        return this.take && this.take.able;
    }

    public openable() {
        return this.open && this.open.able;
    }

    public killable() {
        return this.kill && this.kill.able;
    }

    public makeable() {
        return this.make && this.make.able;
    }

    public putable() {
        return this.put && this.put.able;
    }

    public is(identifier: string) {
        return this.name == identifier || has(this.shortDescription, identifier);
    }

    static findKey(identifier: string) {
        if (identifier in Interactible.interactibleList) {
            return identifier;
        }
        for (var key in Interactible.interactibleList) {
            var inter = Interactible.interactibleList[key];
            if (has(inter.shortDescription, identifier))
                return key;
        }
    }

    static findOne(identifier: string, type?:string) {
        if (identifier in Interactible.interactibleList) {
            var inter:Interactible = Interactible.interactibleList[identifier];
            return inter;
        }
        if(type)
        {
            for (var key in Interactible.interactibleList) {
                var inter:Interactible = Interactible.interactibleList[key];
                if (has(inter.shortDescription, identifier) || has(key, identifier) || has(inter.alternatives, identifier) )
                {
                    if(inter[type])
                        if(inter[type].satisfiedAll(true))
                            return inter;
                }
            }
        }
        for (var key in Interactible.interactibleList) {
            var inter:Interactible = Interactible.interactibleList[key];
            if (has(inter.shortDescription, identifier) || has(key, identifier) || has(inter.alternatives, identifier) )
            {
                return inter;
            }
        }
    }
}

class Character extends Unique {
    inventory: Array < any > ;
    location: string;
    health: number;
    constructor(name: string) {
        super();
        this.name = name;
        this.inventory = [];
        this.location = Game.currentGame().startLocation;
        this.health = constants.maxHP;
    }

    public die() {
        Game.print("You died");
        Game.print("Game Reset");
        Game.reset();
    }

    public updateHealth(health: number) {

        this.health += health;
        if(health!=0){
            var log:string = health<0?'lose ':'gain ';
            var logHealth:number = health<0?-health:health;
            Game.print('You ' + log + logHealth + ' health.')
        }
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
        if (this.health > constants.maxHP)
            this.health = constants.maxHP;

    }

    public toStringInventory() {
        var inventoryString = "";
        for (var element of this.inventory) {
            var interactible: Interactible = Interactible.findOne(element);
            inventoryString += interactible.shortDescription + ", ";
        }
        return inventoryString;
    }

    public inventoryEmpty() {
        return this.inventory.length < 1;
    }

    public examine(identifier: string) {
        var inRoom = Room.currentRoom().has(identifier);
        var withPlayer = player.has(identifier);
        if (inRoom)
            Game.print(Interactible.findOne(inRoom).description);
        else if (withPlayer)
            Game.print(Interactible.findOne(withPlayer).description);
        else
            Game.print("No " + identifier + " found");
    }

    public addToInventory(identifier: string) {
        var item: Interactible = Interactible.findOne(identifier);
        player.inventory.push(identifier);
        Game.print(item.shortDescription + " added to inventory.");
    }

    // Try to take the object
    public take(identifier: string) {
        var inRoom = Room.currentRoom().has(identifier, 'take');
        if (inRoom) {
            if (player.has(inRoom)) {
                Game.print("You already have " + identifier);
                return;
            }
            var interactible: Interactible = Interactible.findOne(inRoom, 'take');
            if (interactible.takeable()) {
                if (!interactible.take.satisfiedAll())
                    return;
                interactible.take.take(inRoom);
            } else {
                Game.print(interactible.take.description);
                interactible.open.loseIfNotAble();
            }
        } else {
            Game.print("Could not find " + identifier + " here");
        }
    }

    public make(identifier: string) {
        var interactible:Interactible = Interactible.findOne(identifier, 'make');
        if(interactible)
        {
            if (player.has(interactible.name)) {
                Game.print("You already have " + identifier);
                return;
            }
            if (interactible.makeable()) {
                if (!interactible.make.satisfiedAll())
                    return;
                interactible.make.make(interactible.name);
            } else {
                Game.print(interactible.make.description);
                interactible.make.loseIfNotAble();
            }
        }else{
            Game.print('You cannot make ' + identifier);
        }
    }


    public removeFromInventory(identifier: string) {
        if (Interactible.findOne(identifier))
            remove(this.inventory, identifier);
    }

    // Try to open the object
    public open(identifier: string) {
        var inRoom:string = Room.currentRoom().has(identifier, 'open');
        var exit:Exit = Room.currentRoom().findDoorExit(identifier);
        if (inRoom) {
            var interactible: Interactible = Interactible.findOne(inRoom, 'open');
            if (interactible.openable()) {
                if (!interactible.open.satisfiedAll())
                    return;
                interactible.open.open(inRoom);
            } else {
                Game.print(interactible.open.description);
                interactible.open.loseIfNotAble();
            }
        } else if (exit) {
            var door:Interactible = Room.currentRoom().findDoor(identifier);
            if(door.openable()){
                if (!door.open.satisfiedAll())
                    return;
                door.open.openDoor(exit);
            } else {
                Game.print(door.open.description);
            }
        } else {
            Game.print("Could not find " + identifier + " here");
        }
    }

    // Try to kill the object
    public kill(identifier: string) {
        var inRoom = Room.currentRoom().has(identifier, 'kill');
        if (inRoom) {
            var interactible: Interactible = Interactible.findOne(inRoom, 'kill');
            if (interactible.killable()) {
                if (!interactible.kill.satisfiedAll())
                    return;
                interactible.kill.kill(inRoom);
            } else {
                Game.print(interactible.kill.description);
                interactible.open.loseIfNotAble();
            }
        } else {
            Game.print("Could not find " + identifier + " here");
        }
    }

    public printInventory() {
        if (!this.inventoryEmpty()) {
            Game.print("You are carrying: ");
            for (var item of this.inventory) {
                var interactible: Interactible = Interactible.findOne(item);
                Game.print(interactible.shortDescription);
            }
        } else {
            Game.print(constants.emptyInventory);
        }

    }

    public has(searchItem: string) {
        if (searchItem in this.inventory)
            return searchItem;
        for (let item of this.inventory) {
            if (item == searchItem)
                return item;
            var interactible: Interactible = Interactible.findOne(item);
            if (has(interactible.shortDescription, searchItem))
                return item;
        }
        return false;
    }

    public firstMissing(searchArray) {
        if (!searchArray || searchArray.length < 1)
            return -1;
        for (var key in searchArray) {
            if (!this.has(searchArray[key]))
                return key;
        }
        return -1;

    }

    public hasAll(searchArray) {
        return this.firstMissing(searchArray) == -1;
    }



    public reset() {
        this.location = Game.currentGame().startLocation;
        this.inventory = [];
        this.health = constants.maxHP;
        if (constants.debug) {
            // this.inventory = ['woodenClub'];
            // this.location = 'treasureRoom';
        }
    }

    public moveTo(direction: string) {
        var currentRoom: Room = Room.currentRoom();
        if (currentRoom != null) {
            var exit = currentRoom.findExit(direction);
            if (exit) {
                // TODO check if locked
                if(exit.isLocked())
                {
                    Game.print(exit.description);
                    return false;
                }
                player.location = exit.to;
                return true;
            } else {
                Game.print(constants.noExit);
                return false;
            }
        } else {
            Game.print('Current location errored, please restart the game');
            return false;
        }
    }
}

class Exit {
    description: string;
    direction: string;
    to: string;
    locked: string;
    hidden: boolean;
    constructor(exitObject) {
        this.direction = exitObject.direction;
        this.to = exitObject.to;
        this.hidden = false;
        
        this.description = 'The door is locked';
        if(exitObject.description)
            this.description = exitObject.description;
        if(exitObject.hidden)
            this.hidden = exitObject.hidden;
        if(exitObject.locked)
            this.locked = exitObject.locked;
    }

    public isLocked() {
        return this.locked != undefined;
    }

    public towards(direction: string) {
        return this.direction == direction;
    }

    public unlock() {
        this.locked = undefined;
    }
}

class Room extends Unique {
    shortDescription: string;
    description: string;
    exits: Array < Exit > ;
    interactible: Array < string > ;


    static roomListObject = {};
    static roomList = {};

    static currentRoom() {
        return Room.findOne(player.location);
    }

    public enemy() {
        for (var x of this.interactible) {
            var interactible: Interactible = Interactible.findOne(x);
            if (interactible.killable())
                return interactible.kill;
        }
    }


    public remove(item: string) {
        if (item in this.interactible)
            remove(this.interactible, item);
        else {
            var interactible: string = Interactible.findKey(item);
            remove(this.interactible, interactible);
        }

    }

    public add(item: string) {
        if (Interactible.findOne(item))
            this.interactible.push(item);
    }

    static findOne(roomName: string) {
        if (roomName in Room.roomList) {
            return Room.roomList[roomName];
        }
        for (var key in Room.roomList) {
            if (Room.roomList[key].shortDescription == roomName) {
                return Room.roomList[key];
            }
        }
        return null;
    }

    public findDoorExit(identifier: string){
        for (var exit of this.exits)
        {
            if(exit.isLocked()){
                var door:Interactible = Interactible.findOne(exit.locked);
                // Silently see if any door can be opened
                if(door.is(identifier) && door.open.satisfiedAll(true))
                    return exit;
            }
        }
        for (var exit of this.exits)
        {
            if(exit.isLocked()){
                var door:Interactible = Interactible.findOne(exit.locked);
                // if not return a locked door
                if(door.is(identifier))
                    return exit;
            }
        }

    }

    public findDoor(identifier:string) {
        // Same as above, reture door instead
        for (var exit of this.exits)
        {
            if(exit.isLocked()){
                var door:Interactible = Interactible.findOne(exit.locked);
                // Silently see if any door can be opened
                if(door.is(identifier) && door.open.satisfiedAll(true))
                    return door;
            }
        }
        for (var exit of this.exits)
        {
            if(exit.isLocked()){
                var door:Interactible = Interactible.findOne(exit.locked);
                // if not return a locked door
                if(door.is(identifier))
                    return door;
            }
        }

    }

    public has(identifier: string, type?: string) {
        if(type){
            for (var element of this.interactible) {
                var interactible: Interactible = Interactible.findOne(element, type);
                if (interactible && has(interactible.shortDescription, identifier))
                    if(interactible[type] && interactible[type].satisfiedAll(true))
                        return element;
            }
        }
        for (var element of this.interactible) {
            var interactible: Interactible = Interactible.findOne(element);
            if (interactible && has(interactible.shortDescription, identifier))
                return element;
        }
        return false;
    }

    public findExit(direction: string) {
        for (var exit of this.exits)
            if (exit.towards(direction) && !exit.hidden)
                return exit;
        return null;
    }

    static reset() {
        Room.roomListObject = JSON.parse(JSON.stringify(Game.currentGame().roomList));
        Room.roomList = {};
        for (var key in Room.roomListObject) {
            var room = new Room(key);
            var thisRoom = Room.roomListObject[key];
            if(thisRoom.shortDescription)
                room.shortDescription = thisRoom.shortDescription;
            if(thisRoom.description)
                room.description = thisRoom.description;
            if(thisRoom.interactible)
                room.interactible = thisRoom.interactible;
            if(thisRoom.exits)
                for (var exitObject of thisRoom.exits) {
                    var exit = new Exit(exitObject);
                    room.exits.push(exit);
                }
            Room.roomList[key] = room;
        }
    }

    constructor(name: string) {
        super();
        this.name = name;
        this.exits = [];
        this.interactible = [];
        this.shortDescription = 'a room';
        this.description = 'You\'re in a room';
    }

    public is(name: string) {
        return this.name == name || has(this.shortDescription, name);
    }

    public describe() {
        Game.print(this.shortDescription);
        Game.print(this.description);
        // print interactibles in the room
        if (this.interactible.length > 0)
            Game.print(constants.seperator);
        for (var element of this.interactible) {
            var interactible: Interactible = Interactible.findOne(element);
            if (interactible) {
                Game.print("There is " + interactible.shortDescription + " here.");
            }
        }
        // print exits
        if (this.exits != {})
            Game.print(constants.seperator);
        var exitArray = [];
        for(var exit of this.exits){
            if(!exit.hidden)
                exitArray.push(exit.direction);
        }
        var exitString = exitArray.join(', ');
        if (exitArray.length > 1) {
            Game.print("There are exits to " + exitString)
        } else if (exitArray.length == 1) {
            Game.print("There is an exit to " + exitString)
        } else if (exitArray.length == 0) {
            Game.print("There are no exits");
        }

        for (var exit of this.exits) {
            if (exit.isLocked() && !exit.hidden) {
                var lockDescription: string = "The " + exit.direction + " exit is locked";
                // TODO, add description of door here
                var door:Interactible = Interactible.findOne(exit.locked);
                if(door)
                    lockDescription+= " with "+ door.shortDescription;
                Game.print(lockDescription);
            }
        }
    }
}

function doCommand() {
    var command = new Command();
    Game.execute(command);
}


function changeGame(key){
    variables.thisGame = key;
    Game.reset();
    Game.execute(new Command('clear'));
    Game.execute(new Command('look'));

    for(var gameKey in constants.games)
    {
        // TODO use jquery and clean up
        if(gameKey == key)
            ( < HTMLElement > document.getElementById('game'+gameKey)).setAttribute("class","active");
        else
            ( < HTMLElement > document.getElementById('game'+gameKey)).removeAttribute("class");
    }
}
let player = new Character(constants.defaultPlayerName);

// initial set up
window.onload = () => {
    
    // Add games to nav bar
    var navbarTabs = ( < HTMLElement > document.getElementById('navbar-tabs'));
    for(var key in constants.games)
    {  
        var game = constants.games[key];
        navbarTabs.innerHTML += '<li id="game'+key+'" class="" onclick="changeGame('+key+')"><a href="#">'+game.name+'</a></li>';
    }
    // Focus on input
    ( < HTMLElement > document.getElementById('controls')).innerHTML = Command.generateControlString();
    ( < HTMLInputElement > document.getElementById('command')).focus();
    changeGame(0);
}