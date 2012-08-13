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
 * @fileoverview Conv pedal.
 */

goog.provide('pb.box.conv.Component');
goog.require('pb.box.box.Component');
goog.require('pb.box.conv.ComponentModel');



/**
 * Conv pedal.
 *
 * @constructor
 * @extends {pb.box.box.Component}
 * @param {webkitAudioContext} context Audio context the pedal will work on.
 */
pb.box.conv.Component = function(context) {
    goog.base(this, context);
};
goog.inherits(pb.box.conv.Component, pb.box.box.Component);


/**
 * @override
 */
pb.box.conv.Component.prototype.modelClass = pb.box.conv.ComponentModel;


/**
 * @override
 */
pb.box.conv.Component.prototype.name = 'convo';
