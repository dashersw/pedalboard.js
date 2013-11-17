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
 * @fileoverview Base pedal component model.
 */

goog.provide('pb.stomp.BoxModel');
goog.require('pb.ConnectableModel');



/**
 * Component model for base pedal.
 *
 * @constructor
 * @extends {pb.ConnectableModel}
 *
 * @param {AudioContext} context The context this component model will operate on.
 */
pb.stomp.BoxModel = function(context) {
    goog.base(this, context);

    this.level = this.context.createGain();

    this.effects.push(this.level);
};
goog.inherits(pb.stomp.BoxModel, pb.ConnectableModel);


/**
 * Sets the level of the effect.

 * @param {number} newLevel The new level of the effect.
 */
pb.stomp.BoxModel.prototype.setLevel = function(newLevel) {
    newLevel = Math.min(newLevel, 10);
    newLevel = newLevel / 10;
    this.level.gain.value = newLevel;
};


/**
 * Routes the internal effects chain.
 *
 * @protected
 */
pb.stomp.BoxModel.prototype.routeInternal = function() {
    var chain = this.chain;

    for (var i = 0, len = chain.length - 1; i < len; i++) {
        chain[i].connect(chain[i + 1]);
    }

    this.nodes = [
        [this.effects[0], this.inputBuffer, this.outputBuffer],
        [this.outputBuffer, goog.array.peek(this.effects), null]
    ];
};
