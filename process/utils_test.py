from utils import Nunber
from IO_file import IO_file
io_file = IO_file()

def test_clean_num():

  def clean(num):
    return Nunber.clean_num(io_file.dict_to_dataframe([num])[0][0])

  assert clean('ok') == 'ok'
  assert clean('') == ''
  assert clean(-3) == -3
  assert clean(0) == 0
  assert clean(9) == 9
  assert clean(123456) == 123456
  assert clean(12.4) == 12
  assert clean(1652.42345) == 1652
  assert clean(2.42345) == 2.423
  assert clean(0.42) == 0.42

def test_percent():
  assert Nunber.percent(140, 200) == 70
  assert Nunber.percent(20, 50) == 40
  assert Nunber.percent(36, 100) == 36
  assert Nunber.percent(0, 30) == 0
  assert Nunber.percent(10, 0) == False