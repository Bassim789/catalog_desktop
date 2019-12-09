class Dark_mode{
  constructor(){
    if(window.localStorage.getItem('dark_mode') === 'on'){
      $('html').addClass('dark')
    }
    $(() =>{
      if(window.localStorage.getItem('dark_mode') === 'on'){
        $('.btn_dark_mode input').prop('checked', true)
      }
    })
  }
  append_to_body(){
    template.append('body', 'dark_mode')
  }
  init_actions(){
    $('html').on('click', '.btn_dark_mode .slider', () => {
      if(window.localStorage.getItem('dark_mode') === 'on'){
        $('html').removeClass('dark')
        window.localStorage.setItem('dark_mode', 'off')
      } else {
        $('html').addClass('dark')
        window.localStorage.setItem('dark_mode', 'on')
      }
    })
  }
}