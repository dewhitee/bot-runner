#!/bin/bash
## Simple script to get the current directory name without the filepath
result=${PWD##*/}
printf '%s\n' "${PWD##*/}"