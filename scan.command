#!/bin/bash
cd "$(dirname "$0")"
python3 process/load_data.py clear_data
python3 process/add_descriptions.py
python3 process/load_data.py
open file://$PWD/app.html