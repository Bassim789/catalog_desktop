class Catalog{
  constructor(){
    this.type_number = ['int64', 'float64']
  }
  append_to_body(){
    $('body').append('<div id="catalog"></div>')
    this.actions()
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
          table.nb_row = table_data.nb_row
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
        //log(table)
        for (const variable of table.variables){
          let type_number = this.type_number.includes(variable.dtype)
          variable.type_number = type_number
          variable.type_text = !type_number
          variable.clean_name = variable.var_name
          variable.nb_missing = table.nb_row - variable.nb_row
          variable.nb_row = table.nb_row
          variable.nb_missing_clean = variable.nb_missing
          variable.percent_duplicate = Math.round(variable.nb_duplicate / variable.nb_row * 1000) / 10
          variable.percent_distinct = Math.round(variable.nb_distinct / variable.nb_row * 1000) / 10
          variable.percent_missing = Math.round(variable.nb_missing / variable.nb_row * 1000) / 10
          if(variable.mean > 1){
            variable.mean = Math.round(variable.mean)
          }
          if(variable.median > 1){
            variable.median = Math.round(variable.median)
          }
        }
      }
    }
  }
  set_tables(){
    for (const database of this.databases){
      for (const table of database.tables){
        let nb_data = 0
        for (const variable of table.variables){
          nb_data += variable.nb_row
        }
        table.nb_data = nb_data
        table.nb_variable = table.variables.length
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

      if(db_selected !== ''){
        for (const table of database.tables){
          if(table_selected !== '' && table_selected !== table.table_name) continue

          const table_copy = {...table}
          table_copy.variables = []

          if(table_selected !== ''){
            for (const variable of table.variables){
              if(variable_selected !== '' && variable_selected !== variable.var_name) continue

              table_copy.variables.push(variable)
            }
          }
          db_copy.tables.push(table_copy)  
        }
      }
      databases.push(db_copy)
    }
    template.render('#catalog', 'catalog', {databases})
    $('.database_description, .table_description').readmore({
      collapsedHeight: 50,
      speed: 200,
      moreLink: '<a href="#" class="readmore_btn">Read more...</a>',
      lessLink: '<a href="#" class="readless_btn">Read less.</a>'
    })
  }
  actions(){
    $('body').on('click', '.database_box .database_name', function() {
      const database_name = $(this).html().trim()
      if(selector.boxes.db.selection === ''){
        selector.boxes.db.selection = database_name
      } else {
        selector.boxes.db.selection = ''
      }
      selector.boxes.table.selection = ''
      selector.boxes.variable.selection = ''
      selector.set_params()
      selector.update_boxes()
    })
    $('body').on('click', '.table_box .table_name', function() {
      const table_name = $(this).html().trim()
      if(selector.boxes.table.selection === ''){
        selector.boxes.table.selection = table_name
      } else {
        selector.boxes.table.selection = ''
      }
      selector.boxes.variable.selection = ''
      selector.set_params()
      selector.update_boxes()
    })
    $('body').on('click', '.variable_box .variable_name', function() {
      const variable_name = $(this).html().trim()
      if(selector.boxes.variable.selection === ''){
        selector.boxes.variable.selection = variable_name
      } else {
        selector.boxes.variable.selection = ''
      }
      selector.set_params()
      selector.update_boxes()
    })
  }
}