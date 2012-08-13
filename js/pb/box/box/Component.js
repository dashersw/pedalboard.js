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
goog.require('pb.pot.PotComponent');
goog.require('tart.ui.DlgComponent');



/**
 * Base pedal.
 *
 * @constructor
 * @extends {tart.ui.DlgComponent}
 * @implements {pb.ConnectableComponent}
 * @param {webkitAudioContext} context Audio context the pedal will work on.
 */
pb.box.box.Component = function(context) {
    this.model = new this.modelClass(context);
    this.createPots();
    goog.base(this);
};
goog.inherits(pb.box.box.Component, tart.ui.DlgComponent);


/**
 * @type {function(new: pb.box.box.ComponentModel, webkitAudioContext)} The component model this component will
 *       work with.
 */
pb.box.box.Component.prototype.modelClass = pb.box.box.ComponentModel;


pb.box.box.Component.prototype.createPots = function() {
    this.volumePot = new pb.pot.PotComponent(this.model.outputBuffer.gain, 'Volume', 1);
    this.pots = [].concat(this.volumePot);
};


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
    this.volumePot.setValue(newLevel);
};


/**
 * @override
 */
pb.box.box.Component.prototype.templates_base = function() {
    return '' +
        '<div id="' + this.id + '" class="box ' + this.name + '">' +
           '<div class="pots">' +
                this.getPots() +
           '</div>' +
           '<div class="name">' + this.name + '</div>' +
        '</div>';
};


/**
 * @return {string} Pot placeholder templates.
 */
pb.box.box.Component.prototype.getPots = function() {
    var rv = '';
    goog.array.forEach(this.pots, function(pot) {
        rv += pot.getPlaceholder();
    });

    return rv;
};


/**
 * @override
 */
pb.box.box.Component.prototype.render = function() {
    goog.array.forEach(this.pots, function(pot) {
        pot.render();
    });
};


/**
 * Name of the pedal. It's written on top plate.
 *
 * @type {string}
 */
pb.box.box.Component.prototype.name = 'pb';
