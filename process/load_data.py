import webbrowser
import os
import sys
from pathlib import Path
from Data_loader import Data_loader

clear_data = 'clear_data' in sys.argv
data_path = 'data/'
if 'data_public' in sys.argv:
  data_path = 'data_public/'

catalog_path = os.path.realpath(__file__).rsplit('/', 2)[0] + '/'
data_path = catalog_path + data_path + 'databases/'
data_loader = Data_loader(data_path)

if clear_data: 
  data_loader.clear_path_all()

for versions_file in Path(data_path).rglob('versions.xlsx'):
  versions_file_path = str(versions_file).rsplit('/', 1)[0] + '/'
  path_name = versions_file_path.split(data_path)[1]
  data_loader.set_path(path_name)
  if clear_data: 
    data_loader.clear_path()
  data_loader.load_data()
  if data_loader.is_changed:
    data_loader.update_main_data()
    data_loader.update_main_modality()

#webbrowser.open('file://' + catalog_path + 'web/index.html')
