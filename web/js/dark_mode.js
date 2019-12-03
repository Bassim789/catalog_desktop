
const dark_mode = window.localStorage.getItem('dark_mode')

if(dark_mode === 'on'){
  $('body').addClass('dark_mode')
}

$('body').on('click', '.btn_dark_mode', () => {
  console.log('test')
  $('body').addClass('dark_mode')
})
