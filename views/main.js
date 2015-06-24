var select = require('./select.js');
var Battle = require("./battle.js");

module.exports = {
	run: function() {
    	var page = tabris.create("Page", {
        	title: "Battles of the American Revolution Assistant",
            image: "images/bar.png",
            topLevel: true
		});
        tabris.create("TextView", {
        	text: "Welcome to the Battles of the American Revolution Assistant!",
        	font: "24px",
            layoutData: {left: 15, top: 20}
            
		}).appendTo(page);
        
		select.init();
        page.open();
        
        Battle.show(1);
    }
};