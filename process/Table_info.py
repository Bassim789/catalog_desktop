from Dataframe import Dataframe
from log import log
import os.path, time
from IO_file import IO_file
io_file = IO_file()

class Table_info(Dataframe):
  def __init__(self, path, path_name):
    super().__init__(path)
    self.path_name = path_name
    self.db_name = path_name.strip('/').rsplit('/', 1)[0]
    self.table_name = path_name.strip('/').rsplit('/', 1)[1]
    
  def create(self, versions):
    nb_versions = len(versions.data)
    file_path = versions.data['path'].iloc[0]
    data = [{
      'db_name': self.db_name, 
      'table_name': self.table_name,
      'nb_versions': nb_versions,
      'description': "Description of table " + self.table_name,
      'table_last_modif_readable': os.path.getmtime(file_path),
      'table_file_path': file_path
    }]
    io_file.save(self.path, io_file.dict_to_dataframe(data))
    io_file.adjust_excel_column_width(self.path)
    self.load_data()

  def db_or_table_name_changed(self):
    return self.data['table_name'][0] != self.table_name or \
           self.data['db_name'][0] != self.db_name 

  def update_table_and_db_name(self, all_current_variables_path):
    old_db_table_name = self.data['db_name'][0] + '/' + self.data['table_name'][0]
    new_db_table_name = self.db_name + '/' + self.table_name

    all_current = io_file.load(all_current_variables_path)
    all_current.loc[(all_current['table'] == old_db_table_name), 'table'] = new_db_table_name
    io_file.save(all_current_variables_path, all_current)
    io_file.copy_excel_to_js(all_current_variables_path, 'all_current_variables')
    log('update_table_and_db_name', old_db_table_name, '=>', new_db_table_name)

  def save_to_all_tables(self, path):
    if io_file.file_exists(path):
      all_tables = io_file.load(path)
      condition = (all_tables.db_name == self.data.db_name.values[0]) & \
                  (all_tables.table_name == self.data.table_name.values[0])
      all_tables = all_tables.drop(all_tables[condition].index)
      all_tables_data = io_file.concat([all_tables, self.data])
    else:
      all_tables_data = self.data

    all_tables_data = all_tables_data[[
      'db_name', 
      'table_name',
      'description',
      'nb_row',
      'nb_versions',
      'table_file_path',
      'table_last_modif_readable'
    ]]
   
    io_file.save(path, all_tables_data)
    io_file.copy_excel_to_js(path, 'all_tables')

  def add_nb_row(self, nb_row):
    self.data['nb_row'] = nb_row
    io_file.save(self.path, self.data)
    io_file.adjust_excel_column_width(self.path)


    