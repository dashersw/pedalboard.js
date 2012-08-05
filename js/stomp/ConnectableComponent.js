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
 * @fileoverview ConnectableComponent interface for consistent routing between higher level stomp box components.
 * All the connectable pedal components and IO should implement this interface.
 */

goog.provide('stomp.ConnectableComponent');



/**
 * ConnectableComponent interface. Sports connect method for output and setInput method for input.
 * @interface
 */
stomp.ConnectableComponent = function() {};


/**
 * Connects the output of this ConnectableComponent to a node.
 *
 * @param {stomp.ConnectableComponent} destination Destination node to connect the output of this ConnectableComponent.
 */
stomp.ConnectableComponent.prototype.connect = function(destination) {};


/**
 * Sets the input of this ConnectableComponent to a node.
 *
 * @param {stomp.ConnectableComponent} input The node that will be connected to the input of this ConnectableComponent.
 */
stomp.ConnectableComponent.prototype.setInput = function(input) {};


/**
 * Gets the main effects unit of a Connectable, which is also the input node.
 *
 * @return {AudioNode} The effect node of the Connectable.
 */
stomp.ConnectableComponent.prototype.getEffect = function() {};

