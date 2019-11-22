import webbrowser
import os
from load_data import load_data

catalog_path = os.path.realpath(__file__).rsplit('/', 2)[0] + '/'

load_data(catalog_path + 'data/topic/money/')
#webbrowser.open('file://' + catalog_path + 'web/index.html')
