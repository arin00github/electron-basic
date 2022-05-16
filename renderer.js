



// window.onload = () => {
//   const btnEl = document.getElementById('btn')

//   btnEl.addEventListener('click', (evt) => {
//     const inputValue = document.getElementById('text-input').value

//     // onInputValue 이벤트 송신
//     ipcRenderer.send('onInputValue', inputValue)
//   })

//   // replyInputValue에 대한 응답 수신
//   ipcRenderer.on('replyInputValue', (evt, payload) => {
//     document.getElementById('text-box').textContent = payload
//   })

//   // onWebcontentsValue에 대한 이벤트 수신
//   ipcRenderer.on('onWebcontentsValue', (evt, payload) => {
//     document.getElementById('text-box').textContent = payload
//   })
// }


document.getElementById('btn').addEventListener('click', async() => {
  const inputValue = document.getElementById('text-input').value;
  console.log('1. click & sent to main.js')
   await window.api.send('toMain', inputValue);
})


window.api.receive('fromMain', (evt, payload) => {
  console.log('3. receive data from ipcMain', payload)
  document.getElementById('text-box').textContent = payload
})

document.getElementById('toggle-dark-mode').addEventListener('click', async() => {
  const isDarkMode = await window.darkMode.toggle();
  document.getElementById('theme-source').innerHTML = isDarkMode ? "Dark" :'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async() => {
  await window.darkMode.system();
  document.getElementById('theme-source').innerHTML = 'System'
})