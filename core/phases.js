var log = require('../core/log.js');

var defaultPhases = [
	"Initiative", 
    {
    	"American": [
        	"American. Movement", 
            "American. Rally", 
			"British. Def Arty Fire", 
            "American. Rifle Fire", 
            "American. Close Combat"
		],
    	"British": [
            "British. Movement",
			"British. Rally", 
			"American. Def Arty Fire", 
			"British. Rifle Fire", 
			"British. Close Combat"
		]
	},                                    
	"End of Turn"
];

var phases = defaultPhases;

module.exports = {
	length: function() {
    	var count = 0;
        phases.forEach(function(phase) {
        	if (typeof phase == 'string') {
            	count++;
            }
            else if (typeof phase == 'object') {
            	for (var nationality in phase) {
	            	count += phase[nationality].length || 0;
                }
            }
        });
        return count;
	},        
    init: function(battle) {
    	phases = battle.phases || defaultPhases;
    },
	all: function(nationality) {
    	var l = phases.slice(0,1);
        
        var nat = [];
        var othernat = [];
        phases.forEach(function(phase) {
            if (typeof phase == 'object') {
            	for (var n in phase) {
                	if (n == nationality) {
                    	nat = phase[n];
                    } else if (n != nationality) {
                    	othernat = phase[n];
                    }
                }
            }
        });
        l = l.concat(nat, othernat, phases[phases.length - 1]);
        
        return l;
    },
    get: function(idx, nationality) {
    	log.debug('Get Phase [' + idx + '] for ' + nationality);
        var l = this.all(nationality);
    	if (idx > -1 && idx < l.length) {
        	return l[idx];
        }
        return phases[0];
    }
};