import os
import sys
from IO_file import IO_file
import pandas

io_file = IO_file()


data_path = 'data/'
if 'data_public' in sys.argv:
  data_path = 'data_public/'


def add_description(path, description_path):
  data_type = path.rsplit('/', 1)[1][:-5]
  description = io_file.load(description_path)
  data = io_file.load(path)
  if data_type == 'variable':
    data = pandas.merge(data, description, how='left', left_on='var_name_origin', right_on='variable')
    for i, row in data.iterrows():
      if row['description_y'] != '':
        data.at[i, 'description'] = row['description_y']
      else:
        data.at[i, 'description'] = row['description_x']
    data = data.drop(columns=['description_y', 'description_x', 'variable'])
  else: 
    data['description'] = description['description']
  
  io_file.save(path, data)

  path_len = 3 if data_type == 'database' else 4
  name = '/'.join(path.rsplit('/', path_len)[1:-1])
  print(data_type, 'description added for:', name)


catalog_path = "/Users/bassim/Documents/code/catalog/"

add_description(
  catalog_path + data_path + "databases/open_data/geneve/batiment/variable.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_OCS_BATLOG_SSECTEUR/variables_description.xlsx"
)
add_description(
  catalog_path + data_path + "databases/open_data/geneve/batiment/table.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_OCS_BATLOG_SSECTEUR/table_description.xlsx"
)

add_description(
  catalog_path + data_path + "databases/open_data/geneve/accident/variable.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_OTC_ACCIDENTS/variables_description.xlsx"
)
add_description(
  catalog_path + data_path + "databases/open_data/geneve/accident/table.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_OTC_ACCIDENTS/table_description.xlsx"
)

add_description(
  catalog_path + data_path + "databases/open_data/geneve/batiment_depense_chaleur/variable.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_SCANE_INDICE_DERNIER_2/variables_description.xlsx"
)
add_description(
  catalog_path + data_path + "databases/open_data/geneve/batiment_depense_chaleur/table.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_SCANE_INDICE_DERNIER_2/table_description.xlsx"
)


add_description(
  catalog_path + data_path + "databases/open_data/geneve/database.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/database_description.xlsx"
)


# own system
add_description(
  catalog_path + data_path + "/databases/own_system/all/tables/variable.xlsx",
  catalog_path + data_path + "/databases/own_system/all/tables/variable_descriptions.xlsx"
)
add_description(
  catalog_path + data_path + "/databases/own_system/all/databases/variable.xlsx",
  catalog_path + data_path + "/databases/own_system/all/databases/variable_descriptions.xlsx"
)
add_description(
  catalog_path + data_path + "/databases/own_system/all/current_variables/variable.xlsx",
  catalog_path + data_path + "/databases/own_system/all/current_variables/variable_descriptions.xlsx"
)
add_description(
  catalog_path + data_path + "/databases/own_system/all/current_modalities/variable.xlsx",
  catalog_path + data_path + "/databases/own_system/all/current_modalities/variable_descriptions.xlsx"
)

add_description(
  catalog_path + data_path + "/databases/own_system/all/tables/table.xlsx",
  catalog_path + data_path + "/databases/own_system/all/tables/table_description.xlsx"
)
add_description(
  catalog_path + data_path + "/databases/own_system/all/databases/table.xlsx",
  catalog_path + data_path + "/databases/own_system/all/databases/table_description.xlsx"
)
add_description(
  catalog_path + data_path + "/databases/own_system/all/current_variables/table.xlsx",
  catalog_path + data_path + "/databases/own_system/all/current_variables/table_description.xlsx"
)
add_description(
  catalog_path + data_path + "/databases/own_system/all/current_modalities/table.xlsx",
  catalog_path + data_path + "/databases/own_system/all/current_modalities/table_description.xlsx"
)

add_description(
  catalog_path + data_path + "/databases/own_system/all/database.xlsx",
  catalog_path + data_path + "/databases/own_system/all/database_description.xlsx"
)
