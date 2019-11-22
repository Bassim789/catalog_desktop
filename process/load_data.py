from Versions import Versions
from Version import Version
from Vars_info import Vars_info 
from Vars_meta import Vars_meta 

def load_data(path):

  path = path if path.endswith('/') else path + '/'

  versions_path = path + 'version.xlsx'
  var_info_path = path + 'variable.xlsx'
  historic_variables_path = path + 'historic_variables.xlsx'
  current_variables_path = path + 'current_variables.xlsx'

  versions = Versions(versions_path)
  versions.load()

  if not versions.is_loaded():
    print('cannot load versions file: ' + versions_path)
    return False

  versions.data = versions.data.sort_values('data_date', ascending=False)

  versions.data_updated = []
  nb_iter = -1
  for i, version in versions.data.iterrows():
    nb_iter += 1

    versions.data_updated.append(version)
    version = Version(version)
    version.load()
    version.is_current = nb_iter == 0

    if not version.is_loaded():
      print('cannot load version: ' + version.path)
      continue

    version.filter_unnamed_cols()
    version.set_last_modif_datetime()

    if not version.is_update_to_do():
      print('no update for version: ' + version.path)
      continue
  
    print('updating version: ' + version.path)
    versions.data_updated[nb_iter]['data_last_modif'] = version.data_last_modif
    versions.data_updated[nb_iter]['timestamp_last_update'] = version.timestamp_last_update

    vars_info = Vars_info(var_info_path)
    vars_info.update_data(version.data)
    vars_info.load_data()

    vars_meta = Vars_meta()
    vars_meta.get_vars_data(vars_info.data, version.data)

    if version.is_current:
      vars_meta.save_current_variables(current_variables_path)
      print('current variables updated')

    vars_meta.save_historic_variables(historic_variables_path)

  versions.update()
  print('done')
