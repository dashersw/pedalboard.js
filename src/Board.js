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
goog.require('pb.stomp.Cabinet');
goog.require('pb.stomp.Overdrive');
goog.require('pb.stomp.Reverb');
goog.require('pb.stomp.Volume');
goog.require('pb.stomp.Delay');
goog.require('tart.ui.DlgComponent');



/**
 * Board that hosts pedals.
 *
 * @constructor
 * @extends {pb.Connectable}
 *
 * @param {AudioContext} context The audio context of this board.
 */
pb.Board = function(context) {
    goog.base(this, context);
    this.context = context;
};
goog.inherits(pb.Board, pb.Connectable);


/**
 * Pedals of this board.
 *
 * @protected
 * @type {Array.<pb.stomp.Box>}
 */
pb.Board.prototype.pedals = null;


/**
 * Adds pedals to this board. An alias method for addChildren.
 * @param {Array.<pb.stomp.Box>} pedals Pedals.
 */
pb.Board.prototype.addPedals = function(pedals) {
    pb.ui.Component.prototype.addChildren.call(this, pedals);
};


/**
 * Calculates and draws shadows for pedals and their pots.
 */
pb.Board.prototype.doShadows = function() {
    this.getPedals().forEach(function(pedal) {
        pb.shadowMaker(pedal.getElement(), 40, 0.5, 0.7);
        pedal.pots.forEach(function(pot) {
            pb.shadowMaker(pot.$(pot.mappings.KNOB_HOLDER)[0], 10, 0.5, 4);
        });
    });
};


/**
 * @override
 *
 * @param {pb.stomp.Box} child Child pedal to add to this board.
 * @param {number} index Where the child pedal should be put at.
 * @param {boolean=} opt_render Whether the pedal should be rendered after the call to this function.
 */
pb.Board.prototype.addChildAt = function(child, index, opt_render) {
    goog.base(this, 'addChildAt', child, index, opt_render);

    if (this.getPedals().length)
        goog.dom.removeNode(this.$(this.mappings.EMPTY)[0]);

    this.routeInternal();
    if (this.isInDocument()) this.doShadows();
};


/**
 * Convenience method for adding pedals at a given index.
 *
 * @param {pb.stomp.Box} child Child pedal to add to this board.
 * @param {number} index Where the child pedal should be put at.
 * @param {boolean=} opt_render Whether the pedal should be rendered after the call to this function.
 */
pb.Board.prototype.addPedalAt = function(child, index, opt_render) {
    this.addChildAt(child, index, opt_render);
};


/**
 * @override
 */
pb.Board.prototype.removeChild = function(child, opt_unrender) {
    var el = goog.base(this, 'removeChild', child, opt_unrender);

    if (this.getPedals().length == 0)
        this.getElement().innerHTML = this.templates_empty();

    this.routeInternal();
    return el;
};


/**
 * @override
 */
pb.Board.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    this.doShadows();
};


/**
 * Returns the pedals in this board.
 *
 * @return {Array.<pb.stomp.Box>} Pedals in this board.
 */
pb.Board.prototype.getPedals = function() {
    return this.getChildren();
};


/**
 * @override
 */
pb.Board.prototype.templates_base = function() {
    return '<div id="' + this.getId() + '" class="board">' +
               this.templates_empty() +
           '</div>';
};


pb.Board.prototype.templates_empty = function() {
    return '<div class="empty"><div class="text">board is empty</div></div>';
};


/**
 * @override
 */
pb.Board.prototype.connect = function(destination) {
    goog.base(this, 'connect', destination);
    this.output = destination;
    this.routeInternal();
};


/**
 * Routes the pedals.
 *
 * @protected
 */
pb.Board.prototype.routeInternal = function() {
    var fx = this.getPedals();

    this.getInput().disconnect();

    if (fx.length) {
        this.getInput().connect(fx[0].getInput());
        this.output && fx[fx.length - 1].connect(this.output);

        fx.forEach(function(pedal, i) {
            pedal.disconnect();
            fx[i + 1] && pedal.connect(fx[i + 1]);
        });
        this.output && this.mediaStreamDestination && fx[fx.length - 1].model.getOutput().connect(this.mediaStreamDestination);
    }
    else {
        this.getInput().connect(this.getOutput());
        this.mediaStreamDestination && this.getInput().connect(this.mediaStreamDestination);
    }
};


/**
 * Sets the media stream destination for this board. The output will be sent to the media stream destination, too.
 *
 * @param {MediaStreamDestination} destination Media stream destination for RTC peer connections.
 */
pb.Board.prototype.setMediaStreamDestination = function(destination) {
    this.mediaStreamDestination = destination;
};


/**
 * @enum {string} DOM mappings.
 */
pb.Board.prototype.mappings = {
    EMPTY: '.empty'
};
