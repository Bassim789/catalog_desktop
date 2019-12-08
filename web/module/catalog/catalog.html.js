const template_catalog = `
{{#databases}}
<div class="database_box">
  <div class="database_name">
    {{db_name}}
  </div>
  <div style="margin: 5px; display: inline-block; float: left; margin-top: 10px;">
    {{nb_table_clean}} tables | {{nb_variable_clean}} variables | {{nb_data_clean}} données
  </div>
  <br><br>
  <div style="margin: 5px; white-space: pre;">{{description}}</div>
</div>
<div style="margin-top: 20px;">
  {{#tables}}
  <div class="table_box">
    <div style="width: 100%; display: inline-block; padding-left: 10px;">
      <div style="font-size: 16px; font-weight: bold; margin: 5px; display: inline-block; float: left;">
        {{table_name}}
      </div>
      <div style="margin: 5px; display: inline-block; float: left; margin-top: 7px;">
        {{nb_variable_clean}} variables | {{nb_row_clean}} lignes | {{nb_data_clean}} données
      </div>
      <br><br>
      <div style="margin: 5px; margin-bottom: 20px; white-space: pre;">{{description}}</div>
    </div>
    <div style="margin-left: 20px;">
      <!-- {{#variables}} -->
      <div class="variable_box">
        <table class="variable_table">
          <tr>
            <th colspan="2">{{var_name}}</th>
          </tr>
          <tr>
            <td colspan="2" style="text-align: left; font-style: italic; padding-bottom: 5px;">
              {{description}}
            </td>
          </tr>
          <tr>
            <td>
              {{#type_number}}Nombre{{/type_number}} 
              {{#type_text}}Texte{{/type_text}}
            </td>
            <td>
               ({{dtype}})
            </td>
          </tr>
          <tr>
            <td>{{nb_row_clean}}</td>
            <td>lignes</td>
          </tr>
          <tr>
            <td>{{nb_distinct_clean}}</td>
            <td>distinct</td>
          </tr>
          <tr>
            <td>{{nb_duplicate_clean}}</td>
            <td>duplicate</td>
          </tr>
          <!-- {{#type_number}} -->
          <tr>
            <td>{{min_clean}}</td>
            <td>min</td>
          </tr>
          <tr>
            <td>{{mean_clean}}</td>
            <td>moyenne</td>
          </tr>
          <tr>
            <td>{{median_clean}}</td>
            <td>medianne</td>
          </tr>
          <tr>
            <td>{{max_clean}}</td>
            <td>max</td>
          </tr>
          <!-- {{/type_number}} -->
          <tr>
            <td colspan="2">
              <div style="text-align: center; margin-top: 10px;">
                frequent values
              </div>
              <table class="table_modalities">
                <!-- {{#modalities}} -->
                <tr>
                  <td style="text-align: left; max-width: 180px;">
                    <span class="modality_value">{{value}}</span>
                  </td>
                  <td>
                    <div style="width: 100%; position: relative;">
                      <div style="z-index: 2; position: absolute; top: 0; left: 3px;">
                        {{nb}} ({{percent}}%)
                      </div>
                      <div style="z-index: -2; visibility: hidden; margin-left: 3px;">
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
        </table>
      </div>
      <!-- {{/variables}} -->
    </div>
  </div>
  {{/tables}}
</div>
{{/databases}}`