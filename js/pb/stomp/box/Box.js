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

goog.provide('pb.stomp.Box');
goog.require('pb.Connectable');
goog.require('pb.stomp.BoxModel');
goog.require('pb.footswitch.toggle.Component');
goog.require('pb.pot.Linear');
goog.require('pb.shadowMaker');



/**
 * Base pedal.
 *
 * @constructor
 * @extends {pb.Connectable}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.stomp.Box = function(context) {
    goog.base(this, context);
};
goog.inherits(pb.stomp.Box, pb.Connectable);


/**
 * @type {function(new: pb.stomp.BoxModel, AudioContext)} The component model this component will
 *       work with.
 */
pb.stomp.Box.prototype.modelClass = pb.stomp.BoxModel;


/**
 * Creates child components such as pots and switches.
 */
pb.stomp.Box.prototype.createChildComponents = function() {
    this.createPots();
    this.createSwitches();
};


/**
 * Creates the potentiometers of this stomp box.
 */
pb.stomp.Box.prototype.createPots = function() {
    this.volumePot = new pb.pot.Linear(this.model.level.gain, 'volume', 0.1);
    this.pots = [].concat(this.volumePot);
};


/**
 * Creates the switches of this stomp box.
 */
pb.stomp.Box.prototype.createSwitches = function() {
    this.bypassSwitch = new pb.footswitch.toggle.Component();

    this.switches = [].concat(this.bypassSwitch);
    var that = this;
    goog.events.listen(this.bypassSwitch.model, pb.footswitch.ComponentModel.EventType.ON, function() {
        this.model.routeInternal();
        setTimeout(function() {
            that.model.routeInternal();
        }, 10);
    }, false, this);
};


/**
 * Connects the output of this pedal to another pedal.
 *
 * @param {pb.Connectable} destination Next pedal where the output of this pedal will connect to.
 */
pb.stomp.Box.prototype.connect = function(destination) {
    goog.base(this, 'connect', destination);

    this.bypassSwitch.setNodes(this.model.nodes);
};


/**
 * Sets the level of the effect.
 *
 * @param {number} newLevel The new level of the effect.
 */
pb.stomp.Box.prototype.setLevel = function(newLevel) {
    this.volumePot.setValue(newLevel);
};


/**
 * @override
 */
pb.stomp.Box.prototype.templates_base = function() {
    return '' +
        '<div id="' + this.getId() + '" class="box ' + this.name + '">' +
           '<div class="pots"></div>' +
           '<div class="name">' + this.name + '</div>' +
           '<div class="switches"></div>' +
        '</div>';
};


/**
 * This method is called after the stomp box is appended to DOM. It then renders all its potentiometers.
 */
pb.stomp.Box.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    this.pots.forEach(function(pot) {
        pot.render(this.$(this.mappings.POTS)[0]);
    }, this);

    this.switches.forEach(function(sw) {
        sw.render(this.$(this.mappings.SWITCHES)[0]);
    }, this);
};


/**
 * DOM selector mappings.
 *
 * @enum {string}
 */
pb.stomp.Box.prototype.mappings = {
    POTS: '.pots',
    SWITCHES: '.switches'
};


/**
 * Name of the pedal. It's written on top plate.
 *
 * @type {string}
 */
pb.stomp.Box.prototype.name = 'pb';
