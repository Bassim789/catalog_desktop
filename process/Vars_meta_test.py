import pandas
import json
from Vars_meta import Vars_meta

def test_clean_num():

  def get_clean_num(num):
    return Vars_meta.clean_num(pandas.DataFrame([num])[0][0])

  assert get_clean_num('ok') == 'ok'
  assert get_clean_num('') == ''
  assert get_clean_num(-3) == -3
  assert get_clean_num(0) == 0
  assert get_clean_num(9) == 9
  assert get_clean_num(123456) == 123456
  assert get_clean_num(12.4) == 12
  assert get_clean_num(1652.42345) == 1652
  assert get_clean_num(2.42345) == 2.423
  assert get_clean_num(0.42) == 0.42

def test_percent():
  assert Vars_meta.percent(140, 200) == 70
  assert Vars_meta.percent(20, 50) == 40
  assert Vars_meta.percent(36, 100) == 36
  assert Vars_meta.percent(0, 30) == 0
  assert Vars_meta.percent(10, 0) == False