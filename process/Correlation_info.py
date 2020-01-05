import pandas
import scipy.stats  as stats
from operator import itemgetter
from Dataframe import Dataframe
from log import log
import os.path, time
from IO_file import IO_file
io_file = IO_file()

class Correlation_info(Dataframe):
  def __init__(self, path, path_name):
    super().__init__(path)
    self.path_name = path_name
    self.db_name = path_name.strip('/').rsplit('/', 1)[0]
    self.table_name = path_name.strip('/').rsplit('/', 1)[1]

  def correlation_num_num(self, source_data):
    data = []
    for var_name_origin_x in source_data:
      var_meta_x = source_data[var_name_origin_x]
      if var_meta_x.dtype not in ['int64', 'float64'] or var_meta_x.isnull().all():
        continue
      var_correlations = []
      for var_name_origin_y in source_data:
        if var_name_origin_x == var_name_origin_y:
          continue
        var_meta_y = source_data[var_name_origin_y]
        if var_meta_y.dtype not in ['int64', 'float64'] or var_meta_y.isnull().all():
          continue

        dataframe = pandas.concat([var_meta_x, var_meta_y], axis=1)
        dataframe_clean = dataframe.dropna()
        if dataframe_clean[var_name_origin_x].count() < 2:
          continue

        corr = stats.pearsonr(dataframe_clean[var_name_origin_x], dataframe_clean[var_name_origin_y])
        var_correlations.append({
          'var_name_x': var_name_origin_x,
          'var_name_y': var_name_origin_y,
          'corr': corr[0],
          'p_value': corr[1]
        })

      var_correlations = sorted(var_correlations, key=itemgetter('corr'), reverse=True)
      if len(var_correlations) > 5:
        var_correlations = var_correlations[0:5]
      for correlation in var_correlations:
        data.append(correlation)

    data = io_file.dict_to_dataframe(data)
  
    io_file.save(self.path, data)
    io_file.adjust_excel_column_width(self.path)
