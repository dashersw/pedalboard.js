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
 * before a pb.box.box.ComponentModel.
 */

goog.provide('pb.io.StreamInput');
goog.require('pb.io.Input');



/**
 * The input wrapper for an audio context.
 *
 * @constructor
 * @implements {pb.ConnectableComponent}
 * @extends {pb.io.Input}
 * @param {webkitAudioContext} context Audio context for this input.
 */
pb.io.StreamInput = function(context) {
    this.source = context.createJavaScriptNode(1024, 0, 1);
    window.ownBuffer = [];
    var that = this;

    this.createStream();

    this.source.onaudioprocess = function(e) {
        if (that.state == 'play') {

            var buffer = e.outputBuffer;
            var buf = buffer.getChannelData(0);
            var data = window.ownBuffer;
            data = data.splice(0, 1024);
            for (var i = 0; i < 1024; ++i) {
                buf[i] = data[i];
            }

        }
    };
};
goog.inherits(pb.io.StreamInput, pb.io.Input);


/**
 * Creates the stream, from microphone.js library for the moment.
 */
pb.io.StreamInput.prototype.createStream = function() {
    var mic = new Microphone({
        swfPath: 'js/library/microphone.js/src/microphone.swf'
    });
    Mic.loaded = function(id) {
        var micl = Mic.mics[id];
        mic.start();
        mic.onSamplesAvailable = function(data, channelCount) {
            if (window.ownBuffer.length >= 2048)
                window.ownBuffer = [];
            window.ownBuffer = window.ownBuffer.concat(data);
        }
    }
};


/**
 * Starts playing the input.
 *
 * @param {number} time Milliseconds after whom this input will start playing.
 */
pb.io.StreamInput.prototype.play = function(time) {
    time = time || 0;
    this.state = 'play';
    //    this.source.noteOn(time);
};


/**
 * Stops playing the input.
 *
 * @param {number} time Milliseconds after whom this input will stop playing.
 */
pb.io.StreamInput.prototype.stop = function(time) {
    time = time || 0;
    this.state = 'stop';
    //    this.source.noteOff(time);
};

