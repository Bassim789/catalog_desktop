class Url_params {
  constructor(){}
  get_params(){
    let vars = {}
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        vars[key] = value
    })
    return vars
  }
  set_param(name, value){
    let query = []
    let query_str = location.pathname
    let params = this.get_params()
    params[name] = value
    for(const [key, val] of Object.entries(params)) {
      if(!['', undefined].includes(val)){
        query.push(key + "=" + val)
      }
    }
    if(query.length > 0){
      query_str += '?' + query.join("&")
    }
    window.history.replaceState('', '', query_str)
  }
}