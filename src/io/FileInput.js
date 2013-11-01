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
 * @fileoverview File input reads a given file as an input buffer.
 */

goog.provide('pb.io.FileInput');
goog.require('pb.io.Input');



/**
 * Reads a file at a given URL, converts it to a source buffer and makes it available for the context.
 *
 * @constructor
 * @extends {pb.io.Input}
 * @param {AudioContext} context Context for this input.
 * @param {string} url URL for the input file.
 */
pb.io.FileInput = function(context, url) {
    goog.base(this, context);

    var that = this,
        request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.responseType = 'arraybuffer';


    request.onload = function() {
        context.decodeAudioData(/** @type {ArrayBuffer} */(request.response), function(buffer) {
            that.setSourceBuffer(buffer);
            that.dispatchEvent('loaded');
        });
    };
    request.send();
};
goog.inherits(pb.io.FileInput, pb.io.Input);
