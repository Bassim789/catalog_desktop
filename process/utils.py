
class Number():

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