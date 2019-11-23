from Dataframe import Dataframe
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
      'nb_versions': nb_versions
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
    print('update_table_and_db_name', old_db_table_name, '=>', new_db_table_name)
