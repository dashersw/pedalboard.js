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
 * @fileoverview Output abstraction for a given audio context. There can only be one output per audio context, and this
 * class is an abstraction of it that also implements the pb.Connectable interface so that it can be chained after
 * a pb.stomp.BoxModel.
 */

goog.provide('pb.io.Output');
goog.require('pb.IConnectable');



/**
 * The output wrapper for an audio context.
 *
 * @constructor
 * @param {AudioContext} context Audio context for this output.
 * @implements {pb.IConnectable}
 */
pb.io.Output = function(context) {
    this.source = context.destination; // creates a sound source
};


/**
 * Gets the destination node.
 *
 * @return {AudioDestinationNode} The final node in the signal chain.
 */
pb.io.Output.prototype.getInput = function() {
    return this.source;
};


/**
 * Lets the output know who is connected to it.
 *
 * @param {pb.IConnectable} prev Input node.
 */
pb.io.Output.prototype.setPrev = function(prev) {
    this.prev = prev;
};


/**
 * Dummy method for the Connectable interface. It's meaningless for an output to be connected to another Connectable.
 * It's already the final node in the signal chain.
 */
pb.io.Output.prototype.connect = function() {};


/**
 * Dummy method for the Connectable interface. It's meaningless for an output to have an output.
 */
pb.io.Output.prototype.getOutput = function() {};


/**
 * Dummy method for the Connectable interface. The output is never connected to anything else.
 */
pb.io.Output.prototype.disconnect = function() {};
