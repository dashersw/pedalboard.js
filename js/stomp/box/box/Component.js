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
 * @fileoverview Base pedal.
 */

goog.provide('stomp.box.box.Component');
goog.require('stomp.ConnectableComponent');
goog.require('stomp.box.box.ComponentModel');



/**
 * Base pedal.
 *
 * @constructor
 * @implements {stomp.ConnectableComponent}
 * @param {webkitAudioContext} context Audio context the pedal will work on.
 */
stomp.box.box.Component = function(context) {
    this.model = new this.modelClass(context);
};


/**
 * @type {function(new: stomp.box.box.ComponentModel, webkitAudioContext)} The component model this component will
 *       work with.
 */
stomp.box.box.Component.prototype.modelClass = stomp.box.box.ComponentModel;


/**
 * Gets the main effects unit of a pedal, which is also the input node.
 *
 * @return {AudioNode} The effect node of this component.
 */
stomp.box.box.Component.prototype.getEffect = function() {
    return this.model.getEffect();
};


/**
 * Lets the pedal instance know who is connected to its input.
 *
 * @param {stomp.ConnectableComponent} input Previous pedal whose output will connect to this pedal's input.
 */
stomp.box.box.Component.prototype.setInput = function(input) {
    this.model.setInput(input.getEffect());
};


/**
 * Connects the output of this pedal to another pedal.
 *
 * @param {stomp.ConnectableComponent} destination Next pedal where the output of this pedal will connect to.
 */
stomp.box.box.Component.prototype.connect = function(destination) {
    destination.setInput(this);
    this.model.connect(destination.getEffect());
};


/**
 * Sets the level of the effect.
 *
 * @param {number} newLevel The new level of the effect.
 */
stomp.box.box.Component.prototype.setLevel = function(newLevel) {
    this.model.setLevel(newLevel);
};
