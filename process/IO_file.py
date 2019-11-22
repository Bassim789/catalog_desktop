import pandas
import json
import os
from datetime import datetime

class IO_file():

  def __init__(self):
    self.datetime_format = "%Y-%m-%d %H:%M:%S"

  def load(self, path, source='excel'):
    if not os.path.exists(path):
      return False
    if source == 'excel':
      return pandas.read_excel(path)
    elif source == 'csv':
      return pandas.read_csv(path)

  def file_exists(self, path):
    return os.path.exists(path)

  def get_last_modif_datetime(self, path):
    return self.timestamp_to_datetime(int(os.path.getmtime(path)))

  def timestamp_to_datetime(self, timestamp):
    return datetime.fromtimestamp(timestamp).strftime(self.datetime_format)

  def datetime_now(self):
    return datetime.now().strftime(self.datetime_format)

  def is_dataframe(self, data):
    return isinstance(data, pandas.DataFrame)
 
  def dict_to_dataframe(self, dict_data, columns=False):
    if columns:
      return pandas.DataFrame(dict_data, columns=columns)
    else:
      return pandas.DataFrame(dict_data)

  def save(self, path, dataframe, output='excel'):
    if output == 'excel':
      dataframe.to_excel(path, index=False)
    elif output == 'csv':
      dataframe.to_csv(path, index=False)

  def copy_excel_to_js(self, path, name):
    path_js = path.replace('.xlsx', '.js')
    self.save_to_json(path_js, self.load(path))
    self.prepend_line(path_js, 'const ' + name + ' = ')

  def save_to_js(self, path, dataframe):
    self.save_to_json(path, dataframe)
    self.prepend_line(path, 'const variable_data = ')

  def save_to_json(self, path, dataframe):
    data = dataframe.to_dict('index')
    with open(path, 'w') as file:
      json.dump(data, file)

  def prepend_line(self, path, line):
    with open(path, 'r+') as file:
      content = file.read()
      file.seek(0, 0)
      file.write(line.rstrip('\r\n') + '\n' + content)

  def print_dataframe(self, dataframe):
    print()
    data = dataframe.to_dict('index')
    for row in data:
      for prop in data[row]:
        print(prop, ': ', data[row][prop])
      print()
