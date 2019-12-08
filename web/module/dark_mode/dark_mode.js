
if(window.localStorage.getItem('dark_mode') === 'on'){
  $('html').addClass('dark')
}

$(() =>{
  if(window.localStorage.getItem('dark_mode') === 'on'){
    $('.btn_dark_mode input').prop('checked', true)
  }
})

$('html').on('click', '.btn_dark_mode .slider', () => {
  if(window.localStorage.getItem('dark_mode') === 'on'){
    $('html').removeClass('dark')
    window.localStorage.setItem('dark_mode', 'off')
  } else {
    $('html').addClass('dark')
    window.localStorage.setItem('dark_mode', 'on')
  }
})
