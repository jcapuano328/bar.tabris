var Battles = require('../core/battles.js');
var Current = require('../core/current.js');
var Turn = require('../views/turn.js');
var Initiative = require('../views/initiative.js');
var Fire = require('../views/fire.js');
var Melee = require('../views/melee.js');
var Morale = require('../views/morale.js');
var Victory = require('../views/victory.js');
var General = require('../views/general.js');
var config = require('../config.js');
var log = require('../core/log.js');

function createTab(title, image, tabcontent) {
	var tab = tabris.create("Tab", {
    	layoutData: {left: 0, right: 0, top: 0, bottom: 0},
    	title: title, // converted to upper-case on Android
        image: {src: image, scale: 2} // image only used by iOS
	});
    tabcontent = tabcontent || tabris.create("TextView", {
    	layoutData: {centerX: 0, centerY: 0},
        text: "Content of Tab " + title
	});
    tabcontent.appendTo(tab);
    tab.reset = tabcontent.reset || function() {};
    return tab;
}

var btnReset;

function show(battle) {
	var tabs = [];
	var page = tabris.create("Page", {
    	title: battle.name
	});
    
    btnReset = btnReset ||
	    tabris.create("Action", {
	    	image: "images/refresh.png"
		}).on("select", function() {
	    	log.debug('Reset ' + battle.name);
	    	Current.reset(battle);
	        turnView.reset();
	        tabs.forEach(function(tab) {
	        	if (tab.reset && typeof tab.reset == 'function') {
	            	tab.reset();
	            }
	        });
		});
    
    var turnView = Turn.create(battle);
    turnView.appendTo(page);
    
    // tabs
    var folder = tabris.create("TabFolder", {
		layoutData: {left: 0, top: [turnView, 10], right: 0, bottom: 0},
	    paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
	});
    
    tabs.push(createTab('Initiative', 'images/dice.png', Initiative.create(battle, turnView.initiativeHandler)).appendTo(folder));
    tabs.push(createTab('Fire', 'images/fire.png', Fire.create(battle)).appendTo(folder));
    tabs.push(createTab('Melee', 'images/melee.png', Melee.create(battle)).appendTo(folder));
    tabs.push(createTab('Morale', 'images/morale.png', Morale.create(battle)).appendTo(folder));
    tabs.push(createTab('Victory', 'images/victory.png', Victory.create(battle)).appendTo(folder));
    tabs.push(createTab('General', 'images/dice.png', General.create(battle)).appendTo(folder));
    
    folder.appendTo(page);
    
    page.open();
}    


module.exports = {
	show: function(id) {
    	var battle = Battles.get(id);
    	log.debug('Showing ' + battle.name);
        var current = Current.get(battle);
        if (current.battle != battle.id) {
        	Current.reset(battle);
        }
    	show(battle);
    }
};