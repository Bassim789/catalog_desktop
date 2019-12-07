class Catalog{
  constructor(){
    this.type_number = ['int64', 'float64']
  }
  load(all_variables){
    let databases = {}
    for (const variable of Object.values(all_variables)){
      const table_name = variable.table.split('/').pop(-1)
      const database_name = variable.table.split('/' + table_name)[0] 
      if(!(database_name in databases)){
        databases[database_name] = {
          db_name: database_name,
          visible: true,
          tables: {}
        }
      }
      if(!(table_name in databases[database_name].tables)){
        databases[database_name].tables[table_name] = {
          table_name: table_name,
          visible: true,
          variables: []
        }
      }
      variable.visible = true
      databases[database_name].tables[table_name].variables.push(variable)
    }
    databases = Object.values(databases)
    for (const database of databases){
      database.tables = Object.values(database.tables)
    }
    this.databases = databases
  }
  add_tables_data(all_tables){
    for (const database of this.databases){
      for (const table of database.tables){
        for(const table_data of Object.values(all_tables)){
          if( table_data.db_name != database.db_name 
              || table.table_name != table_data.table_name) continue
          table.description = table_data.description
        }
      }
    }
  }
  add_databases_data(all_databases){
    for (const database of this.databases){
      for(const database_data of Object.values(all_databases)){
        if(database_data.db_name != database.db_name) continue
        database.description = database_data.description
      }
    }
  }
  add_modalities_data(modalities){
    for (const database of this.databases){
      for (const table of database.tables){
        for (const variable of table.variables){
          variable.modalities = []
          for (const modality of Object.values(modalities)){
            if( modality.table !== database.db_name + '/' + table.table_name 
                || modality.var_name !== variable.var_name)
              continue
            variable.modalities.push(modality)
          }
        }
      }
    }
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
  format_numbers(){
    for (const database of this.databases){
      for (const table of database.tables){
        for (const variable of table.variables){
          for (const modality of variable.modalities){
            modality.nb = modality.nb.toLocaleString()
          }
          variable.nb_row_clean = variable.nb_row.toLocaleString()
          variable.nb_distinct_clean = variable.nb_distinct.toLocaleString()
          variable.nb_duplicate_clean = variable.nb_duplicate.toLocaleString()
          variable.min_clean = variable.min.toLocaleString()
          variable.mean_clean = variable.mean.toLocaleString()
          variable.median_clean = variable.median.toLocaleString()
          variable.max_clean = variable.max.toLocaleString()
        }
        table.nb_data_clean = table.nb_data.toLocaleString()
        table.nb_variable_clean = table.nb_variable.toLocaleString()
        table.nb_row_clean = table.nb_row.toLocaleString()
      }
      database.nb_data_clean = database.nb_data.toLocaleString()
      database.nb_variable_clean = database.nb_variable.toLocaleString()
      database.nb_table_clean = database.nb_table.toLocaleString()
    }
  }
  render(){
    const databases = []
    const db_selected = selector.boxes.db.selection
    const table_selected = selector.boxes.table.selection
    const variable_selected = selector.boxes.variable.selection

    for (const database of this.databases){
      if(db_selected !== '' && db_selected !== database.db_name) continue

      const db_copy = {...database}
      db_copy.tables = []

      for (const table of database.tables){
        if(table_selected !== '' && table_selected !== table.table_name) continue

        const table_copy = {...table}
        table_copy.variables = []

        for (const variable of table.variables){
          if(variable_selected !== '' && variable_selected !== variable.var_name) continue

          table_copy.variables.push(variable)
        }
        db_copy.tables.push(table_copy)  
      }
      databases.push(db_copy)
    }
    template('#main_listing', '#template_main_listing', {databases})
  }
}