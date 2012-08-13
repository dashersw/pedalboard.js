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
 * @fileoverview Conv pedal.
 */

goog.provide('stomp.box.conv.Component');
goog.require('stomp.box.box.Component');
goog.require('stomp.box.conv.ComponentModel');



/**
 * Conv pedal.
 *
 * @constructor
 * @extends {stomp.box.box.Component}
 * @param {webkitAudioContext} context Audio context the pedal will work on.
 */
stomp.box.conv.Component = function(context) {
    goog.base(this, context);
};
goog.inherits(stomp.box.conv.Component, stomp.box.box.Component);


/**
 * @override
 */
stomp.box.conv.Component.prototype.modelClass = stomp.box.conv.ComponentModel;


/**
 * @override
 */
stomp.box.conv.Component.prototype.name = 'convo';
