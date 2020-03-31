const url_params = new Url_params()
const dark_mode = new Dark_mode()
const selector = new Selector()
const catalog = new Catalog()
const footer = new Footer()

dark_mode.append_to_body()
selector.append_to_body()
catalog.append_to_body()

catalog.load(data.all_current_variables)
catalog.add_tables_data(data.all_tables)
catalog.add_databases_data(data.all_databases)
catalog.set_variables()
catalog.set_tables()
catalog.set_databases()
catalog.add_modalities_data(data.all_current_modalities)
catalog.format_numbers()
catalog.prepare_view()

selector.init_selection_from_params()
selector.set_catalog_data(catalog.databases)
selector.update_boxes()
selector.init_actions()

dark_mode.init_actions()

footer.add_data(data.main_info[0])
footer.render()

console.log('catalog.databases', catalog.databases)

$('.loading').hide()