template.selector = `
<div id="selection_boxes_wrapper">
  <div id="selection_boxes">
    <div id="select_db_box"></div>
    <div id="select_table_box"></div>
    <div id="select_variable_box"></div>
  </div>
</div>
`;

template.select_db = `
<select data-placeholder="{{nb_item_clean}} databases" class="chosen-select">
  <option></option>
  {{#db}}
    <option value="{{db_clean_name}}">{{db_clean_name}}</option> 
  {{/db}}
</select>
`;

template.select_table = `
<select data-placeholder="{{nb_item_clean}} tables" class="chosen-select">
  <option></option>
  {{#db}}
    <optgroup label="{{db_clean_name}}">
    {{#tables}}
      <option value="{{db_clean_name}};{{clean_name}}">{{clean_name}}</option>
    {{/tables}}
    </optgroup>
  {{/db}}
</select>
`;

template.select_variable = `
<select data-placeholder="{{nb_item_clean}} variables" class="chosen-select">
  <option></option>
  {{#db}}
  {{#tables}}
    <optgroup label="{{db_clean_name}}: {{table_name}}" class="select_group">
    {{#variables}}
      <option value="{{db_clean_name}};{{table_name}};{{clean_name}}">{{clean_name}}</option>
    {{/variables}}
    </optgroup>
  {{/tables}}
  {{/db}}
</select>
`;