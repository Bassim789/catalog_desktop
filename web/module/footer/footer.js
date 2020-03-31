class Footer{
  constructor(){}
  add_data(data){
    console.log(data)
    this.scan_time_ago = get_time_ago(data.scan_timestamp)
    this.scan_duration = data.scan_duration
  }
  render(){
    template.render('#footer', 'footer', {
      scan_time_ago: this.scan_time_ago
    })
  }
}