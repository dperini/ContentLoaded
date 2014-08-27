/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
function contentLoaded(win, fn) {

	var done = false, top = true,
	
	addEventListener = 'addEventListener',
	
	modern = doc[addEventListener],
	
	doc = win.document, root = doc.documentElement,
	
	adder = (function () {
		return modern
		?	function (o, e, fnc) {o[addEventListener] (e, fnc, false)}
		:	function (o, e, fnc) {o['attachEvent'] ('on' + e, fnc)}
	})(),
	
	remover = (function () {
		return modern
		?	function (o, e, fnc) {o['removeEventListener'] (e, fnc, false)}
		:	function (o, e, fnc) {o['detachEvent'] ('on' + e, fnc)}
	})(),
	
	events = function (adderOrRemover) {
		modern
			? adderOrRemover (doc, 'DOMContentLoaded', init)
			: adderOrRemover (doc, 'readystatechange', init)
		adderOrRemover (win, 'load', init)
	},
	
	init = function(e) {
		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
		if (!done && (done = true)) {
			events (remover);
			fn.call(win, e.type || e);
		}
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (!modern && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		events (adder)
	}

}
