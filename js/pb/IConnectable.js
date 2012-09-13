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
 * @fileoverview IConnectable interface for consistent routing between higher level stomp box components.
 * All the connectable pedal components and IO should implement this interface.
 */

goog.provide('pb.IConnectable');



/**
 * IConnectable interface. Sports connect method for output and setInput method for input.
 * @interface
 */
pb.IConnectable = function() {};


/**
 * Connects the output of this IConnectable to a node.
 *
 * @param {pb.IConnectable} destination Destination node to connect the output of this IConnectable.
 */
pb.IConnectable.prototype.connect = function(destination) {};


/**
 * Disconnects the output of this IConnectable.
 */
pb.IConnectable.prototype.disconnect = function() {};


/**
 * Sets the input of this IConnectable to a node.
 *
 * @param {pb.IConnectable} prev The node that will be connected to the input of this IConnectable.
 */
pb.IConnectable.prototype.setPrev = function(prev) {};


/**
 * Gets the main effects unit of a IConnectable, which is also the input node.
 *
 * @return {AudioNode} The effect node of the IConnectable.
 */
pb.IConnectable.prototype.getInput = function() {};

