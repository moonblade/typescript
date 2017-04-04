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
var constants = {
    defaultPlayerName: 'player',
    startLocation: 'westRoom',
    endMarker: '.',
    invalidCommand: 'Invalid Command',
    emptyInventory: 'Your inventory is empty',
    noExit: 'There is no exit in that direction',
    debug: true,
    easterEgg: ['go up', 'go up', 'go down', 'go down', 'left ', 'right ', 'left ', 'right ', 'b ', 'a '],
    seperator: '..'
};
var variables = {
    gameStepText: [],
    gameText: [],
    mute: false
};
function debug(string) {
    if (constants.debug) {
        console.log("d:", string);
    }
}
var Game = (function () {
    function Game() {
    }
    // static commandHistory:Array<Command> = [];
    Game.print = function (string) {
        if (variables.mute)
            return;
        // Save till endMarker, when endMarker comes, print it on screen
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
            // TODO load game
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
        document.getElementById("health").innerHTML = "<b>HP :</b> " + player.health;
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
        alternatives: ['ex'],
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
    },
    'attack': {
        desc: 'Try to kill the enemy',
        alternatives: ['kill'],
        extra: '[enemy]',
        missedExtra: 'Please specify what to attack',
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
Unique.ids = [];
var Take = (function () {
    function Take(name) {
        this.able = false;
        this.noremove = false;
        this.needs = [];
        this.amount = 1;
        this.description = 'Cannot take ' + name;
    }
    Take.prototype.needsArray = function () {
        return this.needs.map(function (x) {
            return x.key;
        });
    };
    Take.prototype.moreThanOne = function () {
        return this.amount > 1;
    };
    Take.prototype.takeOne = function () {
        this.amount -= 1;
    };
    Take.prototype.cannotTake = function (identifier) {
        for (var _i = 0, _a = this.needs; _i < _a.length; _i++) {
            var reward = _a[_i];
            if (reward.is(identifier)) {
                reward.giveReward();
                return;
            }
        }
    };
    return Take;
}());
var Reward = (function () {
    function Reward(rewardObject) {
        if (rewardObject.key)
            this.key = rewardObject.key;
        if (rewardObject.description)
            this.description = rewardObject.description;
        if (rewardObject.interactible)
            this.interactible = rewardObject.interactible;
        else
            this.interactible = [];
        if (rewardObject.health)
            this.health = rewardObject.health;
        else
            this.health = 0;
    }
    Reward.prototype.is = function (key) {
        return this.key == key;
    };
    Reward.prototype.giveReward = function () {
        Game.print(this.description);
        for (var _i = 0, _a = this.interactible; _i < _a.length; _i++) {
            var x = _a[_i];
            player.addToInventory(x);
        }
        player.changeHealth(this.health);
    };
    return Reward;
}());
var Interactible = (function () {
    function Interactible() {
    }
    Interactible.reset = function () {
        // TODO use jquery to remove this hack
        for (var key in Interactible.interactibleListObject) {
            var inter = Interactible.interactibleListObject[key];
            var insertInter = new Interactible();
            insertInter.description = inter.description;
            insertInter.shortDescription = inter.shortDescription;
            insertInter.take = new Take(insertInter.shortDescription);
            if (inter.take) {
                if (inter.take.description)
                    insertInter.take.description = inter.take.description;
                if (inter.take.able)
                    insertInter.take.able = inter.take.able;
                if (inter.take.noremove)
                    insertInter.take.noremove = inter.take.noremove;
                if (inter.take.needs) {
                    for (var _i = 0, _a = inter.take.needs; _i < _a.length; _i++) {
                        var x = _a[_i];
                        insertInter.take.needs.push(new Reward(x));
                    }
                }
            }
            Interactible.interactibleList[key] = (insertInter);
        }
    };
    Interactible.prototype.takeable = function () {
        return this.take && this.take.able;
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
}());
// public amount;
Interactible.interactibleListObject = {
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
                    interactible: ['bottle']
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
        description: 'A knee high box, made completely from copper. There\'s a small keyhole at the front of the box, a picutre of an orchid underneath it',
        take: {
            description: 'You try to lift the box, but it is too heavy.'
        },
        open: {
            description: 'Fitting the key into the box, you give it a twist. It opens with a creak.',
            needs: {
                copperKey: {}
            }
        }
    }
};
Interactible.interactibleList = {};
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.inventory = [];
        _this.location = constants.startLocation;
        _this.health = 5;
        return _this;
    }
    Character.prototype.die = function () {
        Game.print("You died");
        Game.reset();
    };
    Character.prototype.changeHealth = function (health) {
        this.health += health;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
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
    Character.prototype.take = function (identifier) {
        var inRoom = Room.currentRoom().has(identifier);
        if (inRoom) {
            if (player.has(inRoom)) {
                Game.print("You already have " + identifier);
                return;
            }
            var interactible = Interactible.findOne(inRoom);
            if (interactible.takeable()) {
                var needArray = interactible.take.needsArray();
                if (!player.hasAll(needArray)) {
                    var notHaveIdentifier = needArray[player.firstMissing(needArray)];
                    interactible.take.cannotTake(notHaveIdentifier);
                    return;
                }
                // TODO make this oop type, don't access elements
                if (interactible.take.moreThanOne()) {
                    interactible.take.takeOne();
                }
                else if (interactible.take.noremove) {
                    // Don't remove item ever on take
                }
                else {
                    var room = Room.currentRoom();
                    remove(room.interactible, inRoom);
                }
                player.addToInventory(inRoom);
            }
            else {
                Game.print(interactible.take.description);
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
                // TODO Change to description of item
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
        if (constants.debug) {
            this.inventory = [];
            this.location = 'westRoom';
            // this.location = 'eastRoom';
        }
    };
    Character.prototype.moveTo = function (direction) {
        var currentRoom = Room.currentRoom();
        if (currentRoom != null) {
            var exit = currentRoom.findExit(direction);
            if (exit) {
                // TODO check if locked
                player.location = exit.to;
                return true;
            }
            else {
                Game.print(constants.noExit);
                return false;
            }
            // this.location = location;
        }
        else {
            Game.print('Current location errored, please restart the game');
            return false;
        }
    };
    return Character;
}(Unique));
var Room = (function (_super) {
    __extends(Room, _super);
    function Room(name) {
        var _this = _super.call(this) || this;
        _this.exits = {};
        _this.name = name;
        return _this;
    }
    Room.currentRoom = function () {
        return Room.findOne(player.location);
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
    Room.prototype.findExit = function (direction) {
        if (direction in this.exits) {
            return this.exits[direction];
        }
        else {
            return null;
        }
    };
    Room.reset = function () {
        Room.roomList = {};
        for (var key in Room.roomListObject) {
            var room = new Room(key);
            room.shortDescription = Room.roomListObject[key].shortDescription;
            room.description = Room.roomListObject[key].description;
            room.interactible = Room.roomListObject[key].interactible;
            Room.roomList[key] = room;
        }
        // Make exits
        for (var key in Room.roomListObject) {
            for (var exitKey in Room.roomListObject[key].exits) {
                var exit = Room.roomListObject[key].exits[exitKey];
                var roomExit = {};
                roomExit['to'] = exit.to;
                roomExit['toRoom'] = Room.findOne(exit.to);
                roomExit['locked'] = exit.locked;
                Room.roomList[key].exits[exitKey] = roomExit;
            }
        }
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
        var exitArray = Object.keys(this.exits);
        var exitString = exitArray.join(', ');
        if (exitArray.length > 1) {
            Game.print("There are exits to " + exitString);
        }
        if (exitArray.length == 1) {
            Game.print("There is an exit to " + exitString);
        }
        for (var key in this.exits) {
            if (this.exits[key].locked) {
                var lockDescription = "The " + key + " exit is locked.";
                // TODO, add description of door here
                Game.print(lockDescription);
            }
        }
    };
    return Room;
}(Unique));
Room.roomListObject = {
    westRoom: {
        shortDescription: 'west room',
        description: 'You are in the west end of a sloping east-west passage of barren rock.',
        interactible: ['platinumKey', 'water'],
        exits: {
            east: {
                to: 'centerRoom'
            },
        }
    },
    centerRoom: {
        shortDescription: 'center room',
        description: 'You are in the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above. There is a prominent trophy stand in the middle, there is no trophy on it.',
        interactible: ['copperKey'],
        exits: {
            west: {
                to: 'westRoom'
            },
            east: {
                to: 'eastRoom'
            }
        },
    },
    eastRoom: {
        shortDescription: 'east room',
        description: 'a room of finished stone with high arched ceiling and soaring columns. The room has an aura of holyness to it.',
        interactible: ['copperBox', 'scorpion'],
        exits: {
            west: {
                to: 'centerRoom'
            }
        }
    }
};
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
