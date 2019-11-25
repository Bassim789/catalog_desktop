class Catalog{
  constructor(){
    this.type_number = ['int64', 'float64']
    this.nb_database = 0
    this.nb_table = 0
    this.nb_variable = 0
  }
  load(all_variables){
    let databases = {}
    for (const variable of Object.values(all_variables)){
      const table_name = variable.table.split('/').pop(-1)
      const database_name = variable.table.split('/' + table_name)[0] 
      if(!(database_name in databases)){
        databases[database_name] = {db_name: database_name, tables: {}}
      }
      if(!(table_name in databases[database_name].tables)){
        databases[database_name].tables[table_name] = {table_name: table_name, variables: []}
      }
      databases[database_name].tables[table_name].variables.push(variable)
    }
    databases = Object.values(databases)
    for (const database of databases){
      database.tables = Object.values(database.tables)
    }
    this.databases = databases
  }
  set_variables(){
    for (const database of this.databases){
      for (const table of database.tables){
        for (const variable of table.variables){
          let type_number = this.type_number.includes(variable.dtype)
          variable.type_number = type_number
          variable.type_text = !type_number
          variable.clean_name = variable.var_name
        }
      }
    }
  }
  set_tables(){
    for (const database of this.databases){
      for (const table of database.tables){
        let nb_data = 0
        let max_row = 0
        for (const variable of table.variables){
          nb_data += variable.nb_row
          if(variable.nb_row > max_row) 
            max_row = variable.nb_row
        }
        table.nb_data = nb_data
        table.nb_variable = table.variables.length
        table.nb_row = max_row
        table.clean_name = table.table_name
      }
    }
  }
  set_databases(){
    for (const database of this.databases){
      let nb_data = 0
      let nb_variable = 0
      for (const table of database.tables){
        nb_data += table.nb_data
        nb_variable += table.nb_variable
      }
      database.nb_data = nb_data
      database.nb_variable = nb_variable
      database.nb_table = database.tables.length
      database.db_clean_name = database.db_name
    }
  }
  set_catalog_info(){
    let nb_table = 0
    let nb_variable = 0
    for (const database of this.databases){
      nb_table += database.nb_table
      nb_variable += database.nb_variable
    }
    this.nb_database = this.databases.length
    this.nb_table = nb_table
    this.nb_variable = nb_variable
  }
}