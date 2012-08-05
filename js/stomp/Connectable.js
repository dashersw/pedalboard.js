// Copyright 2011 Armagan Amcalar. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Connectable interface for consistent routing. All the connectable component models should implement
 * this interface.
 */

goog.provide('stomp.Connectable');



/**
 * Connectable interface. Sports connect method for output and setInput method for input.
 * @interface
 */
stomp.Connectable = function() {};


/**
 * Connects the output of this Connectable to a node.
 *
 * @param {AudioNode} destination Destination node to connect the output of this Connectable.
 */
stomp.Connectable.prototype.connect = function(destination) {};


/**
 * Sets the input of this Connectable to a node.
 *
 * @param {AudioNode} input The node that will be connected to the input of this Connectable.
 */
stomp.Connectable.prototype.setInput = function(input) {};


/**
 * Gets the main effects unit of a Connectable, which is also the input node.
 *
 * @return {AudioNode} The effect node of the Connectable.
 */
stomp.Connectable.prototype.getEffect = function() {};
