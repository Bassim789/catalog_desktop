import pandas
import json
from Variables import Variables

def test_clean_num():

  def get_clean_num(num):
    return Variables.clean_num(pandas.DataFrame([num])[0][0])

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
  assert Variables.percent(140, 200) == 70
  assert Variables.percent(20, 50) == 40
  assert Variables.percent(36, 100) == 36
  assert Variables.percent(0, 30) == 0
  assert Variables.percent(10, 0) == False