import warnings
from Dataframe import Dataframe
from IO_file import IO_file
io_file = IO_file()

class Database_info(Dataframe):
  def __init__(self, path, path_name):
    super().__init__(path)
    self.db_name = path_name.strip('/').rsplit('/', 1)[0]

  def create(self):
    data = [{
      'db_name': self.db_name,
      'description': "Description of database " + self.db_name
    }]
    io_file.save(self.path, io_file.dict_to_dataframe(data))
    self.load_data()

  def save_to_all_databases(self, path):

    database_data = io_file.load(self.path) # use self.data

    if io_file.file_exists(path):
      all_databases = io_file.load(path)
      with warnings.catch_warnings():
        warnings.simplefilter(action='ignore', category=FutureWarning)
        condition = all_databases.db_name == database_data.db_name.values[0]
        all_databases = all_databases.drop(all_databases[condition].index)
      all_databases_data = io_file.concat([all_databases, database_data])

    else:
      all_databases_data = database_data

    io_file.save(path, all_databases_data)
    io_file.copy_excel_to_js(path, 'all_databases')