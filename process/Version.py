from IO_file import IO_file
io_file = IO_file()

class Version():
  def __init__(self, version):
    self.last_modif = version['data_last_modif'] if 'data_last_modif' in version else False
    self.path = version['path'].strip() + version['file'].strip()
    self.name = str(version['name']).strip()
    self.data_date = version['data_date'] 

  def load(self):
    self.data = io_file.load(self.path)

  def filter_unnamed_cols(self):
    self.data = self.data.loc[:, ~self.data.columns.str.contains('^Unnamed')]

  def set_last_modif_datetime(self):
     self.data_last_modif = io_file.get_last_modif_datetime(self.path)
     self.timestamp_last_update = io_file.datetime_now()

  def is_loaded(self):
    return io_file.is_dataframe(self.data)

  def is_update_to_do(self):
    return not self.last_modif or self.last_modif != self.data_last_modif
