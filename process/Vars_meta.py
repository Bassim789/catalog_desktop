from IO_file import IO_file
io_file = IO_file()

class Vars_meta():

  def __init__(self, version):
    self.version_name = version.name
    self.version_data_date = version.data_date
    self.is_current_version = version.is_current

  def get_vars_data(self, vars_info, source_data):
    vars_data = []
    for var_name_origin in source_data:
      var = source_data[var_name_origin]
      self.var_name_origin = var_name_origin
      data = self.init_var_data(var)
      data = self.add_vars_info(data, vars_info)
      if data['dtype'] in ['int64', 'float64']:
        data = self.add_number_stat(data, var)
      vars_data.append(data)

    dataframe = io_file.dict_to_dataframe(vars_data)
    dataframe['datetime'] = io_file.datetime_now()
    dataframe['is_current'] = self.is_current_version
    dataframe['version_name'] = self.version_name
    dataframe['version_data_date'] = self.version_data_date
    self.data = dataframe

  def init_var_data(self, var):
    data = {
      'var_name': '',
      'description': '',
      'var_name_origin': self.var_name_origin,
      'dtype': str(var.dtype),
      'nb_row': int(var.count()),
      'nb_distinct': int(var.nunique())
    }
    data['nb_duplicate'] = int(data['nb_row'] - data['nb_distinct'])
    data['percent_duplicate'] = self.percent(data['nb_duplicate'], data['nb_row'])
    data['percent_distinct'] = self.percent(data['nb_distinct'], data['nb_row'])
    return data

  def add_number_stat(self, data, var):
    data['min'] = self.clean_num(var.min())
    data['mean'] = self.clean_num(var.mean())
    data['median'] = self.clean_num(var.median())
    data['max'] = self.clean_num(var.max())
    return data

  def add_vars_info(self, data, vars_info):
    for i, var_info in vars_info.iterrows():
      if var_info['var_name_origin'] == self.var_name_origin:
        data['var_name'] = var_info['var_name']
        data['description'] = var_info['description']
        break
    return data

  def save_historic_variables(self, path):
    if io_file.file_exists(path):
      historic = io_file.load(path)
      condition = historic.version_name == self.version_name
      historic = historic.drop(historic[condition].index)
      if self.is_current_version:
        historic.is_current = False
      vars_meta = io_file.concat([historic, self.data])
    else:
      vars_meta = self.data
    io_file.save(path, vars_meta)
    io_file.copy_excel_to_js(path, 'historic_variables')

  def save_current_variables(self, path):
    io_file.save(path, self.data)
    io_file.copy_excel_to_js(path, 'current_variables')

  @staticmethod
  def percent(value, total):
    if total <= 0:
      return False
    return round(value / total * 100, 1)

  @staticmethod
  def clean_num(num):
    if isinstance(num, str):
      return num
    num = num.round(3)
    if num > 10:
      num = int(num.astype(int))
    return num
