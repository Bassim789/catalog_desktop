import os
from IO_file import IO_file

io_file = IO_file()

def add_description(path, description_path):
  description = io_file.load(description_path)
  data = io_file.load(path)
  data['description'] = description['description']
  io_file.save(path, data)

  data_type = path.rsplit('/', 1)[1][:-5]
  path_len = 3 if data_type == 'database' else 4
  name = '/'.join(path.rsplit('/', path_len)[1:-1])
  print(data_type, 'description added for:', name)


add_description(
  "/Users/bassim/Documents/github/catalog_desktop/data/databases/open_data/geneve/batiment/variable.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_OCS_BATLOG_SSECTEUR/variables_description.xlsx"
)
add_description(
  "/Users/bassim/Documents/github/catalog_desktop/data/databases/open_data/geneve/batiment/table.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_OCS_BATLOG_SSECTEUR/table_description.xlsx"
)

add_description(
  "/Users/bassim/Documents/github/catalog_desktop/data/databases/open_data/geneve/accident/variable.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_OTC_ACCIDENTS/variables_description.xlsx"
)
add_description(
  "/Users/bassim/Documents/github/catalog_desktop/data/databases/open_data/geneve/accident/table.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/CSV_OTC_ACCIDENTS/table_description.xlsx"
)


add_description(
  "/Users/bassim/Documents/github/catalog_desktop/data/databases/open_data/geneve/database.xlsx",
  "/Users/bassim/Documents/dr/data/open_data/open_data_swiss/geneve/database_description.xlsx"
)
