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

goog.provide('pb.io.StreamInput');
goog.require('pb.io.Input');


/**
 * The input wrapper for an audio context.
 *
 * @constructor
 * @extends {pb.io.Input}
 * @param {AudioContext} context Audio context for this input.
 */
pb.io.StreamInput = function(context) {
    goog.base(this, context);
    var that = this;
    var getUserMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia;
    getUserMedia({
        'audio': {
            'mandatory': {
                'echoCancellation': false,
                'googEchoCancellation': false,
                'googEchoCancellation2': false,
                'googAutoGainControl': false,
                'googNoiseSuppression': false,
                'googNoiseSuppression2': false
                //'googHighpassFilter': false // this is currently buggy.
            }
        }
    }, function(stream) {

        that.disconnect();
        that.source = context.createMediaStreamSource(stream);
        that.dispatchEvent('loaded');
    }, function(err) {
        throw new Error(err);
    });
};
goog.inherits(pb.io.StreamInput, pb.io.Input);


pb.io.StreamInput.prototype.stop = function() {
    this.source.disconnect();
};
