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
 * @fileoverview LED component.
 */


goog.provide('pb.Led');
goog.require('pb.ui.Component');



/**
 * LED is a simple component used to show the status of switches.
 *
 * @constructor
 * @extends {pb.ui.Component}
 *
 * @param {pb.footswitch.Switch=} opt_footswitch Footswitch this LED will follow.
 * @param {string=} opt_name Name of the LED. Will be written under it.
 */
pb.Led = function(opt_footswitch, opt_name) {
    goog.base(this);

    this.footswitch = opt_footswitch;
    this.name = opt_name || '';
    this.state = false;

    this.bindModelEvents();
};
goog.inherits(pb.Led, pb.ui.Component);


/**
 * Toggles the state of the LED explicitly. Normally, this is unnecessary given a footswitch.
 */
pb.Led.prototype.toggle = function() {
    this.state = !this.state;

    this.updateUi();
};


/**
 * Updates the user interface - glow - accordingly.
 */
pb.Led.prototype.updateUi = function() {
    if (this.isInDocument()) {
        goog.dom.classes.enable(this.getElement(), 'on', this.state);
    }
};


/**
 * @override
 */
pb.Led.prototype.templates_base = function() {
    return '<div class="led" id="' + this.getId() + '">' +
               '<div class="nameHolder">' +
                   '<div class="name">' + this.name + '</div>' +
               '</div>' +
           '</div>';
};


/**
 * @override
 */
pb.Led.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    this.updateUi();
};


/**
 * @override
 */
pb.Led.prototype.bindModelEvents = function() {
    if (this.footswitch) {
        goog.events.listen(this.footswitch.model,
            [pb.footswitch.SwitchModel.EventType.ON, pb.footswitch.SwitchModel.EventType.OFF],
            this.onSwitchValueChange,
            false, this);
    }
};


/**
 * Acts on an off or on event dispatched from this LED's footswitch. Updates the UI accordingly.
 *
 * @param {{newValue: boolean}} e ON / OFF event of the switch.
 */
pb.Led.prototype.onSwitchValueChange = function(e) {
    this.state = e.newValue;
    this.updateUi();
};
