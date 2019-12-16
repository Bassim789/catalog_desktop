template.catalog = `
{{#databases}}
<div class="database_box">
  <div class="database_name">{{db_name}}</div>
  <div class="database_info">
    {{nb_table_clean}} tables | {{nb_variable_clean}} variables | {{nb_data_clean}} data
  </div>
  <br><br>
  <div class="database_description">{{description}}</div>
</div>

<div class="tables_listing">
  {{#tables}}
  <div class="table_wrap">
    <div class="table_box">
      <div class="table_name">{{table_name}}</div>
      <div class="table_info">
        {{nb_variable_clean}} variables | {{nb_row_clean}} rows | {{nb_data_clean}} data
      </div>
      <br><br>
      <div class="table_description">{{description}}</div>
    </div>

    <div class="variables_listing">
      <!-- {{#variables}} -->
      <div class="variable_box">
        <table class="variable_table">

          <tbody class="variable_main_info_section">
            <tr><th colspan="2"><span class="variable_name">{{var_name}}</span></th></tr>
            <tr><td class="variable_description" colspan="2">{{description}}</td></tr>
            <tr>
              <td colspan="2" style="text-align: center;">
                {{#type_number}}Number{{/type_number}} {{#type_text}}Text{{/type_text}}
                ({{dtype}})
              </td>
            </tr>
          </tbody>

          <tbody class="variable_rows_section">
            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">rows</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value" style="visibility: hidden;">100%</spon>
                    <span class="frequency">{{nb_row_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">100%</spon>
                    <span class="frequency">{{nb_row_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: 0%;"></div>
                </div>
              </td>
            </tr>

            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">missing</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{percent_missing}}%</spon>
                    <span class="frequency">{{nb_missing_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{percent_missing}}%</spon>
                    <span class="frequency">{{nb_missing_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: {{percent_missing}}%;"></div>
                </div>
              </td>
            </tr>

            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">distinct</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{percent_distinct}}%</spon>
                    <span class="frequency">{{nb_distinct_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{percent_distinct}}%</spon>
                    <span class="frequency">{{nb_distinct_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: {{percent_distinct}}%;"></div>
                </div>
              </td>
            </tr>

            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">duplicate</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{percent_duplicate}}%</spon>
                    <span class="frequency">{{nb_duplicate_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{percent_duplicate}}%</spon>
                    <span class="frequency">{{nb_duplicate_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: {{percent_duplicate}}%;"></div>
                </div>
              </td>
            </tr>
          </tbody>

          <tbody class="variable_modalities_info_section">
            <tr>
              <td colspan="2">
                <div class="modalities_box_name">frequent values</div>
               </td>
              </tr>
              <!-- {{#modalities}} -->
                <tr class="table_modalities">
                  <td class="modality_value_wrap">
                    <span class="modality_value">{{value}}</span>
                  </td>
                  <td class="modality_frequence_box_td">
                    <div class="modality_frequence_box">
                      <div class="modality_frequence">
                        <spon class="percent_value">{{percent}}%</spon> <span class="frequency">{{nb}}</span> 
                      </div>
                      <div class="modality_frequence_hidden">
                        <spon class="percent_value">{{percent}}%</spon> <span class="frequency">{{nb}}</span> 
                      </div>
                      <div class="percent_bar" style="width: {{percent}}%"></div>
                    </div>
                  </td>
                </tr>
              <!-- {{/modalities}} -->
             
              </td>
            </tr>
          </tbody>

          <!-- {{#type_number}} -->
          <tbody class="variable_number_info_section">
            <tr>
              <td colspan="2" style="text-align: center;">
                <table style="margin: auto; text-align: left;">
                  <tr><td>min</td><td style="text-align: right;">{{min_clean}}</td></tr>
                  <tr><td>mean</td><td style="text-align: right;">{{mean_clean}}</td></tr>
                  <tr><td>median</td><td style="text-align: right;">{{median_clean}}</td></tr>
                  <tr><td>max</td><td style="text-align: right;">{{max_clean}}</td></tr>
                </table>
              </td>
            </tr>
          </tbody>
          <!-- {{/type_number}} -->

        </table>
      </div>
      <!-- {{/variables}} -->
    </div>

  </div>
  {{/tables}}
</div>
{{/databases}}
`;