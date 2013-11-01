#!/bin/bash

#usage : scripts/deps.sh

lib/tartJS/tools/goog/build/depswriter.py \
--root_with_prefix='src/ ../../../../../src/' \
--root_with_prefix='lib/ ../../../../../lib/' \
--output_file='example/deps.js'
