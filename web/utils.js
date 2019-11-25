function template(container, template, data){
  if (data === undefined) data = {}
  $(container).html(Mustache.render($(template).html(), data))
}
function template_append(container, template, data){
  if (data === undefined) data = {}
  $(container).append(Mustache.render($(template).html(), data))
}

function init_chosen(selector = '.chosen-select'){
  $(selector).chosen({
    allow_single_deselect: true, 
    group_search: false
  })
}