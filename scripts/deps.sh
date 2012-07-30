#!/bin/bash

#usage : scripts/deps.sh

js/library/tartJS/tools/goog/build/depswriter.py \
--root_with_prefix='js/ ../../../../../' \
--output_file='js/deps.js'