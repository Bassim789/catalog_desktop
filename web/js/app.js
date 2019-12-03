const url_params = new Url_params()
const selector = new Selector()
const catalog = new Catalog()

$(() => {
  catalog.load(all_current_variables)
  catalog.set_variables()
  catalog.set_tables()
  catalog.set_databases()
  catalog.format_numbers()
  
  selector.init_selection_from_params()
  selector.set_catalog_data(catalog.databases)
  selector.update_boxes()
  selector.init_actions()

  console.log('catalog.databases', catalog.databases)
})