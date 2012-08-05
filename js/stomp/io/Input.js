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
 * @fileoverview Input abstraction for an audio context. There can be many input sources in an audio context and this
 * class is an abstraction of an input that also implements the stomp.Connectable interface so that it can be chained
 * before a stomp.box.box.ComponentModel.
 */

goog.provide('stomp.io.Input');
goog.require('goog.events.EventTarget');
goog.require('stomp.ConnectableComponent');



/**
 * The input wrapper for an audio context.
 *
 * @constructor
 * @implements {stomp.ConnectableComponent}
 * @extends {goog.events.EventTarget}
 * @param {webkitAudioContext} context Audio context for this input.
 */
stomp.io.Input = function(context) {
    this.source = context.createBufferSource(); // creates a sound source
};
goog.inherits(stomp.io.Input, goog.events.EventTarget);


/**
 * Starts playing the input.
 *
 * @param {number} time Milliseconds after whom this input will start playing.
 */
stomp.io.Input.prototype.play = function(time) {
    time = time || 0;
    this.source.noteOn(time);
};


/**
 * Stops playing the input.
 *
 * @param {number} time Milliseconds after whom this input will stop playing.
 */
stomp.io.Input.prototype.stop = function(time) {
    time = time || 0;
    this.source.noteOff(time);
};


/**
 * Sets the source buffer of this input.
 *
 * @protected
 * @param {AudioBuffer} sourceBuffer The new buffer.
 */
stomp.io.Input.prototype.setSourceBuffer = function(sourceBuffer) {
    this.source.buffer = sourceBuffer;
};


/**
 * Connects this input to a destination pedal.
 *
 * @param {stomp.ConnectableComponent} destination Next pedal where this input will connect to.
 */
stomp.io.Input.prototype.connect = function(destination) {
    this.source.connect(destination.getEffect());
};


/**
 * Gets the source of this input.
 *
 * @return {AudioBufferSourceNode} The source of this input.
 */
stomp.io.Input.prototype.getEffect = function() {
    return this.source;
};


/**
 * Dummy method for the Connectable interface. It's meaningless for an input to be connected to the output of another
 * thing.
 */
stomp.io.Input.prototype.setInput = function() {};
