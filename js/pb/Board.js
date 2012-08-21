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
 * @fileoverview Pedal board is responsible for hosting pedals and routing them.
 */

goog.provide('pb.Board');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('pb.box.conv.Component');
goog.require('pb.box.overdrive.Component');
goog.require('pb.box.reverb.Component');
goog.require('pb.box.volume.Component');
goog.require('tart.ui.DlgComponent');



/**
 * Board that hosts pedals.
 *
 * @constructor
 * @extends {tart.ui.DlgComponent}
 * @param {AudioContext} context The audio context of this board.
 */
pb.Board = function(context) {
    goog.base(this);
    this.context = context;
    this.initPedals();
    this.route();
};
goog.inherits(pb.Board, tart.ui.DlgComponent);


/**
 * Initializes the pedal components.
 */
pb.Board.prototype.initPedals = function() {
    this.overdrivePedal = new pb.box.overdrive.Component(this.context);
    this.reverbPedal = new pb.box.reverb.Component(this.context);
    this.volumePedal = new pb.box.volume.Component(this.context);
    this.speaker = new pb.box.conv.Component(this.context);

    this.pedals = [
        this.overdrivePedal,
        this.reverbPedal,
        this.volumePedal,
        this.speaker
    ];

    this.overdrivePedal.setDrive(7);
    this.volumePedal.setLevel(10);
    this.reverbPedal.setLevel(3);
};


/**
 * @override
 */
pb.Board.prototype.render = function() {
    goog.array.forEach(this.pedals, function(pedal) {
        pedal.render();
    });
};


/**
 * @override
 */
pb.Board.prototype.templates_base = function() {
    var pedals = goog.array.reduce(this.pedals, function(r, v) {
        return r += v.getPlaceholder();
    }, '');

    return '<div id="' + this.id + '" class="board">' + pedals + '</div>';
};


/**
 * Routes the signal.
 * Input -> volume pedal -> reverb pedal
 */
pb.Board.prototype.route = function() {
    var fx = this.pedals;

    goog.array.forEach(fx, function(pedal, i) {
        pedal.disconnect();
        fx[i + 1] && pedal.connect(fx[i + 1]);
    });

    for (var i = 0; i < fx.length - 1; i++) {
        fx[i].connect(fx[i + 1]);
    }
};
