#!/bin/bash

#usage : scripts/build.sh

js/library/tartJS/tools/goog/build/closurebuilder.py \
--root=js/ \
--namespace="stomp.Bootstrapper" \
--output_mode=compiled \
--output_file=js/compiled/compiled.js \
--compiler_jar=js/library/tartJS/tools/goog/compiler/compiler.jar \
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
--compiler_flags="--output_wrapper='(function(){%output%})()'" \
--compiler_flags="--create_source_map='js/compiled/source_map.js'" \
--compiler_flags="--property_map_output_file='js/compiled/properties.out'" \
--compiler_flags="--variable_map_output_file='js/compiled/variables.out'" \
--compiler_flags="--formatting=PRETTY_PRINT" \
--compiler_flags="--warning_level=VERBOSE" \
--compiler_flags="--externs=js/library/tartJS/tart/externs/jquery-1.4.4.externs.js" \
--compiler_flags="--externs=js/library/tartJS/tart/externs/tart.externs.js" \
--compiler_flags="--externs=js/library/tartJS/tart/externs/w3c_audio.externs.js" \
--compiler_flags="--externs=js/library/tartJS/tart/externs/jasmine.externs.js" \
--compiler_flags="--externs=js/stomp/externs/stomp.externs.js" \
--compiler_flags="--jscomp_error=accessControls" \
--compiler_flags="--jscomp_error=checkRegExp" \
--compiler_flags="--jscomp_error=checkTypes" \
--compiler_flags="--jscomp_error=checkVars" \
--compiler_flags="--jscomp_error=invalidCasts" \
--compiler_flags="--jscomp_error=missingProperties" \
--compiler_flags="--jscomp_error=nonStandardJsDocs" \
--compiler_flags="--jscomp_error=strictModuleDepCheck" \
--compiler_flags="--jscomp_error=undefinedVars" \
--compiler_flags="--jscomp_error=unknownDefines" \
--compiler_flags="--jscomp_error=visibility"