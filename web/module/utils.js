
const template = {
  render(container, template_name, data={}){
    $(container).html(Mustache.render(this[template_name], data))
  },
  append(container, template_name, data={}){
    $(container).append(Mustache.render(this[template_name], data))
  }
}

function log(value){
  console.log(JSON.parse(JSON.stringify(value)))
}
