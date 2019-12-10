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
            <tr><th colspan="2">{{var_name}}</th></tr>
            <tr><td class="variable_description" colspan="2">{{description}}</td></tr>
            <tr>
              <td>
                {{#type_number}}Number{{/type_number}} {{#type_text}}Text{{/type_text}}
              </td>
              <td>({{dtype}})</td>
            </tr>
            <tr><td>{{nb_row_clean}}</td><td>rows</td></tr>
            <tr><td>{{nb_missing_clean}}</td><td>missing</td></tr>
            <tr><td>{{nb_distinct_clean}}</td><td>distinct</td></tr>
            <tr><td>{{nb_duplicate_clean}}</td><td>duplicate</td></tr>
          </tbody>

          <!-- {{#type_number}} -->
          <tbody class="variable_number_info_section">
            <tr><td>{{min_clean}}</td><td>min</td></tr>
            <tr><td>{{mean_clean}}</td><td>mean</td></tr>
            <tr><td>{{median_clean}}</td><td>median</td></tr>
            <tr><td>{{max_clean}}</td><td>max</td></tr>
          </tbody>
          <!-- {{/type_number}} -->

          <tbody class="variable_modalities_info_section">
            <tr>
              <td colspan="2">
                <div class="modalities_box_name">frequent values</div>
                <table class="table_modalities">
                  <!-- {{#modalities}} -->
                  <tr>
                    <td class="modality_value_wrap">
                      <span class="modality_value">{{value}}</span>
                    </td>
                    <td>
                      <div class="modality_frequence_box">
                        <div class="modality_frequence">
                          {{nb}} ({{percent}}%)
                        </div>
                        <div class="modality_frequence_hidden">
                          {{nb}} ({{percent}}%)
                        </div>
                        <div class="percent_bar" style="width: {{percent}}%"></div>
                      </div>
                    </td>
                  </tr>
                  <!-- {{/modalities}} -->
                </table>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
      <!-- {{/variables}} -->
    </div>

  </div>
  {{/tables}}
</div>
{{/databases}}
`;