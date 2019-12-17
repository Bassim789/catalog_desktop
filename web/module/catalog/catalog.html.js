template.catalog = `
{{#databases}}
<div class="database_box">
  <div class="database_name">{{db_name}}</div>
  <div class="database_info">
    {{nb_table_clean}} tables | {{nb_variable_clean}} variables | {{nb_data_clean}} données
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
        {{nb_variable_clean}} variables | {{nb_row_clean}} lignes | {{nb_data_clean}} données
      </div>
      <div class="table_file_last_modif">
        édité le {{table_last_modif_readable}}
        <br>
        <a href="{{table_file_path}}" class="table_file_link">télécharger</a>
      </div>
      <br><br>
      <div class="break">
        {{table_file_path}}
      </div>
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
                {{#type_number}}Nombre{{/type_number}} {{#type_text}}Texte{{/type_text}}
                <!-- ({{dtype}}) -->
              </td>
            </tr>
          </tbody>

          <tbody class="variable_rows_section">
            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">lignes</span>
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
                <span class="modality_value">manquants</span>
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
                <span class="modality_value">distincts</span>
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
                <span class="modality_value">doublons</span>
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
                <div class="modalities_box_name">valeurs fréquentes</div>
              </td>
            </tr>
              <!-- {{#modalities}} -->

                <!-- {{#visible}} -->
                <tr class="table_modalities">
                <!-- {{/visible}} -->
                <!-- {{^visible}} -->
                <tr class="table_modalities modality_hidden">
                <!-- {{/visible}} -->

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
                <!-- {{#more_modalities}} -->
                <tr>
                  <td colspan="2" style="border: 0;">
                    <button class="btn_show_more">
                      Suite...
                    </button>
                  </td>
                </tr>
                <!-- {{/more_modalities}} -->
              <!-- {{/modalities}} -->
              
              <tr>
                <td colspan="2">
                  <button class="show_less_modality">
                    Réduire...
                  </button>
                </td>
              </tr>
          </tbody>

          <!-- {{#type_number}} {{#is_data}} -->

          <tbody class="variable_number_mean_section">
            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">moyenne</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value" style="visibility: hidden;">100%</spon>
                    <span class="frequency">{{mean_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">100%</spon>
                    <span class="frequency">{{mean_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: 0%;"></div>
                </div>
              </td>
            </tr>
            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">écart-type</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{coeff_variation_clean}}%</spon>
                    <span class="frequency">{{standard_deviation_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{coeff_variation_clean}}%</spon>
                    <span class="frequency">{{standard_deviation_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: min(100%, {{coeff_variation}}%);"></div>
                </div>
              </td>
            </tr>
          </tbody>

          <tbody class="variable_number_info_section">
            <tr>
              <td colspan="2">
                <div class="modalities_box_name">quantiles</div>
              </td>
            </tr>

            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">min</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{min_percent}}%</spon>
                    <span class="frequency">{{min_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{min_percent}}%</spon>
                    <span class="frequency">{{min_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: {{min_percent}}%;"></div>
                </div>
              </td>
            </tr>
            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">quantile 25</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{quantile_25_percent}}%</spon>
                    <span class="frequency">{{quantile_25_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{quantile_25_percent}}%</spon>
                    <span class="frequency">{{quantile_25_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: {{quantile_25_percent}}%;"></div>
                </div>
              </td>
            </tr>
            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">médiane</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{median_percent}}%</spon>
                    <span class="frequency">{{median_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{median_percent}}%</spon>
                    <span class="frequency">{{median_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: {{median_percent}}%;"></div>
                </div>
              </td>
            </tr>
            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">quantile 75</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{quantile_75_percent}}%</spon>
                    <span class="frequency">{{quantile_75_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{quantile_75_percent}}%</spon>
                    <span class="frequency">{{quantile_75_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: {{quantile_75_percent}}%;"></div>
                </div>
              </td>
            </tr>
            <tr class="table_modalities">
              <td class="modality_value_wrap">
                <span class="modality_value">max</span>
              </td>
              <td>
                <div class="modality_frequence_box">
                  <div class="modality_frequence">
                    <spon class="percent_value">{{max_percent}}%</spon>
                    <span class="frequency">{{max_clean}}</span> 
                  </div>
                  <div class="modality_frequence_hidden">
                    <spon class="percent_value">{{max_percent}}%</spon>
                    <span class="frequency">{{max_clean}}</span> 
                  </div>
                  <div class="percent_bar" style="width: {{max_percent}}%;"></div>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- {{/is_data}} {{/type_number}} -->

        </table>
      </div>
      <!-- {{/variables}} -->
    </div>

  </div>
  {{/tables}}
</div>
{{/databases}}
`;