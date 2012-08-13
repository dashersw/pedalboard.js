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
goog.require('stomp.pot.PotComponent');
goog.require('tart.ui.DlgComponent');



/**
 * Base pedal.
 *
 * @constructor
 * @extends {tart.ui.DlgComponent}
 * @implements {stomp.ConnectableComponent}
 * @param {webkitAudioContext} context Audio context the pedal will work on.
 */
stomp.box.box.Component = function(context) {
    this.model = new this.modelClass(context);
    this.createPots();
    goog.base(this);
};
goog.inherits(stomp.box.box.Component, tart.ui.DlgComponent);


/**
 * @type {function(new: stomp.box.box.ComponentModel, webkitAudioContext)} The component model this component will
 *       work with.
 */
stomp.box.box.Component.prototype.modelClass = stomp.box.box.ComponentModel;


/**
 * Creates the potentiometers to control this pedals parameters.
 */
stomp.box.box.Component.prototype.createPots = function() {
    this.volumePot = new stomp.pot.PotComponent(this.model.outputBuffer.gain, 'Volume', 1);
    this.pots = [].concat(this.volumePot);
};


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
    this.volumePot.setValue(newLevel);
};


/**
 * @override
 */
stomp.box.box.Component.prototype.templates_base = function() {
    return '' +
        '<div id="' + this.id + '" class="box ' + this.name + '">' +
           '<div class="pots">' +
                this.getPots() +
           '</div>' +
           '<div class="name">' + this.name + '</div>' +
        '</div>';
};


/**
 * @return {string} Pot placeholder templates.
 */
stomp.box.box.Component.prototype.getPots = function() {
    var rv = '';
    goog.array.forEach(this.pots, function(pot) {
        rv += pot.getPlaceholder();
    });

    return rv;
};


/**
 * This method is called after the stomp box is appended to DOM. It then renders all its potentiometers.
 */
stomp.box.box.Component.prototype.render = function() {
    goog.array.forEach(this.pots, function(pot) {
        pot.render();
    });
};


/**
 * Name of the pedal. It's written on top plate.
 *
 * @type {string}
 */
stomp.box.box.Component.prototype.name = 'stomp';
