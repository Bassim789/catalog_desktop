from Dataframe import Dataframe
from IO_file import IO_file
io_file = IO_file()

class Versions(Dataframe):
  def __init__(self, path):
    super().__init__(path)

  def update(self):
    io_file.save(self.path, io_file.dict_to_dataframe(self.data_updated))