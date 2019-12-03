function template(container, template, data){
  if (data === undefined) data = {}
  $(container).html(Mustache.render($(template).html(), data))
}
function template_append(container, template, data){
  if (data === undefined) data = {}
  $(container).append(Mustache.render($(template).html(), data))
}
function log(value){
  console.log(JSON.parse(JSON.stringify(value)))
}
