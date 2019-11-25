
function change_db_selected(db_name){
  url_params = new Url_params()
  url_params.set_param('db', db_name)
}

$(() => {

  catalog = new Catalog()
  catalog.load(all_current_variables)
  catalog.set_variables()
  catalog.set_tables()
  catalog.set_databases()
  catalog.set_catalog_info()

  console.log('catalog.databases', catalog.databases)

  const databases = catalog.databases

  template('#variables_list_box', '#template_test', {databases: databases})

  template('#select_db_box', '#select_db_template', {
    db: databases,
    nb_database: catalog.nb_database
  })
  $('.change_db_selected').trigger('chosen:updated')

  template('#select_table_box', '#select_table_template', {
    db: databases,
    nb_table: catalog.nb_table
  })
  $('.change_table_selected').trigger('chosen:updated')

  template('#select_var_box', '#select_var_template', {
    db: databases,
    nb_variable: catalog.nb_variable
  })
  $('.change_var_selected').trigger('chosen:updated')
  init_chosen()
})

$('body').on('change', '.change_db_selected', function(){
    change_db_selected($(this).val())
})
