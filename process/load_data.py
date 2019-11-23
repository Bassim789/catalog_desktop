import webbrowser
import os
from pathlib import Path
from Data_loader import Data_loader

catalog_path = os.path.realpath(__file__).rsplit('/', 2)[0] + '/'
data_path = catalog_path + 'data/'
data_loader = Data_loader(data_path)

for versions_file in Path(data_path).rglob('versions.xlsx'):
  versions_file_path = str(versions_file).rsplit('/', 1)[0] + '/'
  path_name = versions_file_path.split(data_path)[1]
  data_loader.set_path(path_name)
  print('checking', path_name)
  #data_loader.clear_path()
  is_changed = data_loader.load_data()
  if is_changed:
    print('updating', path_name)
    data_loader.update_main_data()

#webbrowser.open('file://' + catalog_path + 'web/index.html')
