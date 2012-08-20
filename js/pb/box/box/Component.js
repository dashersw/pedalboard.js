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
goog.require('pb.footswitch.toggle.Component');
goog.require('pb.pot.Component');
goog.require('pb.shadowMaker');
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

    this.createChildComponents();
    goog.base(this);
};
goog.inherits(pb.box.box.Component, tart.ui.DlgComponent);


/**
 * @type {function(new: pb.box.box.ComponentModel, webkitAudioContext)} The component model this component will
 *       work with.
 */
pb.box.box.Component.prototype.modelClass = pb.box.box.ComponentModel;


/**
 * Creates child components such as pots and switches.
 */
pb.box.box.Component.prototype.createChildComponents = function() {
    this.createPots();
    this.createSwitches();

    this.components = [].concat(this.pots, this.switches);
};


/**
 * Creates the potentiometers of this stomp box.
 */
pb.box.box.Component.prototype.createPots = function() {
    this.volumePot = new pb.pot.Component(this.model.level.gain, 'Volume', 1);
    this.pots = [].concat(this.volumePot);
};


/**
 * Creates the switches of this stomp box.
 */
pb.box.box.Component.prototype.createSwitches = function() {
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
 * Gets the input buffer of a pedal.
 *
 * @return {AudioNode} The input buffer of this component.
 */
pb.box.box.Component.prototype.getInput = function() {
    return this.model.getInput();
};


/**
 * Gets the output buffer of a pedal.
 *
 * @return {AudioNode} The output buffer of this component.
 */
pb.box.box.Component.prototype.getOutput = function() {
    return this.model.getOutput();
};


/**
 * Lets the pedal instance know who is connected to its input.
 *
 * @param {pb.ConnectableComponent} prev Previous pedal whose output will connect to this pedal's input.
 */
pb.box.box.Component.prototype.setPrev = function(prev) {
    this.model.setPrev(prev.getOutput());
};


/**
 * Connects the output of this pedal to another pedal.
 *
 * @param {pb.ConnectableComponent} destination Next pedal where the output of this pedal will connect to.
 */
pb.box.box.Component.prototype.connect = function(destination) {
    destination.setPrev(this);
    this.model.connect(destination.getInput());

    this.bypassSwitch.setNodes(this.model.nodes);
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
           '<div class="switches">' +
                this.getSwitches() +
           '</div>' +
        '</div>';
};


/**
 * @return {string} Pot placeholders.
 */
pb.box.box.Component.prototype.getPots = function() {
    return goog.array.reduce(this.pots, function(r, v) {
        return r += v.getPlaceholder();
    }, '');
};


/**
 * @return {string} Switch placeholders.
 */
pb.box.box.Component.prototype.getSwitches = function() {
    return goog.array.reduce(this.switches, function(r, v) {
        return r += v.getPlaceholder();
    }, '');
};


/**
 * This method is called after the stomp box is appended to DOM. It then renders all its potentiometers.
 */
pb.box.box.Component.prototype.render = function() {
    goog.array.forEach(this.components, function(cmp) {
        cmp.render();
    });

    pb.shadowMaker(this.getElement(), 40, 0.5, 0.7);
};


/**
 * Name of the pedal. It's written on top plate.
 *
 * @type {string}
 */
pb.box.box.Component.prototype.name = 'pb';
