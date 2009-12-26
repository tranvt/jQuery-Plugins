/**
 * jQuery.macro 
 * ---
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.1
 * @updated 26-DEC-09
 * ---
 * Note: Read the README!
 * ---
 * @info http://james.padolsey.com/javascript/macros-in-jquery/
 */

jQuery.macro = (function(){
	
	function Macro(name) {
		
		if ( !(this instanceof Macro) ) {
			return new Macro(name);
		}
    
        var recorded = this.recorded = [],
			self = this;
		
		this.add = function(name, args) {
			recorded.push({
				name: name,
				args: args
			});
		};
		
        jQuery.fn[name] = function() {
            
            var m, i = 0;
            
            while (m = recorded[i++]) {
                self.ret = this[m.name].apply(this, m.args);
            }
            
            return this;
            
        };
        
    }
	
	function register(name, fn) {
		
		fn = fn || proto[name];
		
		proto[name] = function() {
			this.add(name, arguments);
			return this;
		};
		
	}
    
    var proto = Macro.prototype = jQuery.extend({}, jQuery.fn),
		excludes = Macro.excludes = { init: true };
		
	Macro.register = register;
    
    for (var i in proto)  {

        if ( !jQuery.isFunction(proto[i]) || i in excludes ) {
			continue;
		}
		
		register(i);
        
    }
    
    return Macro;
    
})();