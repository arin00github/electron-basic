
const btnEl = document.getElementById('btn')


btnEl.addEventListener('click', (evt) => {
  const inputValue = document.getElementById('text-input').value
  // onInputValue 이벤트 송신
  window.api.send('onInputValue', inputValue);
})


window.api.receive('replyInputValue',(evt, data)=> {
  document.getElementById('text-box').textContent = data
})


window.api.receive('onWebcontentsValue',(evt, data)=> {
  document.getElementById('text-box').textContent = data
})