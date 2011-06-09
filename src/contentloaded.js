/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2.1
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
function contentLoaded(win, fn) {
  function init(e) {
    var t = e.type;
    if (t == 'readystatechange' && doc.readyState != 'complete') return;
    (t == 'load' ? win : doc)[rem](pre + t, init, false);
    if (!done++) fn.call(win, t || e);
  }

  function poll() {
    try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
    init('poll');
  }

  var doc = win.document
   , root = doc.documentElement
   , done = 0
    , top = 1
    , ael = 'addEventListener' in doc
    , add = ael ? 'addEventListener' : 'attachEvent'
    , rem = ael ? 'removeEventListener' : 'detachEvent'
    , pre = ael ? '' : 'on';

  if (doc.readyState == 'complete') fn.call(win, 'lazy');
  else {
    if (doc.createEventObject && root.doScroll) {
      try { top = !win.frameElement; } catch(e) {}
      if (top) poll();
    }
    doc[add](pre +'DOMContentLoaded', init, false);
    doc[add](pre +'readystatechange', init, false);
    win[add](pre +'load', init, false);
  }
}
