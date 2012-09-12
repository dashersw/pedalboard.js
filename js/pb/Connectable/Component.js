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

goog.provide('pb.Connectable.Component');
goog.require('pb.Connectable.ComponentModel');
goog.require('pb.ConnectableComponent');
goog.require('pb.footswitch.toggle.Component');
goog.require('pb.pot.Component');
goog.require('pb.shadowMaker');
goog.require('pb.ui.Component');
goog.require('tart.ui.DlgComponent');



/**
 * Base pedal.
 *
 * @constructor
 * @extends {pb.ui.Component}
 * @implements {pb.ConnectableComponent}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.Connectable.Component = function(context) {
    goog.base(this);

    this.setModel(new this.modelClass(context));

    this.createChildComponents();

    this.bindModelEvents();
};
goog.inherits(pb.Connectable.Component, pb.ui.Component);


/**
 * @type {function(new: pb.Connectable.ComponentModel, AudioContext)} The component model this component will
 *       work with.
 */
pb.Connectable.Component.prototype.modelClass = pb.Connectable.ComponentModel;


/**
 * Creates child components such as pots and switches.
 */
pb.Connectable.Component.prototype.createChildComponents = function() {
    this.components = [];
};


/**
 * Gets the input buffer of a pedal.
 *
 * @return {AudioNode} The input buffer of this component.
 */
pb.Connectable.Component.prototype.getInput = function() {
    return this.model.getInput();
};


/**
 * Gets the output buffer of a pedal.
 *
 * @return {AudioNode} The output buffer of this component.
 */
pb.Connectable.Component.prototype.getOutput = function() {
    return this.model.getOutput();
};


/**
 * Lets the pedal instance know who is connected to its input.
 *
 * @param {pb.ConnectableComponent} prev Previous pedal whose output will connect to this pedal's input.
 */
pb.Connectable.Component.prototype.setPrev = function(prev) {
    this.model.setPrev(prev.getOutput());
};


/**
 * Connects the output of this pedal to another pedal.
 *
 * @param {pb.ConnectableComponent} destination Next pedal where the output of this pedal will connect to.
 */
pb.Connectable.Component.prototype.connect = function(destination) {
    destination.setPrev(this);
    this.model.connect(destination.getInput());
};

//
///**
// * This method is called after the stomp box is appended to DOM. It then renders all its potentiometers.
// */
//pb.Connectable.Component.prototype.render = function() {
//    goog.array.forEach(this.components, function(cmp) {
//        cmp.render();
//    });
//};


/**
 * Disconnects the output of this pedal.
 */
pb.Connectable.Component.prototype.disconnect = function() {
    this.model.disconnect();
};
