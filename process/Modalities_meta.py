from IO_file import IO_file
io_file = IO_file()

class Modalities_meta():

  def __init__(self):
    self.nb_modality_max = 10

  def save_current(self, path, source_data):
    modalities_data = []
    for var_name in source_data:
      var = source_data[var_name]
      nb_row = var.count()
      modalities = var.value_counts().head(self.nb_modality_max)
      for value, nb in modalities.items():
        modalities_data.append({
          'var_name': var_name,
          'value': value,
          'nb': nb,
          'percent': round(nb / nb_row * 100, 1)
        })
    dataframe = io_file.dict_to_dataframe(modalities_data)
    io_file.save(path, dataframe)

  def save_historic(self, path):
    pass