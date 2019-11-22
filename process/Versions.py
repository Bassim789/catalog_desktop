from IO_file import IO_file
io_file = IO_file()

class Versions():
  def __init__(self, path):
    self.path = path

  def load(self):
    self.data = io_file.load(self.path)

  def is_loaded(self):
    return io_file.is_dataframe(self.data)

  def update(self):
    io_file.save(self.path, io_file.dict_to_dataframe(self.data_updated))