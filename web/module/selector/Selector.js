class Selector{
  constructor(){
    this.boxes = {
      db: {
        selector: '#select_db_box .chosen-select',
        selection: '', 
        nb: 0
      },
      table: {
        selector: '#select_table_box .chosen-select',
        selection: '',
        nb: 0
      },
      variable: {
        selector: '#select_variable_box .chosen-select',
        selection: '',
        nb: 0
      }
    }
  }
  append_to_body(){
    if(is_mobile_device()) return false
    template.append('.main_container', 'selector')
    template.render('#select_search_bar', 'search_bar', {})
  }
  set_catalog_data(databases){
    this.databases = databases
  }
  init_selection_from_params(){
    const params = url_params.get_params()
    for(const [key, item] of Object.entries(this.boxes)){
      if(key in params){
        const name = decodeURI(params[key])
        this.boxes[key].selection = name
        const select_id = '#select_' + key + '_box .chosen-select'
        $(select_id).val(name).trigger('chosen:updated')
      } else {
        this.boxes[key].selection = ''
      }
    }
    if('v' in params){
      const variable_path = decodeURI(params['v'])
      //console.log('variable_path:', variable_path)
    }
  }
  set_params(){
    let params = {}
    for(const [key, item] of Object.entries(this.boxes)){
      params[key] = item.selection
    }
    url_params.set_params(params)
  }
  update_boxes(){
    const db_selected = this.boxes.db.selection
    const table_selected = this.boxes.table.selection

    let nb_table = 0
    let nb_variable = 0

    const table_databases = []
    const variable_databases = []
    
    for (const database of this.databases){
      if(db_selected !== '' && db_selected !== database.db_name) continue

      const new_variable_databases = {...database}
      new_variable_databases.tables = []

      nb_table += database.nb_table
      table_databases.push({...database})

      for (const table of database.tables){
        if(table_selected !== '' && table_selected !== table.table_name) continue

        nb_variable += table.nb_variable
        new_variable_databases.tables.push(table)  
      }
      variable_databases.push(new_variable_databases)
    }

    this.boxes.db.nb = this.databases.length
    this.boxes.table.nb = nb_table
    this.boxes.variable.nb = nb_variable

    this.format_numbers()
    this.render_box('db', this.databases)
    this.render_box('table', table_databases)
    this.render_box('variable', variable_databases)

    this.init_chosen()
    this.set_boxes_selected()

    catalog.render()
  }
  set_boxes_selected(){
    const db_location = this.boxes.db.selection
    const table_location = this.boxes.db.selection + ';' + this.boxes.table.selection
    const variable_location = this.boxes.db.selection + ';' + this.boxes.table.selection + ';' + this.boxes.variable.selection

    $(this.boxes.db.selector).val(db_location).trigger('chosen:updated')
    $(this.boxes.table.selector).val(table_location).trigger('chosen:updated')
    $(this.boxes.variable.selector).val(variable_location).trigger('chosen:updated')
  }
  format_numbers(){
    this.boxes.db.nb_clean = this.boxes.db.nb.toLocaleString()
    this.boxes.table.nb_clean = this.boxes.table.nb.toLocaleString()
    this.boxes.variable.nb_clean = this.boxes.variable.nb.toLocaleString()
  }
  render_box(item, db){
    const box_id = '#select_' + item + '_box'
    const nb_item_clean = this.boxes[item].nb_clean
    template.render(box_id, 'select_' + item, {db, nb_item_clean})
    $(box_id + ' .chosen-select').trigger('chosen:updated')
  }
  init_chosen(selector = '.chosen-select'){
    $(selector).chosen({
      allow_single_deselect: true, 
      group_search: false
    })
  }
  init_actions(){
    $('body').on('change', this.boxes.db.selector, () => {
      this.boxes.db.selection = $(this.boxes.db.selector).val()
      this.boxes.table.selection = ''
      this.boxes.variable.selection = ''
      this.set_params()
      this.update_boxes()
    })

    $('body').on('change', this.boxes.table.selector, () => {
      const table_location = $(this.boxes.table.selector).val()
      if(table_location === ''){
        this.boxes.table.selection = ''
        this.boxes.variable.selection = ''
      } else {
        const [db_name, table_name] = table_location.split(';')
        this.boxes.db.selection = db_name
        this.boxes.table.selection = table_name
        this.boxes.variable.selection = ''
      }
      this.set_params()
      this.update_boxes()
    })

    $('body').on('change', this.boxes.variable.selector, () => {
      const variable_location = $(this.boxes.variable.selector).val()
      if(variable_location === ''){
        this.boxes.variable.selection = ''
      } else {
        const [db_name, table_name, variable_name] = variable_location.split(';')
        this.boxes.db.selection = db_name
        this.boxes.table.selection = table_name
        this.boxes.variable.selection = variable_name
      }
      this.set_params()
      this.update_boxes()
    })
    window.onpopstate = () => {
      this.init_selection_from_params()
      this.update_boxes()
    }
  }
}