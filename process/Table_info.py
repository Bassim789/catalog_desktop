import warnings
from Dataframe import Dataframe
from log import log
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
    data = [{
      'db_name': self.db_name, 
      'table_name': self.table_name,
      'nb_versions': nb_versions,
      'description': "Description of table " + self.table_name
    }]
    io_file.save(self.path, io_file.dict_to_dataframe(data))
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

    table_data = io_file.load(self.path) # use self.data

    if io_file.file_exists(path):
      all_tables = io_file.load(path)
      with warnings.catch_warnings():
        warnings.simplefilter(action='ignore', category=FutureWarning)
        condition = (all_tables.db_name == table_data.db_name.values[0]) & \
                    (all_tables.table_name == table_data.table_name.values[0])
        all_tables = all_tables.drop(all_tables[condition].index)
      all_tables_data = io_file.concat([all_tables, table_data])

    else:
      all_tables_data = table_data

    io_file.save(path, all_tables_data)
    io_file.copy_excel_to_js(path, 'all_tables')
    