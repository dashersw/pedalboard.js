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
 * @fileoverview Base pot component model.
 */


goog.provide('stomp.pot.PotComponentModel');
goog.require('tart.ui.ComponentModel');



/**
 * @constructor
 * @extends {tart.ui.ComponentModel}
 *
 * @param {AudioParam} param Audio parameter this pot will adjust. Can be gain, etc.
 * @param {string} name Name of the pot. Will be written under it.
 * @param {number} range The multiplier of the effect. Some effects (such as gain) need this to be on the order of
 *                       thousands.
 */
stomp.pot.PotComponentModel = function(param, name, range) {
    goog.base(this);

    this.param = param;
    this.name = name;
    this.range = range;
};
goog.inherits(stomp.pot.PotComponentModel, tart.ui.ComponentModel);


/**
 * Sets the new value for this pot's audio parameter and lets whoever listens hear about it.
 *
 * @param {number} newValue New value to be set.
 */
stomp.pot.PotComponentModel.prototype.setValue = function(newValue) {
    var oldValue = this.param.value;
    newValue = newValue * this.range;
    newValue = Math.min(newValue, 10 * this.range);
    newValue = newValue / 10;
    if (newValue < 0)
        return;
    this.param.value = newValue;

    this.dispatchEvent({
        type: stomp.pot.PotComponentModel.EventType.VALUE_CHANGED,
        newValue: newValue,
        oldValue: oldValue
    });
};


/**
 * @return {number} The normalized value of this pot's parameter (as calculated in value / range).
 */
stomp.pot.PotComponentModel.prototype.getNormalizedValue = function() {
    return this.param.value / this.range;
};


/**
 *
 * @enum {string}
 */
stomp.pot.PotComponentModel.EventType = {
    VALUE_CHANGED: 'valueChanged'
};
