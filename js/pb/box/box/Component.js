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
 * @fileoverview Base pedal.
 */

goog.provide('pb.box.box.Component');
goog.require('pb.ConnectableComponent');
goog.require('pb.box.box.ComponentModel');



/**
 * Base pedal.
 *
 * @constructor
 * @implements {pb.ConnectableComponent}
 * @param {webkitAudioContext} context Audio context the pedal will work on.
 */
pb.box.box.Component = function(context) {
    this.model = new this.modelClass(context);
};


/**
 * @type {function(new: pb.box.box.ComponentModel, webkitAudioContext)} The component model this component will
 *       work with.
 */
pb.box.box.Component.prototype.modelClass = pb.box.box.ComponentModel;


/**
 * Gets the main effects unit of a pedal, which is also the input node.
 *
 * @return {AudioNode} The effect node of this component.
 */
pb.box.box.Component.prototype.getEffect = function() {
    return this.model.getEffect();
};


/**
 * Lets the pedal instance know who is connected to its input.
 *
 * @param {pb.ConnectableComponent} input Previous pedal whose output will connect to this pedal's input.
 */
pb.box.box.Component.prototype.setInput = function(input) {
    this.model.setInput(input.getEffect());
};


/**
 * Connects the output of this pedal to another pedal.
 *
 * @param {pb.ConnectableComponent} destination Next pedal where the output of this pedal will connect to.
 */
pb.box.box.Component.prototype.connect = function(destination) {
    destination.setInput(this);
    this.model.connect(destination.getEffect());
};


/**
 * Sets the level of the effect.
 *
 * @param {number} newLevel The new level of the effect.
 */
pb.box.box.Component.prototype.setLevel = function(newLevel) {
    this.model.setLevel(newLevel);
};
