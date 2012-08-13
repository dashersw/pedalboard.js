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
 * @fileoverview Base pot component.
 */


goog.provide('stomp.pot.PotComponent');
goog.require('goog.events.MouseWheelHandler');
goog.require('stomp.pot.PotComponentModel');
goog.require('tart.ui.DlgComponent');



/**
 * Pot component models a virtual potentiometer. This base class is used to adjust audio parameter values of pedals.
 *
 * @constructor
 * @extends {tart.ui.DlgComponent}
 *
 * @param {AudioParam} param Audio parameter this pot will adjust. Can be gain, etc.
 * @param {string} name Name of the pot. Will be written under it.
 * @param {number} range The multiplier of the effect. Some effects (such as gain) need this to be on the order of
 *                       thousands.
 */
stomp.pot.PotComponent = function(param, name, range) {
    this.model = new this.modelClass(param, name, range || 1);
    this.setValue(10);

    goog.base(this);
};
goog.inherits(stomp.pot.PotComponent, tart.ui.DlgComponent);


/**
 * @type {function(new: stomp.pot.PotComponentModel, AudioParam, string, number)}
 *       The component model this pot component will work with.
 */
stomp.pot.PotComponent.prototype.modelClass = stomp.pot.PotComponentModel;


/**
 * Sets the new value for this pot's audio parameter.
 *
 * @param {number} newValue New value to be set.
 */
stomp.pot.PotComponent.prototype.setValue = function(newValue) {
    if (newValue < 0.1) newValue = 0.1;
    this.model.setValue(newValue);
};


/**
 * Updates the user interface - rotation - accordingly.
 */
stomp.pot.PotComponent.prototype.updateUi = function() {
    var newStyle = 'rotate(' + (this.model.getNormalizedValue() * 260) + 'deg)';
    this.getChild(this.mappings.KNOB)[0].style['-webkit-transform'] = newStyle;
};


/**
 * @override
 */
stomp.pot.PotComponent.prototype.templates_base = function() {
    return '<div class="pot" id="' + this.id + '">' +
               '<div class="knob"></div>' +
               '<div class="name">' + this.model.name + '</div>' +
           '</div>';
};


/**
 * Render method updates its knob.
 */
stomp.pot.PotComponent.prototype.render = function() {
    this.updateUi();

    this.rendered = true;
};


/**
 * @enum {string} DOM mappings.
 */
stomp.pot.PotComponent.prototype.mappings = {
    KNOB: '.knob'
};


/**
 * @override
 */
stomp.pot.PotComponent.prototype.bindModelEvents = function() {
    goog.events.listen(this.model, stomp.pot.PotComponentModel.EventType.VALUE_CHANGED, function(e) {
        this.rendered && this.updateUi();
    }, false, this);
};

(function(proto) {
    proto.events = {};
    var mousedown = proto.events[goog.events.EventType.MOUSEDOWN] = {};

    mousedown[proto.mappings.KNOB] = function(e) {
        this.flag = true;
        this.oldY = e.clientY;

        var mouseup = goog.events.listen(document.body, 'mouseup', function(e) {
            this.flag = false;
            goog.events.unlistenByKey(mousemove);
            goog.events.unlistenByKey(mouseup);
        }, false, this);

        var mousemove = goog.events.listen(document.body, 'mousemove', function(e) {
            if (this.flag) {
                this.setValue(this.model.getNormalizedValue() * 10 - (e.clientY - this.oldY) * 0.05);
                this.oldY = e.clientY;
            }
        }, false, this);
    };
})(stomp.pot.PotComponent.prototype);
