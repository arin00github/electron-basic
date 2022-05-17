

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

