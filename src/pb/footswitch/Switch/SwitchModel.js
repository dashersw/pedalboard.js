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
 * @fileoverview Base switch component model.
 */

goog.require('tart.ui.ComponentModel');
goog.provide('pb.footswitch.SwitchModel');



/**
 * @constructor
 * @extends {tart.ui.ComponentModel}
 *
 * @param {string=} opt_name Name of the switch. Will be written under it.
 */
pb.footswitch.SwitchModel = function(opt_name) {
    goog.base(this);

    this.name = opt_name;
    this.nodes = [[], [], []];
    this.state = false;
};
goog.inherits(pb.footswitch.SwitchModel, tart.ui.ComponentModel);


/**
 * Toggles the switch and fires an event accordingly.
 */
pb.footswitch.SwitchModel.prototype.toggle = function() {
    var oldState = this.state,
        eventType;

    this.state = !this.state;

    if (this.state) this.turnOn();
    else this.turnOff();

    eventType = this.state ? pb.footswitch.SwitchModel.EventType.ON :
        pb.footswitch.SwitchModel.EventType.OFF;

    this.dispatchEvent({
        type: eventType,
        newValue: this.state,
        oldValue: oldState
    });
};


/**
 * Fired when the switch should be toggled on. Togges internal nodes; middle nodes are connected to the first.
 */
pb.footswitch.SwitchModel.prototype.turnOn = function() {
    var work = function(nodes) {
        nodes[1].disconnect();
        if (nodes[0]) nodes[1].connect(nodes[0]);
    }

    goog.array.forEach(this.nodes, function(nodes) {
        if (nodes) {
            (function(nodes) {
                work(nodes);
                setTimeout(function() {
                    work(nodes);
                }, 10);
            })(nodes);
        }
    });
};


/**
 * Fired when the switch should be toggled off. Toggles internal nodes; middle nodes are connected to the third.
 */
pb.footswitch.SwitchModel.prototype.turnOff = function() {
    var work = function(nodes) {
        nodes[1].disconnect();
        if (nodes[2]) nodes[1].connect(nodes[2]);
    }

    goog.array.forEach(this.nodes, function(nodes) {
        (function(nodes) {
            work(nodes);
            setTimeout(function() {
                work(nodes);
            }, 10);
        })(nodes);
    });
};


/**
 * Sets the nodes this switch will toggle.
 *
 * @param {Array.<Array.<AudioNode>>} nodes Nodes of this switch.
 */
pb.footswitch.SwitchModel.prototype.setNodes = function(nodes) {
    this.nodes = nodes;

    // Kick off toggling. Since this.toggle will invert the state and we just want to make an initial event dispatch,
    // we invert the state; so that toggle will correct it and dispatch the correct event.
    this.state = !this.state;
    this.toggle();
};


/**
 *
 * @enum {string}
 */
pb.footswitch.SwitchModel.EventType = {
    ON: 'on',
    OFF: 'off'
};
