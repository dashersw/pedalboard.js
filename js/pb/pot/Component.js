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
 * @fileoverview Base pot component.
 */


goog.provide('pb.pot.Component');
goog.require('pb.pot.ComponentModel');
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
pb.pot.Component = function(param, name, range) {
    this.model = new this.modelClass(param, name, range || 1);
    this.setValue(10);

    goog.base(this);
};
goog.inherits(pb.pot.Component, tart.ui.DlgComponent);


/**
 * @type {function(new: pb.pot.ComponentModel, AudioParam, string, number)}
 *       The component model this pot component will work with.
 */
pb.pot.Component.prototype.modelClass = pb.pot.ComponentModel;


/**
 * Sets the new value for this pot's audio parameter.
 *
 * @param {number} newValue New value to be set.
 */
pb.pot.Component.prototype.setValue = function(newValue) {
    this.model.setValue(newValue);
};


/**
 * Updates the user interface - rotation - accordingly.
 */
pb.pot.Component.prototype.updateUi = function() {
    var newStyle = 'rotate(' + (this.model.getNormalizedValue() * 260) + 'deg)';
    this.getChild(this.mappings.KNOB)[0].style['-webkit-transform'] = newStyle;
};


/**
 * @override
 */
pb.pot.Component.prototype.templates_base = function() {
    return '<div class="pot" id="' + this.id + '">' +
               '<img class="knob" src="img/pot.png" height="96" width="95"/>' +
               '<div class="name">' + this.model.name + '</div>' +
           '</div>';
};


/**
 * Render method updates its knob.
 */
pb.pot.Component.prototype.render = function() {
    this.updateUi();

    this.rendered = true;
};


/**
 * @enum {string} DOM mappings.
 */
pb.pot.Component.prototype.mappings = {
    KNOB: '.knob'
};


/**
 * @override
 */
pb.pot.Component.prototype.bindModelEvents = function() {
    goog.events.listen(this.model, pb.pot.ComponentModel.EventType.VALUE_CHANGED, function(e) {
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
})(pb.pot.Component.prototype);
