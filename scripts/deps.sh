#!/bin/bash

#usage : scripts/deps.sh

src/library/tartJS/tools/goog/build/depswriter.py \
--root_with_prefix='src/ ../../../../../' \
--output_file='src/deps.js'
