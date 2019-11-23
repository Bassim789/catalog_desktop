from IO_file import IO_file
io_file = IO_file()

class Vars_info():
  def __init__(self, path):
    self.path = path

  def load_data(self):
    self.data = io_file.load(self.path)

  def update_data(self, version_data):
    if not io_file.file_exists(self.path):
      data = []
      for var_name_origin in version_data:
        var_data = version_data[var_name_origin]
        data.append([var_name_origin, var_name_origin, var_data.dtype, ''])
    else:
      vars_info = io_file.load(self.path)
      dict_vars = self.get_dict_vars(vars_info, version_data)
      data = self.get_dict_vars_data(dict_vars)
    columns = ['var_name_origin', 'var_name', 'type', 'description']
    vars_info_output = io_file.dict_to_dataframe(data, columns=columns)
    io_file.save(self.path, vars_info_output)

  def get_dict_vars(self, vars_info, source_data):
    dict_vars = {}
    for var_name_origin in source_data:
      if var_name_origin not in dict_vars:
        var_data = source_data[var_name_origin]
        var_data.var_name_origin = var_name_origin
        dict_vars[var_name_origin] = {'source': var_data, 'info': False, 'from': 'source'}
    for i, var_info in vars_info.iterrows():
      if var_info['var_name_origin'] not in dict_vars:
        dict_vars[var_info['var_name_origin']] = {'source': False, 'info': var_info, 'from': 'info'}
      else:
        dict_vars[var_info['var_name_origin']]['info'] = var_info
        dict_vars[var_info['var_name_origin']]['from'] = 'both'
    return dict_vars

  def get_dict_vars_data(self, dict_vars):
    data = []
    for var_name_origin in dict_vars:
      var = dict_vars[var_name_origin]
      if var['from'] == 'source':
        var_name = var['source'].var_name_origin
        var_type = var['source'].dtype
        description = ''
      if var['from'] == 'info' or var['from'] == 'both':
        var_name = var['info']['var_name']
        var_type = var['info']['type']
        description = var['info']['description']
      data.append([var_name_origin, var_name, var_type, description])
    return data
