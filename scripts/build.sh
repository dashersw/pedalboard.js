#!/bin/bash

#usage : scripts/build.sh

lib/tartJS/tools/goog/build/closurebuilder.py \
--root=src/ \
--root=lib/ \
--namespace="pb.Bootstrapper" \
--output_mode=compiled \
--output_file=dist/compiled.js \
--compiler_jar=lib/tartJS/tools/goog/compiler/compiler.jar \
--compiler_flags="--compilation_level=SIMPLE_OPTIMIZATIONS" \
--compiler_flags="--output_wrapper='(function(){%output%;window.pb=pb;})()'" \
--compiler_flags="--create_source_map='dist/source_map.js'" \
--compiler_flags="--property_map_output_file='dist/properties.out'" \
--compiler_flags="--variable_map_output_file='dist/variables.out'" \
--compiler_flags="--warning_level=VERBOSE" \
--compiler_flags="--externs=lib/tartJS/tart/externs/jquery-1.4.4.externs.js" \
--compiler_flags="--externs=lib/tartJS/tart/externs/tart.externs.js" \
--compiler_flags="--externs=lib/tartJS/tart/externs/w3c_audio.js" \
--compiler_flags="--externs=lib/tartJS/tart/externs/jasmine.externs.js" \
--compiler_flags="--externs=src/externs/pb.externs.js" \
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
--compiler_flags="--jscomp_off=liskov" \
--compiler_flags="--jscomp_error=visibility"
