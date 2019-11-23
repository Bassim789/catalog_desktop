
function template(container, template, data){
  if (data === undefined) data = {}
  $(container).html(Mustache.render($(template).html(), data))
}
function template_append(container, template, data){
  if (data === undefined) data = {}
  $(container).append(Mustache.render($(template).html(), data))
}

let variables = Object.values(all_current_variables)
let tables = []
let databases = {}

for (i in variables) {
  if(variables[i].dtype === 'int64' || variables[i].dtype === 'float64'){
    variables[i].type_number = true
    variables[i].type_text = false
  } else {
    variables[i].type_number = false
    variables[i].type_text = true
  }
  variables[i].clean_name = variables[i].var_name

  table_name = variables[i].table.split('/').pop(-1)
  database_name = variables[i].table.split('/' + table_name)[0]

  if(!(database_name in databases))
    databases[database_name] = {tables:{}, db_name: database_name}

  if(!(table_name in databases[database_name].tables))
    databases[database_name].tables[table_name] = {variables: [], table_name: table_name}
  
  databases[database_name].tables[table_name].variables.push(variables[i])
}

databases_list = []
for (i in databases) {
  nb_var_db = 0
  nb_data_db = 0
  for (j in databases[i].tables) {
    nb_data_table = 0
    for (k in databases[i].tables[j].variables) {

      nb_data = databases[i].tables[j].variables[k].nb_row
      nb_data_db += nb_data
      nb_data_table += nb_data
    }
    nb_var = databases[i].tables[j].variables.length
    databases[i].tables[j].nb_variable = nb_var
    databases[i].tables[j].nb_data = nb_data_table
    databases[i].tables[j].table_clean_name = databases[i].tables[j].table_name
    nb_var_db += nb_var
    tables.push(databases[i].tables[j])
  }
  databases[i].nb_var = nb_var_db
  databases[i].nb_data = nb_data_db
  databases[i].tables = Object.values(databases[i].tables)
  databases[i].nb_table = databases[i].tables.length
  databases[i].db_clean_name = databases[i].db_name
}
databases = Object.values(databases)

console.log('variables', variables)

template('#variables_list_box', '#template_test', {databases: databases})

function init_chosen(selector = '.chosen-select'){
  $(selector).chosen({
    allow_single_deselect: true, 
    group_search: false
  })
}

$(() => {
  $('.nb_databases').html(databases.length)
  $('.nb_tables').html(tables.length)
  $('.nb_variables').html(variables.length)

  template('#select_db_box', '#select_db_template', {
    db: databases,
    nb_databases: $('.nb_databases').html()
  })
  $('.change_db_selected').trigger('chosen:updated')

  template('#select_table_box', '#select_table_template', {
    db: databases,
    nb_tables: $('.nb_tables').html()
  })
  $('.change_table_selected').trigger('chosen:updated')

  template('#select_var_box', '#select_var_template', {
    db: databases,
    nb_variables: $('.nb_variables').html()
  })
  $('.change_var_selected').trigger('chosen:updated')
  init_chosen()
})


function change_db_selected(db_name){
  set_table_scroll_data(variables, databases, db_name, '')
  set_table_select(databases, db_name, '')
  set_var_select(databases, db_name, '')
  set_url_params('db', db_name)
}
$('body').on('change', '.change_db_selected', function(){
    //change_db_selected($(this).val())
})