import pandas
import json
import os
from datetime import datetime
import csv
import openpyxl

class IO_file():

  def __init__(self):
    self.datetime_format = "%Y-%m-%d %H:%M:%S"

  def load(self, path):
    if not os.path.exists(path):
      return False

    file_extension = os.path.splitext(path)[1]

    if file_extension in ['.xls', '.xlsx']:
      return pandas.read_excel(
        path, 
        #converters={'Date': str}
      )
    
    elif file_extension in ['.csv', '.txt']:
      delimiter = self.get_csv_delimiter(path)
      return pandas.read_csv(
        path, 
        delimiter=delimiter, 
        encoding='ISO-8859-1', 
        #converters={'Date': str}
      )

  def file_exists(self, path):
    return os.path.exists(path)

  def get_csv_delimiter(self, path):
    with open(path, errors='replace') as f:
      first_line = f.readline()
      sniffer = csv.Sniffer()
      dialect = sniffer.sniff(first_line)
    return dialect.delimiter

  def adjust_excel_column_width(self, path):
    wb = openpyxl.load_workbook(filename=path)        
    worksheet = wb.active
    for col in worksheet.columns:
      max_length = 0
      column = col[0].column
      for cell in col:
        if cell.coordinate in worksheet.merged_cells:
          continue
        try:
          if len(str(cell.value)) > max_length:
            max_length = len(cell.value)
        except:
          pass
      adjusted_width = (max_length + 2) * 1.2
      column_letter = openpyxl.utils.get_column_letter(column)
      worksheet.column_dimensions[column_letter].width = adjusted_width
    wb.save(path)

  def remove_file(self, path):
    if os.path.exists(path):
      os.remove(path)

  def is_missing_files(self, files):
    for file in files:
      if not self.file_exists(file):
        return True
    return False

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

  def concat(self, dataframes):
    return pandas.concat(dataframes, sort=True)

  def save(self, path, dataframe, output='excel'):
    if output == 'excel':
      dataframe.to_excel(path, index=False)
    elif output == 'csv':
      dataframe.to_csv(path, index=False)

  def copy_excel_to_js(self, path, name):
    path_js = path.replace('.xlsx', '.js')
    self.save_to_json(path_js, self.load(path))
    self.prepend_line(path_js, 'data.' + name + ' = ')

  def save_to_js(self, path, dataframe):
    self.save_to_json(path, dataframe)
    self.prepend_line(path, 'const variable_data = ')

  def save_to_json(self, path, dataframe):
    data_dict = dataframe.fillna('').to_dict('index')
    data = [data for data in data_dict.values()]
    with open(path, 'w') as file:
      json.dump(data, file, default=str, indent=1)

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
