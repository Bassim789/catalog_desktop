from IO_file import IO_file
io_file = IO_file()

class Dataframe():
  def __init__(self, path):
    self.path = path

  def load_data(self):
    self.data = io_file.load(self.path)

  def is_loaded(self):
    return io_file.is_dataframe(self.data)