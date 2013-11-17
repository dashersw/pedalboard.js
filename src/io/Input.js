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
 * @fileoverview Input abstraction for an audio context. There can be many input sources in an audio context and this
 * class is an abstraction of an input that also implements the pb.Connectable interface so that it can be chained
 * before a pb.stomp.BoxModel.
 */

goog.provide('pb.io.Input');
goog.require('goog.events.EventTarget');
goog.require('pb.IConnectable');



/**
 * The input wrapper for an audio context.
 *
 * @constructor
 * @implements {pb.IConnectable}
 * @extends {goog.events.EventTarget}
 * @param {AudioContext} context Audio context for this input.
 */
pb.io.Input = function(context) {
    this.source = context.createBufferSource(); // creates a sound source
    this.source.loop = true;

    this.state = pb.io.Input.State.NOT_STARTED;
    this.source.addEventListener('ended', this.onEnded.bind(this));
};
goog.inherits(pb.io.Input, goog.events.EventTarget);


/**
 * Playback states that partially fulfills the deprecated playbackState in Web Audio API. Basically it helps to avoid
 * exceptions when start or stop is called inappropriately.
 *
 * @enum {string}
 */
pb.io.Input.State = {
    NOT_STARTED: 'notStarted',
    PLAYING: 'playing',
    FINISHED: 'finished'
};


/**
 * Starts playing the input.
 *
 * @param {number=} opt_time Milliseconds after whom this input will start playing.
 */
pb.io.Input.prototype.play = function(opt_time) {
    if (this.state == pb.io.Input.State.NOT_STARTED) {
        this.source.start(opt_time || 0);
        this.state = pb.io.Input.State.PLAYING;
    }
};


/**
 * Stops playing the input.
 *
 * @param {number=} opt_time Milliseconds after whom this input will stop playing.
 */
pb.io.Input.prototype.stop = function(opt_time) {
    if (this.state == pb.io.Input.State.PLAYING) {
        this.source.stop(opt_time || 0);
        this.state = pb.io.Input.State.FINISHED;
    }
};


/**
 * Sets the source buffer of this input.
 *
 * @protected
 * @param {AudioBuffer} sourceBuffer The new buffer.
 */
pb.io.Input.prototype.setSourceBuffer = function(sourceBuffer) {
    this.source.buffer = sourceBuffer;
};


/**
 * Connects this input to a destination pedal.
 *
 * @param {pb.IConnectable} destination Next pedal where this input will connect to.
 */
pb.io.Input.prototype.connect = function(destination) {
    destination.setPrev(this);
    this.source.connect(destination.getInput());
};


/**
 * Disconnects this input from wherever it's connected to.
 */
pb.io.Input.prototype.disconnect = function() {
    this.source.disconnect();
};


/**
 * Gets the source of this input.
 *
 * @return {AudioBufferSourceNode} The source of this input.
 */
pb.io.Input.prototype.getOutput = function() {
    return this.source;
};


/**
 * Handler for the end event. When the playback of the input ends, this method correctly sets the State to FINISHED.
 */
pb.io.Input.prototype.onEnded = function() {
    this.state = pb.io.Input.State.FINISHED;
};


/**
 * Dummy method for the Connectable interface. It's meaningless for an input to be connected to the output of another
 * thing.
 */
pb.io.Input.prototype.setPrev = function() {};


/**
 * Dummy method for the Connectable interface. It's meaningless for an input to have an input.
 */
pb.io.Input.prototype.getInput = function() {};
