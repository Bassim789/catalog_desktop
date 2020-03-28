#!/bin/bash
cd "$(dirname "$0")"
python3 process/load_data.py 
open file://$PWD/app.html