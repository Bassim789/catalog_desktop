from Dataframe import Dataframe
from log import log
from IO_file import IO_file
io_file = IO_file()

class Version(Dataframe):
  def __init__(self, version):
    if 'path' not in version:
      log('Error: missing column "path" in version file')
      return False
    super().__init__(version['path'].strip())

    self.name = str(version['name']).strip() if 'name' in version else 'current'
    self.data_date = version['data_date'] if 'data_date' in version else '2020'  
    self.new_data_last_modif = version['data_last_modif'] if 'data_last_modif' in version else 0
    self.info_last_modif = version['info_last_modif'] if 'info_last_modif' in version else ''

  def filter_unnamed_cols(self):
    self.data = self.data.loc[:, ~self.data.columns.str.contains('^Unnamed')]

  def set_last_modif_datetime(self, var_info_path):
     self.data_last_modif = io_file.get_last_modif_datetime(self.path)
     self.meta_last_modif = io_file.datetime_now()

  def is_vars_info_changed(self, path):
    if not io_file.file_exists(path):
      return True
    return self.info_last_modif != io_file.get_last_modif_datetime(path)

  def is_update_to_do(self):
    return not self.data_last_modif or self.data_last_modif != self.new_data_last_modif
