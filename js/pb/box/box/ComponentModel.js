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

goog.provide('pb.box.box.ComponentModel');
goog.require('pb.Connectable');



/**
 * Component model for base pedal.
 *
 * @constructor
 * @implements {pb.Connectable}
 * @param {webkitAudioContext} context The context this component model will operate on.
 */
pb.box.box.ComponentModel = function(context) {
    this.context = context;
    this.effect = this.context.createGainNode();
};


/**
 * Connects the output of the audio node of this model to another audio node.
 *
 * @param {AudioNode} destination Next audio node where the output of this model's node will connect to.
 */
pb.box.box.ComponentModel.prototype.connect = function(destination) {
    this.effect.connect(destination);
};


/**
 * Gets the main effects unit of a pedal, which is also the input node.
 *
 * @return {AudioNode} The effect node of this component.
 */
pb.box.box.ComponentModel.prototype.getEffect = function() {
    return this.effect;
};


/**
 * Lets the model know who is connected to its effects node.
 *
 * @param {AudioNode} input Previous node who is connected to this model's effects node.
 */
pb.box.box.ComponentModel.prototype.setInput = function(input) {
    this.input = input;
};
