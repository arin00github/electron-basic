



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

const payBtn = document.getElementById('pay-btn')


payBtn.addEventListener('click', async() => {
  const inputValue = document.getElementById('pay-input').value;
  console.log('1. 결제금 입력')
   await window.nexonapi.pay('payMoney', inputValue);
})


window.nexonapi.save('savePoint', (evt, payload) => {
  console.log('3. 포인트 받기', payload)
  document.getElementById('pay-bill').textContent = payload;
})

