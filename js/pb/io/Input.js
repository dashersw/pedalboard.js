// Copyright 2012 Armagan Amcalar. All Rights Reserved.
//
// This file is part of Pedalboard.js.
//
// Pedalboard.js is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pedalboard.js is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pedalboard.js.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @fileoverview Volume pedal.
 */

goog.provide('pb.io.Input');
goog.require('goog.events.EventHandler');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events.EventTarget');
goog.require('pb.Connectable');


/**
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {webkitAudioContext} context Audio context for this input.
 * @implements {pb.Connectable}
 */
pb.io.Input = function(context) {
    this.source = context.createBufferSource(); // creates a sound source
};
goog.inherits(pb.io.Input, goog.events.EventTarget);


pb.io.Input.prototype.play = function(time) {
    time = time || 0;
    this.source.noteOn(time);
};


pb.io.Input.prototype.setSourceBuffer = function(sourceBuffer) {
    this.source.buffer = sourceBuffer;
};

pb.io.Input.prototype.connectOutputTo = function(destination) {
    this.source.connect(destination);
};
