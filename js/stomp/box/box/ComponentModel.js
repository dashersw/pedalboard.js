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
 * @fileoverview Base pedal component model.
 */

goog.provide('stomp.box.box.ComponentModel');
goog.require('stomp.Connectable');



/**
 * Component model for base pedal.
 *
 * @constructor
 * @implements {stomp.Connectable}
 * @param {webkitAudioContext} context The context this component model will operate on.
 */
stomp.box.box.ComponentModel = function(context) {
    this.context = context;
    this.effect = this.context.createGainNode();
};


/**
 * Connects the output of the audio node of this model to another audio node.
 *
 * @param {AudioNode} destination Next audio node where the output of this model's node will connect to.
 */
stomp.box.box.ComponentModel.prototype.connect = function(destination) {
    this.effect.connect(destination);
};


/**
 * Gets the main effects unit of a pedal, which is also the input node.
 *
 * @return {AudioNode} The effect node of this component.
 */
stomp.box.box.ComponentModel.prototype.getEffect = function() {
    return this.effect;
};


/**
 * Lets the model know who is connected to its effects node.
 *
 * @param {AudioNode} input Previous node who is connected to this model's effects node.
 */
stomp.box.box.ComponentModel.prototype.setInput = function(input) {
    this.input = input;
};