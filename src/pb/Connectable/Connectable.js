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
 * @fileoverview Base Connectable component. It hosts other components as children, has a model and IO functionality.
 */

goog.provide('pb.Connectable');
goog.require('pb.ConnectableModel');
goog.require('pb.IConnectable');
goog.require('pb.ui.Component');



/**
 * Base component.
 *
 * @constructor
 * @extends {pb.ui.Component}
 * @implements {pb.IConnectable}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.Connectable = function(context) {
    goog.base(this);

    this.setModel(new this.modelClass(context));

    this.createChildComponents();

    this.bindModelEvents();
};
goog.inherits(pb.Connectable, pb.ui.Component);


/**
 * @type {function(new: pb.ConnectableModel, AudioContext)} The component model this component will
 *       work with.
 */
pb.Connectable.prototype.modelClass = pb.ConnectableModel;


/**
 * Creates child components such as pots and switches.
 */
pb.Connectable.prototype.createChildComponents = function() {
    this.components = [];
};


/**
 * Gets the input buffer of a pedal.
 *
 * @return {AudioNode} The input buffer of this component.
 */
pb.Connectable.prototype.getInput = function() {
    return this.model.getInput();
};


/**
 * Gets the output buffer of a pedal.
 *
 * @return {AudioNode} The output buffer of this component.
 */
pb.Connectable.prototype.getOutput = function() {
    return this.model.getOutput();
};


/**
 * Lets the pedal instance know who is connected to its input.
 *
 * @param {pb.IConnectable} prev Previous pedal whose output will connect to this pedal's input.
 */
pb.Connectable.prototype.setPrev = function(prev) {
    this.model.setPrev(prev.getOutput());
};


/**
 * Connects the output of this pedal to another pedal.
 *
 * @param {pb.IConnectable} destination Next pedal where the output of this pedal will connect to.
 */
pb.Connectable.prototype.connect = function(destination) {
    destination.setPrev(this);
    this.model.connect(destination.getInput());
};


/**
 * Disconnects the output of this pedal.
 */
pb.Connectable.prototype.disconnect = function() {
    this.model.disconnect();
};
