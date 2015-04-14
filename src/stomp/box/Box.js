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
goog.require('pb.Led');
goog.require('pb.footswitch.Momentary');
goog.require('pb.footswitch.Toggle');
goog.require('pb.pot.Linear');
goog.require('pb.shadowMaker');
goog.require('pb.stomp.BoxModel');



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
 * @override
 */
pb.stomp.Box.prototype.createChildComponents = function() {
    this.createPots();
    this.createSwitches();
};


/**
 * Creates the potentiometers of this stomp box.
 */
pb.stomp.Box.prototype.createPots = function() {
    this.volumePot = new pb.pot.Linear(this.model.level.gain, 'volume', 1);
    this.volumePot.setValue(1);

    this.pots = [this.volumePot];
};


/**
 * Creates the switches of this stomp box.
 */
pb.stomp.Box.prototype.createSwitches = function() {
    this.bypassSwitch = new pb.footswitch.Toggle();
    this.led = new pb.Led(this.bypassSwitch);
    this.leds = [this.led];
    this.switches = [this.bypassSwitch];

    var that = this;
    goog.events.listen(this.bypassSwitch.model, pb.footswitch.SwitchModel.EventType.ON, function() {
        this.model.routeInternal();
        setTimeout(function() {
            that.model.routeInternal();
        }, 10);
    }, false, this);
};


/**
 * @override
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
    var className = this.name.replace(/\s/g, '-').toLowerCase();

    return '' +
        '<div id="' + this.getId() + '" class="box ' + className + '">' +
           '<div class="pots"></div>' +
           '<div class="name">' + this.name + '</div>' +
           '<div class="leds"></div>' +
           '<div class="switches"></div>' +
        //           '<div class="obg"></div>' +
        //           '<div class="bg"></div>' +
        //           '<div class="bgs">' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //               '<div class="bg"></div>' +
        //           '</div>'+
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

    this.leds.forEach(function(led) {
        led.render(this.$(this.mappings.LEDS)[0]);
    }, this);
};


/**
 * DOM selector mappings.
 *
 * @enum {string}
 */
pb.stomp.Box.prototype.mappings = {
    POTS: '.pots',
    SWITCHES: '.switches',
    LEDS: '.leds'
};


/**
 * Name of the pedal. It's written on top plate.
 *
 * @type {string}
 */
pb.stomp.Box.prototype.name = 'pb';
