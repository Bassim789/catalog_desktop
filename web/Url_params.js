class Url_params {
  constructor(){}
  get_params(){
    let vars = {}
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        vars[key] = value
    })
    return vars
  }
  set_param(param, param_value){
    let params = this.get_params()
    params[param] = param_value
    let query = [], key, value
    for(key in params) {
      if(!params.hasOwnProperty(key)) continue
      value = params[key]
      query.push(key + "=" + value)
    }
    window.history.replaceState('catalog', 'catalog', '?' + query.join("&"));
  }
}