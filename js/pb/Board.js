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
goog.require('pb.stomp.Conv');
goog.require('pb.stomp.Overdrive');
goog.require('pb.stomp.Reverb');
goog.require('pb.stomp.Volume');
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
 * @param {pb.stomp.Box} child Child.
 * @param {number} index Index.
 * @param {boolean=} opt_render Render.
 */
pb.Board.prototype.addChildAt = function(child, index, opt_render) {
    goog.base(this, 'addChildAt', child, index, opt_render);

    if (this.getChildren().length)
        goog.dom.removeNode(this.$(this.mappings.EMPTY)[0]);

    this.routeInternal();
    if (this.isInDocument()) this.doShadows();
};


/**
 * Convenience method for adding pedals at a given index.
 */
pb.Board.prototype.addPedalAt = pb.Board.prototype.addChildAt;


/**
 * @override
 */
pb.Board.prototype.removeChild = function(child, opt_unrender) {
    goog.base(this, 'removeChild', child, opt_unrender);

    if (this.getChildren().length == 0)
        this.getElement().innerHTML = this.templates_empty();

    this.routeInternal();
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
    return '<div class="empty">your pedalboard is empty</div>';
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
    var fx = this.getChildren();
    if (fx.length) {
        fx.forEach(function(pedal, i) {
            pedal.disconnect();
            fx[i + 1] && pedal.connect(fx[i + 1]);
        });

        this.getInput().disconnect();
        this.getInput().connect(fx[0].getInput());
        fx.length && this.output && fx[fx.length - 1].connect(this.output);
    }
};


/**
 * @override
 */
pb.Board.prototype.disposeInternal = function() {
    this.getChildren().forEach(function(pedal) {
        pedal.disposeInternal();
    });

    goog.base(this, 'disposeInternal');
};


/**
 * @enum {string} DOM mappings.
 */
pb.Board.prototype.mappings = {
    EMPTY: '.empty'
};
