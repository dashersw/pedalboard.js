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
 * @fileoverview Volume pedal component model.
 */

goog.provide('stomp.box.volume.ComponentModel');
goog.require('stomp.box.box.ComponentModel');



/**
 * Component model for volume pedal.
 *
 * @constructor
 * @extends {stomp.box.box.ComponentModel}
 * @param {webkitAudioContext} context The context this component model will operate on.
 */
stomp.box.volume.ComponentModel = function(context) {
    goog.base(this, context);
};
goog.inherits(stomp.box.volume.ComponentModel, stomp.box.box.ComponentModel);


stomp.box.volume.ComponentModel.prototype.setVolume = function(newVolume) {
    this.source.gain.value = newVolume;
};
