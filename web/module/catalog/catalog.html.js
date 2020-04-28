template.catalog = `

<div class="catalog_description_wrap">
  <div class="catalog_description">{{{catalog_description}}}</div>
</div>

{{#databases}}

  {{^db_selected}}
    <div class="database_box">
      <div class="database_name clickable">{{db_name}}</div>
  {{/db_selected}}
  {{#db_selected}}
    <div class="database_box database_open">
      <div class="database_name">{{db_name}}</div>
      <div class="database_close_btn"><div class="close"></div></div>
  {{/db_selected}}

  <div class="database_info">
    <span title="nombre de table dans le dossier">
      {{nb_table_clean}} <div class="table_icon little_icon"></div>
    </span> | 
    <span title="nombre de variable dans le dossier">
      {{nb_variable_clean}} <div class="variable_icon little_icon"></div>
    </span>
  </div>
  <div class="database_description_wrap">
    <div class="database_description">{{{description}}}</div>
  </div>
  <div class="tables_listing">

    {{#tables}}

      {{^table_selected}}
      <div class="table_wrap">
        <div class="table_box">
          <div class="table_name clickable">{{table_name}}</div>
      {{/table_selected}}
      {{#table_selected}}
      <div class="table_wrap table_open">
        <div class="table_box">
          <div class="table_name">{{table_name}}</div>
          <div class="table_close_btn"><div class="close"></div></div>
      {{/table_selected}}

        <div class="table_info">
          <span title="nombre de variable dans la table">
            {{nb_variable_clean}} <div class="variable_icon little_icon"></div> 
          </span> | 
          <span title="nombre de ligne dans la table">
            {{nb_row_clean}} <div class="row_icon little_icon"></div>
          </span>
        </div>
        <div class="table_file_last_modif">
          <span title="Date de la dernière modification">
            {{table_last_modif_readable}}
          </span>
        </div>
        <!-- <div class="break">{{table_file_path}}</div> -->
        <div class="table_description_wrap">
          <div class="table_description">{{{description}}}</div>
        </div>
      </div>

      <!-- {{#show_table_index}} -->
      <div class="variables_simple_listing_wrap">
        <div class="variables_simple_listing">
          <table>
            <!-- <tr>
              <th>Position</th>
              <th>Variable</th>
              <th>Description</th>
            </tr> -->
            <!-- {{#variables}} -->
            <tr class="variables_simple_listing_row">
              <td>#{{order_num}}</td>
              <td class="variables_simple_listing_var_name">{{var_name}}</td>
              <td>
                <div class="variables_simple_listing_description">
                  {{description}}
                </div>
              </td>
            </tr>
            <!-- {{/variables}} -->
          </table>
        </div>
      </div>
      <!-- {{/show_table_index}} -->

      <div class="variables_listing_wrap">
          
        <div class="variables_listing">
          <!-- {{#variables}} -->
          <div class="variable_box">
            <div class="variable_order_num">#{{order_num}}</div>
            <table class="variable_table">

              <tbody class="variable_main_info_section">
                <tr><th colspan="2">
                  <!-- {{^variable_selected}} -->
                    <span class="variable_name clickable">{{var_name}}</span>
                  <!-- {{/variable_selected}} -->
                  <!-- {{#variable_selected}} -->
                    <span class="variable_name">{{var_name}}</span>
                    <div class="variable_close_btn"><div class="close"></div></div>
                  <!-- {{/variable_selected}} -->
                </th></tr>
                <tr><td class="variable_description" colspan="2">
                  <div class="variable_description_content">{{description}}</div>
                </td></tr>
                <tr>
                  <td colspan="2" style="text-align: center;">
                    {{#type_number}}<span class="variable_type_number">Nombre</span>{{/type_number}}
                    {{#type_text}}<span class="variable_type_text">Texte</span>{{/type_text}}
                    <!-- ({{dtype}}) -->
                  </td>
                </tr>
              </tbody>


              <!-- {{#table_section}} -->
              <tbody class="variable_rows_section">
                <!-- {{#section_name}} -->
                <tr>
                  <td colspan="2">
                    <div class="modalities_box_name">{{section_name}}</div>
                  </td>
                </tr>
                <!-- {{/section_name}} -->

                <!-- {{#rows_info}} -->

                <!-- {{#visible}} -->
                <tr class="table_modalities">
                <!-- {{/visible}} -->
                <!-- {{^visible}} -->
                <tr class="table_modalities modality_hidden">
                <!-- {{/visible}} -->

                  <td class="modality_value_wrap">
                    <span class="modality_value">{{name}}</span>
                  </td>
                  <td>
                    <div class="modality_frequence_box">
                      <div class="modality_frequence">
                        <!-- {{#hide_percent}} --> 
                        <spon class="percent_value" style="visibility: hidden;">{{percent}}%</spon>
                        <!-- {{/hide_percent}} --> 
                        <!-- {{^hide_percent}} --> 
                        <spon class="percent_value">{{percent}}%</spon>
                        <!-- {{/hide_percent}} --> 
                        <span class="frequency">{{nb_clean}}</span> 
                      </div>
                      <div class="modality_frequence_hidden">
                        <spon class="percent_value">{{percent}}%</spon>
                        <span class="frequency">{{nb_clean}}</span> 
                      </div>
                      <div class="percent_bar {{percent_error_bar}}" style="width: {{percent}}%; max-width: 100%;"></div>
                    </div>
                  </td>
                </tr>

                <!-- {{#more_modalities}} -->
                  <tr>
                    <td colspan="2" style="border: 0;">
                      <button class="btn_show_more">
                        Suite...
                      </button>
                    </td>
                  </tr>
                  <!-- {{/more_modalities}} -->

                <!-- {{/rows_info}} -->
                
                <tr>
                  <td colspan="2">
                    <button class="show_less_modality">
                      Réduire...
                    </button>
                  </td>
                </tr>
              </tbody>
              <!-- {{/table_section}} -->

            </table>
          </div>
          <!-- {{/variables}} -->
        </div>
      </div>
    </div>
    {{/tables}}
  </div>
</div>
{{/databases}}
`;