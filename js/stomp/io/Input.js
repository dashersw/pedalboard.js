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

goog.provide('stomp.io.Input');
goog.require('goog.events.EventHandler');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events.EventTarget');


/**
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {webkitAudioContext} context Audio context for this input.
 */
stomp.io.Input = function(context) {
    this.source = context.createBufferSource(); // creates a sound source
};
goog.inherits(stomp.io.Input, goog.events.EventTarget);


stomp.io.Input.prototype.play = function(time) {
    time = time || 0;
    this.source.noteOn(time);
};


stomp.io.Input.prototype.setSourceBuffer = function(sourceBuffer) {
    this.source.buffer = sourceBuffer;
};

stomp.io.Input.prototype.connectOutputTo = function(destination) {
    this.source.connect(destination);
};
