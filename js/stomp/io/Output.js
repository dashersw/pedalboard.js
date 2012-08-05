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
 * @fileoverview Output abstraction for a given audio context. There can only be one output per audio context, and this
 * class is an abstraction of it that also implements the stomp.Connectable interface so that it can be chained after
 * a stomp.box.box.ComponentModel.
 */

goog.provide('stomp.io.Output');
goog.require('stomp.ConnectableComponent');



/**
 * The output wrapper for an audio context.
 *
 * @constructor
 * @param {webkitAudioContext} context Audio context for this output.
 * @implements {stomp.ConnectableComponent}
 */
stomp.io.Output = function(context) {
    this.source = context.destination; // creates a sound source
};


/**
 * Gets the destination node.
 *
 * @return {AudioDestinationNode} The final node in the signal chain.
 */
stomp.io.Output.prototype.getEffect = function() {
    return this.source;
};


/**
 * Lets the output know who is connected to it.
 *
 * @param {stomp.ConnectableComponent} input Input node.
 */
stomp.io.Output.prototype.setInput = function(input) {
    this.input = input;
};


/**
 * Dummy method for the Connectable interface. It's meaningless for an output to be connected to another Connectable.
 * It's already the final node in the signal chain.
 */
stomp.io.Output.prototype.connect = function() {};
