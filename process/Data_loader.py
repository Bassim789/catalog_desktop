from Table_info import Table_info
from Versions import Versions
from Version import Version
from Vars_info import Vars_info 
from Vars_meta import Vars_meta 
from IO_file import IO_file

io_file = IO_file()

class Data_loader():
  def __init__(self, catalog_data_path):
    self.catalog_data_path = catalog_data_path
    self.all_current_variables_path = catalog_data_path + 'all_current_variables.xlsx'

  def set_path(self, path_name):
    self.path_name = path_name
    self.path = self.catalog_data_path + path_name
    self.table_info_path = self.path + 'table.xlsx'
    self.versions_path = self.path + 'versions.xlsx'
    self.var_info_path = self.path + 'variable.xlsx'
    self.historic_variables_path = self.path + 'historic_variables.xlsx'
    self.current_variables_path = self.path + 'current_variables.xlsx'
    self.files = [
      self.versions_path,
      self.var_info_path,
      self.historic_variables_path,
      self.current_variables_path
    ]

  def clear_path(self):
    io_file.remove_file(self.var_info_path)
    io_file.remove_file(self.historic_variables_path)
    io_file.remove_file(self.current_variables_path)

  def load_data(self):

    versions = Versions(self.versions_path)
    versions.load_data()
    versions.data = versions.data.sort_values('data_date', ascending=False)
    versions.is_changed = False
    versions.data_updated = []

    table_info = Table_info(self.table_info_path, self.path_name)
    table_info.load_data()
    if not table_info.is_loaded():
      table_info.create(versions)

    if(table_info.db_or_table_name_changed()):
      table_info.update_table_and_db_name(self.all_current_variables_path)
      table_info.create(versions)

    nb_iter = -1
    for i, version in versions.data.iterrows():
      nb_iter += 1

      versions.data_updated.append(version)
      version = Version(version)
      version.load_data()
      version.is_current = nb_iter == 0

      if not version.is_loaded():
        print('error: cannot load version ' + version.path)
        continue

      version.filter_unnamed_cols()
      version.set_last_modif_datetime(self.var_info_path)

      if not version.is_update_to_do() \
        and not io_file.is_missing_files(self.files) \
        and not version.is_vars_info_changed(self.var_info_path): 
        continue
      
      print('updating_table', version.name)

      versions.is_changed = True
      versions.data_updated[nb_iter]['data_last_modif'] = version.data_last_modif
      versions.data_updated[nb_iter]['meta_last_modif'] = version.meta_last_modif

      vars_info = Vars_info(self.var_info_path)
      vars_info.update_data(version.data)
      vars_info.load_data()

      versions.data_updated[nb_iter]['info_last_modif'] = io_file.get_last_modif_datetime(self.var_info_path)

      vars_meta = Vars_meta(version)
      vars_meta.get_vars_data(vars_info.data, version.data)

      if version.is_current:
        vars_meta.save_current_variables(self.current_variables_path)
       
      vars_meta.save_historic_variables(self.historic_variables_path)

    if versions.is_changed:
      versions.update()
      return True
    return False

  def update_main_data(self):
    current_variables = io_file.load(self.current_variables_path)
    all_current = io_file.load(self.all_current_variables_path)

    current_variables.insert(loc=0, column='table', value=self.path_name.strip('/'))
    if io_file.is_dataframe(all_current):
      condition = all_current.table == self.path_name.strip('/')
      all_current = all_current.drop(all_current[condition].index)
      all_vars = io_file.concat([all_current, current_variables])
    else:
      all_vars = current_variables
    io_file.save(self.all_current_variables_path, all_vars)
    io_file.copy_excel_to_js(self.all_current_variables_path, 'all_current_variables')

