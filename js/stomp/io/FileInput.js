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
 * @fileoverview Volume pedal.
 */

goog.provide('stomp.io.FileInput');
goog.require('stomp.io.Input');



/**
 *
 * @constructor
 * @extends {stomp.io.Input}
 * @param {webkitAudioContext} context Context for this input.
 * @param {string} url URL for the input file.
 */
stomp.io.FileInput = function(context, url) {
    goog.base(this, context);

    var that = this,
        request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.responseType = 'arraybuffer';


    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            that.setSourceBuffer(buffer);
            that.dispatchEvent('loaded');
        });
    };
    request.send();
};
goog.inherits(stomp.io.FileInput, stomp.io.Input);
