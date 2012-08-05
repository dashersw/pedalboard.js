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
 * @fileoverview Connectable interface for consistent routing. All the connectable component models should implement
 * this interface.
 */

goog.provide('pb.Connectable');



/**
 * Connectable interface. Sports connect method for output and setInput method for input.
 * @interface
 */
pb.Connectable = function() {};

/**
 * Connects the output of this instance to a node.
 * @param {AudioDestinationNode} destination Destination node to connect to.
 */
pb.Connectable.prototype.connectOutputTo = function(destination) {};
