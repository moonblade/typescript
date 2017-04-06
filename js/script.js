var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="js/jquery.d.ts" />
var To;
/// <reference path="js/jquery.d.ts" />
(function (To) {
    To[To["room"] = 1] = "room";
    To[To["player"] = 2] = "player";
})(To || (To = {}));
var constants = {
    defaultPlayerName: 'player',
    startLocation: 'westRoom',
    endMarker: '.',
    invalidCommand: 'Invalid Command',
    emptyInventory: 'Your inventory is empty',
    noExit: 'There is no exit in that direction',
    debug: true,
    easterEgg: ['go up', 'go up', 'go down', 'go down', 'left ', 'right ', 'left ', 'right ', 'b ', 'a '],
    seperator: '..',
    maxHP: 5,
    // ROOMS IN GAME
    games: [
        {
            roomList: {
                westRoom: {
                    shortDescription: 'west room',
                    description: 'You are in the west end of a sloping east-west passage of barren rock.',
                    interactible: ['platinumKey', 'water'],
                    exits: [{
                            direction: 'east',
                            to: 'centerRoom'
                        }],
                },
                centerRoom: {
                    shortDescription: 'center room',
                    description: 'You are in the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above. There is a prominent trophy stand in the middle, there is no trophy on it.',
                    interactible: ['copperKey'],
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
                    description: 'a room of finished stone with high arched ceiling and soaring columns. The room has an aura of holyness to it.',
                    interactible: ['copperBox', 'scorpion'],
                    exits: [{
                            direction: 'west',
                            to: 'centerRoom'
                        }],
                },
                northRoom: {
                    shortDescription: 'north room',
                    description: 'a dimly room littered with skulls. It has an eerie quiteness about it, the sound of death',
                    interactible: ['silverBox', 'bottle'],
                    exits: [{
                            direction: 'south',
                            to: 'centerRoom'
                        }, {
                            direction: 'west',
                            to: 'treasureRoom',
                            locked: 'woodenDoor',
                            description: 'You expect the door to be a mirage and resolve to walk through it, you walk headlong into the door and hit your face hard.'
                        }]
                },
                southRoom: {
                    shortDescription: 'south room',
                    description: 'a damp musty smelling room. A small window overlooks a cliff where faint sounds of waves crashing can be faintly heard.',
                    interactible: ['goldBox', 'ivoryKey'],
                    exits: [{
                            direction: 'north',
                            to: 'centerRoom'
                        }]
                },
                treasureRoom: {
                    shortDescription: 'treasure room',
                    description: 'a room filled with treasures of all kinds imaginable, there are mounds of glittering gold and shining diamonds in a huge pile',
                    interactible: ['platinumBox'],
                    exits: [{
                            direction: 'east',
                            to: 'northRoom',
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
                                description: 'You try to cup the water in your hands, but its not very effective. You realize that you need some kind of container to store water.',
                            }],
                    },
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
                                description: 'The silver key falls out of the keyhole, just before the box vanishes into thin air. Poof.',
                                interactible: ['silverKey'],
                                to: To.room
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
                        able: true,
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
                }
            }
        }
    ],
};
var variables = {
    gameStepText: [],
    gameText: [],
    mute: false,
    thisGame: 0
};
function debug(string) {
    if (constants.debug) {
        console.log("d:", string);
    }
}
var Game = (function () {
    function Game() {
    }
    Game.print = function (string) {
        if (variables.mute)
            return;
        // Save till endMarker, when endMarker comes, print it on screen
        if (constants.debug)
            debug("print: " + string);
        if (string == constants.endMarker) {
            variables.gameText = variables.gameStepText.concat(variables.gameText);
            Game.updateGameScreen();
            variables.gameStepText = [];
        }
        else {
            variables.gameStepText.push(string);
        }
    };
    Game.printBold = function (string) {
        Game.print("<b>" + string + "</b>");
    };
    Game.save = function (command) {
        // TODO remove this hack, use jQuery and do it properly
        Game.savedGame[command.object] = JSON.parse(JSON.stringify(Game.commandHistory));
        Game.print("Game saved");
    };
    Game.load = function (command) {
        if (command.object in Game.savedGame) {
            Game.reset();
            Game.clear();
            Game.mute();
            for (var _i = 0, _a = Game.savedGame[command.object]; _i < _a.length; _i++) {
                var com = _a[_i];
                // Execute each of those commands
                Game.execute(new Command(com));
            }
            Game.unmute();
            Game.print("Game loaded");
        }
        else {
            if (Object.keys(Game.savedGame).length > 0) {
                Game.print("No such save game exists");
                Game.print("Saved Games are :");
                for (var key in Game.savedGame) {
                    Game.print(key);
                }
            }
            else {
                Game.print("No save games present");
            }
        }
    };
    Game.reset = function () {
        player.reset();
        Room.reset();
        Interactible.reset();
        Game.commandHistory = [];
    };
    Game.mute = function () {
        variables.mute = true;
    };
    Game.unmute = function () {
        variables.mute = false;
    };
    Game.clear = function () {
        var gameTextDiv = document.getElementById('gameText');
        gameTextDiv.innerHTML = "<p></p>";
    };
    Game.execute = function (command) {
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
        }
        else
            command.execute();
        Game.print(constants.endMarker);
        if (command.silent)
            Game.unmute();
        Game.checkEasterEgg();
        Game.updateHUD();
    };
    Game.checkEasterEgg = function () {
        var easterEggSize = constants.easterEgg.length;
        var easterEggString = JSON.stringify(constants.easterEgg);
        var lastCommandsString = JSON.stringify(Game.commandHistory.slice(-easterEggSize));
        if (easterEggString == lastCommandsString) {
            debug("EASTER EGG FOUND");
            // TODO add an interactible here
        }
    };
    Game.updateHUD = function () {
        document.getElementById("inventory").innerHTML = "<b>Inventory :</b> " + player.toStringInventory();
        document.getElementById("health").innerHTML = "<b>HP :</b> " + player.health + "/" + constants.maxHP;
        var enemy = Room.currentRoom().enemy();
        if (enemy)
            document.getElementById("enemyHealth").innerHTML = "<b>" + enemy.name + " HP :</b> " + enemy.health + "/" + enemy.maxHealth;
        else
            document.getElementById("enemyHealth").innerHTML = "";
    };
    // Send the gameStep to the screen
    Game.updateGameScreen = function () {
        var gameTextDiv = document.getElementById('gameText');
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
    };
    return Game;
}());
Game.savedGame = {};
Game.commandHistory = [];
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
var Command = (function () {
    function Command(str) {
        if (!str)
            var str = document.getElementById('command').value;
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
        document.getElementById('command').value = "";
    }
    Command.generateControlString = function () {
        var controlString = "<b>Controls :</b> ";
        for (var key in Command.commands) {
            var command = Command.commands[key];
            var extra = (command.extra ? " " + command.extra : "");
            controlString += key + extra + ", ";
        }
        return controlString;
    };
    Command.prototype.toString = function () {
        return this.verb + " " + this.object;
    };
    Command.generateHelp = function () {
        Game.print("The following commands are available");
        for (var key in Command.commands) {
            var command = Command.commands[key];
            var extra = (command.extra ? " " + command.extra : "");
            var helpText = key + extra;
            if (command.alternatives) {
                for (var _i = 0, _a = command.alternatives; _i < _a.length; _i++) {
                    var alternative = _a[_i];
                    helpText += "/ " + alternative + extra;
                }
            }
            Game.print(helpText + " : " + command.desc);
            if (command.extraDescription)
                Game.print(command.extraDescription);
        }
    };
    // Check if a given command is valid
    Command.prototype.checkValidity = function () {
        var _this = this;
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
                this.execute = function () {
                    if (com.execute)
                        com.execute(_this);
                };
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
    };
    return Command;
}());
Command.commands = {
    'inventory': {
        desc: 'Print inventory',
        alternatives: ['inv'],
        execute: function (command) {
            player.printInventory();
        }
    },
    'look': {
        desc: 'Give description of the room you\'re in',
        alternatives: ['info'],
        execute: function (command) {
            Room.roomList[player.location].describe();
        }
    },
    'examine': {
        desc: 'Give description of the item',
        extra: '[item]',
        alternatives: ['ex', 'describe', 'desc'],
        missedExtra: 'Please specify what to examine',
        execute: function (command) {
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
        execute: function (command) {
            if (player.moveTo(command.object))
                Room.roomList[player.location].describe();
        }
    },
    'take': {
        desc: 'Take an object',
        alternatives: ['pick', 'fill'],
        extra: '[object]',
        missedExtra: 'Please specify what to take',
        execute: function (command) {
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
        execute: function (command) {
            player.open(command.object);
        }
    },
    'kill': {
        desc: 'Try to kill the enemy',
        alternatives: ['attack'],
        extra: '[enemy]',
        missedExtra: 'Please specify what to attack',
        execute: function (command) {
            player.kill(command.object);
        }
    },
    'make': {
        desc: 'Make object if the materials are present',
        alternatives: ['craft', 'build'],
        extra: '[object]',
        missedExtra: 'Please specify what to make',
    },
    'ls': {
        desc: 'Combination of inventory and look',
        execute: function (command) {
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
        execute: function (command) {
            Game.save(command);
        }
    },
    'load': {
        desc: 'Load a checkpoint that has been saved',
        extra: '[tag]',
        noSave: true,
        defaultExtra: 'saveGame',
        missedExtra: 'Please specify tag to load from',
        execute: function (command) {
            Game.load(command);
        }
    },
    'reset': {
        desc: 'Start game from beginning again',
        alternatives: ['redo', 'reboot', 'restart'],
        execute: function (command) {
            Game.reset();
            Game.print('Game reset');
        }
    },
    'clear': {
        desc: 'Clear the screen of game text',
        silent: true,
        execute: function (command) {
            Game.clear();
        }
    },
    'help': {
        desc: 'Print this help menu',
        execute: function (command) {
            Command.generateHelp();
        }
    },
};
var Unique = (function () {
    function Unique() {
    }
    return Unique;
}());
// Super of take, open, make classes
var Interaction = (function (_super) {
    __extends(Interaction, _super);
    function Interaction(interactionObject, name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.noremove = false;
        _this.able = false;
        _this.canString = 'cannot ';
        _this.needs = [];
        _this.description = 'You ' + _this.canString + 'interact with ' + name;
        _this.loss = new Reward({});
        if (interactionObject) {
            if (interactionObject.description)
                _this.description = interactionObject.description;
            if (interactionObject.able)
                _this.able = interactionObject.able;
            if (interactionObject.noremove)
                _this.noremove = interactionObject.noremove;
            if (interactionObject.loss)
                _this.loss = new Reward(interactionObject.loss);
            if (interactionObject.needs) {
                for (var _i = 0, _a = interactionObject.needs; _i < _a.length; _i++) {
                    var x = _a[_i];
                    _this.needs.push(new Reward(x));
                }
            }
        }
        _this.canString = _this.able ? '' : 'cannot ';
        return _this;
    }
    Interaction.prototype.takeLoss = function () {
        this.loss.giveReward();
    };
    Interaction.prototype.satisfiedAll = function () {
        for (var _i = 0, _a = this.needs; _i < _a.length; _i++) {
            var reward = _a[_i];
            if (!reward.satisfied()) {
                reward.giveReward();
                return false;
            }
        }
        return true;
    };
    Interaction.prototype.satisfiedOne = function () {
        for (var _i = 0, _a = this.needs; _i < _a.length; _i++) {
            var reward = _a[_i];
            if (reward.satisfied()) {
                return reward;
            }
        }
        return false;
    };
    Interaction.prototype.removeRequirements = function () {
        for (var _i = 0, _a = this.needs; _i < _a.length; _i++) {
            var reward = _a[_i];
            reward.remove();
        }
    };
    return Interaction;
}(Unique));
var Take = (function (_super) {
    __extends(Take, _super);
    function Take(takeObject, name) {
        var _this = _super.call(this, takeObject, name) || this;
        _this.amount = 1;
        _this.description = 'You ' + _this.canString + 'pick up ' + name;
        if (takeObject) {
            if (takeObject.description)
                _this.description = takeObject.description;
            if (takeObject.amount)
                _this.amount = takeObject.amount;
        }
        return _this;
    }
    Take.prototype.takeOne = function () {
        this.amount -= 1;
    };
    Take.prototype.moreThanOne = function () {
        return this.amount > 1;
    };
    Take.prototype.take = function (inRoom) {
        if (this.moreThanOne()) {
            this.takeOne();
        }
        else if (this.noremove) {
            // Don't remove item ever on take
        }
        else {
            var room = Room.currentRoom();
            room.remove(inRoom);
        }
        Game.print(this.description);
        player.addToInventory(inRoom);
    };
    return Take;
}(Interaction));
var Open = (function (_super) {
    __extends(Open, _super);
    function Open(openObject, name) {
        var _this = _super.call(this, openObject, name) || this;
        _this.description = 'You ' + _this.canString + 'open ' + name;
        _this.content = [];
        if (openObject) {
            if (openObject.description)
                _this.description = openObject.description;
            if (openObject.content)
                for (var _i = 0, _a = openObject.content; _i < _a.length; _i++) {
                    var x = _a[_i];
                    _this.content.push(new Reward(x));
                }
        }
        return _this;
    }
    Open.prototype.getContent = function () {
        for (var _i = 0, _a = this.content; _i < _a.length; _i++) {
            var reward = _a[_i];
            reward.giveReward();
        }
    };
    Open.prototype.open = function (inRoom) {
        if (this.noremove) {
            // Don't remove item ever on open
        }
        else {
            var room = Room.currentRoom();
            room.remove(inRoom);
            this.removeRequirements();
        }
        Game.print(this.description);
        this.getContent();
    };
    Open.prototype.openDoor = function (exit) {
        exit.unlock();
        this.removeRequirements();
        Game.print(this.description);
    };
    return Open;
}(Interaction));
var Kill = (function (_super) {
    __extends(Kill, _super);
    function Kill(openObject, name) {
        var _this = _super.call(this, openObject, name) || this;
        _this.description = 'You ' + _this.canString + 'kill ' + name;
        _this.loot = [];
        _this.removeWeakness = false;
        _this.health = 1;
        _this.health = 1;
        _this.weakness = [];
        if (openObject) {
            if (openObject.description)
                _this.description = openObject.description;
            if (openObject.removeWeakness)
                _this.removeWeakness = openObject.removeWeakness;
            if (openObject.health) {
                _this.health = openObject.health;
                _this.maxHealth = openObject.health;
            }
            if (openObject.loot)
                for (var _i = 0, _a = openObject.loot; _i < _a.length; _i++) {
                    var x = _a[_i];
                    _this.loot.push(new Reward(x));
                }
            if (openObject.weakness)
                for (var _b = 0, _c = openObject.weakness; _b < _c.length; _b++) {
                    var x = _c[_b];
                    _this.weakness.push(new Weakness(x));
                }
        }
        return _this;
    }
    Kill.prototype.getLoot = function () {
        for (var _i = 0, _a = this.loot; _i < _a.length; _i++) {
            var reward = _a[_i];
            reward.giveReward();
        }
    };
    Kill.prototype.updateHealth = function (health, identifier) {
        this.health += health;
        if (this.health <= 0) {
            Game.print('You defeated the ' + this.name);
            this.getLoot();
            Room.currentRoom().remove(identifier);
        }
    };
    Kill.prototype.kill = function (inRoom) {
        var room = Room.currentRoom();
        for (var _i = 0, _a = this.weakness; _i < _a.length; _i++) {
            var x = _a[_i];
            if (x.canUse()) {
                x.exploitWeakness(inRoom);
                return;
            }
        }
        for (var _b = 0, _c = this.weakness; _b < _c.length; _b++) {
            var x = _c[_b];
            if (x.has()) {
                x.exploitWeakness(inRoom);
                return;
            }
        }
        this.takeLoss();
    };
    return Kill;
}(Interaction));
var Reward = (function () {
    function Reward(rewardObject) {
        if (rewardObject.key)
            this.key = rewardObject.key;
        if (rewardObject.room)
            this.room = rewardObject.room;
        if (rewardObject.description)
            this.description = rewardObject.description;
        if (rewardObject.interactible)
            this.interactible = rewardObject.interactible;
        else
            this.interactible = [];
        if (rewardObject.to != undefined)
            this.to = rewardObject.to;
        else
            this.to = To.player;
        if (rewardObject.health)
            this.health = rewardObject.health;
        else
            this.health = 0;
    }
    Reward.prototype.remove = function () {
        player.removeFromInventory(this.key);
    };
    Reward.prototype.satisfied = function () {
        if (!this.key && !this.room)
            return true;
        return player.has(this.key) || Room.currentRoom().is(this.room);
    };
    Reward.prototype.giveReward = function () {
        Game.print(this.description);
        for (var _i = 0, _a = this.interactible; _i < _a.length; _i++) {
            var x = _a[_i];
            if (this.to == To.player)
                player.addToInventory(x);
            else
                Room.currentRoom().add(x);
        }
        player.updateHealth(this.health);
    };
    return Reward;
}());
var Weakness = (function (_super) {
    __extends(Weakness, _super);
    function Weakness(weaknessObject) {
        var _this = _super.call(this, weaknessObject) || this;
        _this.isWeakness = true;
        _this.attack = 1;
        _this.weaknessDescription = 'The same trick won\' work twice';
        if (weaknessObject.isWeakness)
            _this.isWeakness = weaknessObject.isWeakness;
        if (weaknessObject.attack)
            _this.attack = weaknessObject.attack;
        if (weaknessObject.weaknessDescription)
            _this.weaknessDescription = weaknessObject.weaknessDescription;
        return _this;
    }
    Weakness.prototype.has = function () {
        return player.has(this.key);
    };
    Weakness.prototype.canUse = function () {
        return player.has(this.key) && this.isWeakness;
    };
    Weakness.prototype.exploitWeakness = function (identifier) {
        // TODO complete this
        var enemy = Interactible.findOne(identifier);
        if (this.canUse()) {
            Game.print(this.description);
            enemy.kill.updateHealth(this.attack, identifier);
            if (enemy.kill.removeWeakness) {
                this.isWeakness = false;
            }
        }
        else {
            Game.print(this.weaknessDescription);
            player.updateHealth(this.health);
        }
    };
    return Weakness;
}(Reward));
var Interactible = (function (_super) {
    __extends(Interactible, _super);
    function Interactible() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Interactible.reset = function () {
        // TODO use jquery to remove this hack
        for (var key in Interactible.interactibleListObject) {
            var inter = Interactible.interactibleListObject[key];
            var insertInter = new Interactible();
            insertInter.name = key;
            insertInter.description = inter.description;
            insertInter.shortDescription = inter.shortDescription;
            insertInter.take = new Take(inter.take, inter.shortDescription);
            insertInter.open = new Open(inter.open, inter.shortDescription);
            insertInter.kill = new Kill(inter.kill, inter.shortDescription);
            Interactible.interactibleList[key] = (insertInter);
        }
    };
    Interactible.prototype.takeable = function () {
        return this.take && this.take.able;
    };
    Interactible.prototype.openable = function () {
        return this.open && this.open.able;
    };
    Interactible.prototype.killable = function () {
        return this.kill && this.kill.able;
    };
    Interactible.prototype.is = function (identifier) {
        return this.name == identifier || has(this.shortDescription, identifier);
    };
    Interactible.findKey = function (identifier) {
        if (identifier in Interactible.interactibleList) {
            return identifier;
        }
        for (var key in Interactible.interactibleList) {
            var inter = Interactible.interactibleList[key];
            if (has(inter.shortDescription, identifier))
                return key;
        }
    };
    Interactible.findOne = function (identifier) {
        if (identifier in Interactible.interactibleList) {
            return Interactible.interactibleList[identifier];
        }
        for (var key in Interactible.interactibleList) {
            var inter = Interactible.interactibleList[key];
            if (has(inter.shortDescription, identifier))
                return inter;
        }
    };
    return Interactible;
}(Unique));
// public amount;
Interactible.interactibleListObject = JSON.parse(JSON.stringify(constants.games[variables.thisGame].interactible));
Interactible.interactibleList = {};
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.inventory = [];
        _this.location = constants.startLocation;
        _this.health = constants.maxHP;
        return _this;
    }
    Character.prototype.die = function () {
        Game.print("You died");
        Game.print("Game Reset");
        Game.reset();
    };
    Character.prototype.updateHealth = function (health) {
        this.health += health;
        if (health != 0) {
            var log = health < 0 ? 'lose ' : 'gain ';
            var logHealth = health < 0 ? -health : health;
            Game.print('You ' + log + logHealth + ' health.');
        }
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
        if (this.health > constants.maxHP)
            this.health = constants.maxHP;
    };
    Character.prototype.toStringInventory = function () {
        var inventoryString = "";
        for (var _i = 0, _a = this.inventory; _i < _a.length; _i++) {
            var element = _a[_i];
            var interactible = Interactible.findOne(element);
            inventoryString += interactible.shortDescription + ", ";
        }
        return inventoryString;
    };
    Character.prototype.inventoryEmpty = function () {
        return this.inventory.length < 1;
    };
    Character.prototype.examine = function (identifier) {
        var inRoom = Room.currentRoom().has(identifier);
        var withPlayer = player.has(identifier);
        if (inRoom)
            Game.print(Interactible.findOne(inRoom).description);
        else if (withPlayer)
            Game.print(Interactible.findOne(withPlayer).description);
        else
            Game.print("No " + identifier + " found");
    };
    Character.prototype.addToInventory = function (identifier) {
        var item = Interactible.findOne(identifier);
        player.inventory.push(identifier);
        Game.print(item.shortDescription + " added to inventory.");
    };
    // Try to take the object
    Character.prototype.take = function (identifier) {
        var inRoom = Room.currentRoom().has(identifier);
        if (inRoom) {
            if (player.has(inRoom)) {
                Game.print("You already have " + identifier);
                return;
            }
            var interactible = Interactible.findOne(inRoom);
            if (interactible.takeable()) {
                if (!interactible.take.satisfiedAll())
                    return;
                interactible.take.take(inRoom);
            }
            else {
                Game.print(interactible.take.description);
            }
        }
        else {
            Game.print("Could not find " + identifier + " here");
        }
    };
    Character.prototype.removeFromInventory = function (identifier) {
        if (Interactible.findOne(identifier))
            remove(this.inventory, identifier);
    };
    // Try to open the object
    Character.prototype.open = function (identifier) {
        var inRoom = Room.currentRoom().has(identifier);
        var exit = Room.currentRoom().findDoorExit(identifier);
        if (inRoom) {
            var interactible = Interactible.findOne(inRoom);
            if (interactible.openable()) {
                if (!interactible.open.satisfiedAll())
                    return;
                interactible.open.open(inRoom);
            }
            else {
                Game.print(interactible.open.description);
            }
        }
        else if (exit) {
            var door = Room.currentRoom().findDoor(identifier);
            if (door.openable()) {
                if (!door.open.satisfiedAll())
                    return;
                door.open.openDoor(exit);
            }
            else {
                Game.print(door.open.description);
            }
        }
        else {
            Game.print("Could not find " + identifier + " here");
        }
    };
    // Try to kill the object
    Character.prototype.kill = function (identifier) {
        var inRoom = Room.currentRoom().has(identifier);
        if (inRoom) {
            var interactible = Interactible.findOne(inRoom);
            if (interactible.killable()) {
                if (!interactible.kill.satisfiedAll())
                    return;
                interactible.kill.kill(inRoom);
            }
            else {
                Game.print(interactible.kill.description);
            }
        }
        else {
            Game.print("Could not find " + identifier + " here");
        }
    };
    Character.prototype.printInventory = function () {
        if (!this.inventoryEmpty()) {
            Game.print("You are carrying: ");
            for (var _i = 0, _a = this.inventory; _i < _a.length; _i++) {
                var item = _a[_i];
                var interactible = Interactible.findOne(item);
                Game.print(interactible.shortDescription);
            }
        }
        else {
            Game.print(constants.emptyInventory);
        }
    };
    Character.prototype.has = function (searchItem) {
        if (searchItem in this.inventory)
            return searchItem;
        for (var _i = 0, _a = this.inventory; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item == searchItem)
                return item;
            var interactible = Interactible.findOne(item);
            if (has(interactible.shortDescription, searchItem))
                return item;
        }
        return false;
    };
    Character.prototype.firstMissing = function (searchArray) {
        if (!searchArray || searchArray.length < 1)
            return -1;
        for (var key in searchArray) {
            if (!this.has(searchArray[key]))
                return key;
        }
        return -1;
    };
    Character.prototype.hasAll = function (searchArray) {
        return this.firstMissing(searchArray) == -1;
    };
    Character.prototype.reset = function () {
        this.location = constants.startLocation;
        this.inventory = [];
        this.health = constants.maxHP;
        if (constants.debug) {
            // this.inventory = ['normalKey', 'sword'];
            // this.location = 'northRoom';
        }
    };
    Character.prototype.moveTo = function (direction) {
        var currentRoom = Room.currentRoom();
        if (currentRoom != null) {
            var exit = currentRoom.findExit(direction);
            if (exit) {
                // TODO check if locked
                if (exit.isLocked()) {
                    Game.print(exit.description);
                    return false;
                }
                player.location = exit.to;
                return true;
            }
            else {
                Game.print(constants.noExit);
                return false;
            }
        }
        else {
            Game.print('Current location errored, please restart the game');
            return false;
        }
    };
    return Character;
}(Unique));
var Exit = (function () {
    function Exit(exitObject) {
        this.direction = exitObject.direction;
        this.to = exitObject.to;
        this.locked = exitObject.locked;
        this.description = 'The door is locked';
        if (exitObject.description)
            this.description = exitObject.description;
    }
    Exit.prototype.isLocked = function () {
        return this.locked != undefined;
    };
    Exit.prototype.towards = function (direction) {
        return this.direction == direction;
    };
    Exit.prototype.unlock = function () {
        this.locked = undefined;
    };
    return Exit;
}());
var Room = (function (_super) {
    __extends(Room, _super);
    function Room(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.exits = [];
        _this.interactible = [];
        return _this;
    }
    Room.currentRoom = function () {
        return Room.findOne(player.location);
    };
    Room.prototype.enemy = function () {
        for (var _i = 0, _a = this.interactible; _i < _a.length; _i++) {
            var x = _a[_i];
            var interactible = Interactible.findOne(x);
            if (interactible.killable())
                return interactible.kill;
        }
    };
    Room.prototype.remove = function (item) {
        if (item in this.interactible)
            remove(this.interactible, item);
        else {
            var interactible = Interactible.findKey(item);
            remove(this.interactible, interactible);
        }
    };
    Room.prototype.add = function (item) {
        if (Interactible.findOne(item))
            this.interactible.push(item);
    };
    Room.findOne = function (roomName) {
        if (roomName in Room.roomList) {
            return Room.roomList[roomName];
        }
        for (var key in Room.roomList) {
            if (Room.roomList[key].shortDescription == roomName) {
                return Room.roomList[key];
            }
        }
        return null;
    };
    Room.prototype.findDoorExit = function (identifier) {
        for (var _i = 0, _a = this.exits; _i < _a.length; _i++) {
            var exit = _a[_i];
            if (exit.isLocked()) {
                var door = Interactible.findOne(exit.locked);
                if (door.is(identifier))
                    return exit;
            }
        }
    };
    Room.prototype.findDoor = function (identifier) {
        // Same as above, reture door instead
        for (var _i = 0, _a = this.exits; _i < _a.length; _i++) {
            var exit = _a[_i];
            if (exit.isLocked()) {
                var door = Interactible.findOne(exit.locked);
                if (door.is(identifier))
                    return door;
            }
        }
    };
    Room.prototype.has = function (identifier) {
        for (var _i = 0, _a = this.interactible; _i < _a.length; _i++) {
            var element = _a[_i];
            // Check if element is part of room, else if shortDescription in room
            if (has(element, identifier))
                return element;
            var interactible = Interactible.findOne(element);
            if (interactible && has(interactible.shortDescription, identifier))
                return element;
        }
        return false;
    };
    Room.prototype.hasLock = function (identifier) {
        // todo find whats this supposed to be
    };
    Room.prototype.findExit = function (direction) {
        for (var _i = 0, _a = this.exits; _i < _a.length; _i++) {
            var exit = _a[_i];
            if (exit.towards(direction))
                return exit;
        }
        return null;
    };
    Room.reset = function () {
        Room.roomList = {};
        for (var key in Room.roomListObject) {
            var room = new Room(key);
            var thisRoom = Room.roomListObject[key];
            room.shortDescription = thisRoom.shortDescription;
            room.description = thisRoom.description;
            room.interactible = thisRoom.interactible;
            if (thisRoom.exits)
                for (var _i = 0, _a = thisRoom.exits; _i < _a.length; _i++) {
                    var exitObject = _a[_i];
                    var exit = new Exit(exitObject);
                    room.exits.push(exit);
                }
            Room.roomList[key] = room;
        }
    };
    Room.prototype.is = function (name) {
        return this.name == name || has(this.shortDescription, name);
    };
    Room.prototype.describe = function () {
        Game.print(this.shortDescription);
        Game.print(this.description);
        // print interactibles in the room
        if (this.interactible.length > 0)
            Game.print(constants.seperator);
        for (var _i = 0, _a = this.interactible; _i < _a.length; _i++) {
            var element = _a[_i];
            var interactible = Interactible.findOne(element);
            if (interactible) {
                Game.print("There is " + interactible.shortDescription + " here.");
            }
        }
        // print exits
        if (this.exits != {})
            Game.print(constants.seperator);
        var exitArray = this.exits.map(function (x) {
            return x.direction;
        });
        var exitString = exitArray.join(', ');
        if (exitArray.length > 1) {
            Game.print("There are exits to " + exitString);
        }
        else if (exitArray.length == 1) {
            Game.print("There is an exit to " + exitString);
        }
        for (var _b = 0, _c = this.exits; _b < _c.length; _b++) {
            var exit = _c[_b];
            if (exit.isLocked()) {
                var lockDescription = "The " + exit.direction + " exit is locked";
                // TODO, add description of door here
                var door = Interactible.findOne(exit.locked);
                if (door)
                    lockDescription += " with " + door.shortDescription;
                Game.print(lockDescription);
            }
        }
    };
    return Room;
}(Unique));
Room.roomListObject = JSON.parse(JSON.stringify(constants.games[variables.thisGame].roomList));
Room.roomList = {};
function doCommand() {
    var command = new Command();
    Game.execute(command);
}
var player = new Character(constants.defaultPlayerName);
Game.reset();
// initial look command
window.onload = function () {
    var command = new Command('look');
    Game.execute(command);
    // Focus on input
    document.getElementById('controls').innerHTML = Command.generateControlString();
    document.getElementById('command').focus();
};
