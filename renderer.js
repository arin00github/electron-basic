

window.nexonapi.save('savePoint', (evt, payload) => {
  console.log('3. 포인트 받기', payload)
  document.getElementById('pay-result').textContent = payload;
})


document.getElementById('toggle-dark-mode').addEventListener('click', async() => {
  const isDarkMode = await window.darkMode.toggle();
  document.getElementById('theme-source').innerHTML = isDarkMode ? "Dark" :'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async() => {
  await window.darkMode.system();
  document.getElementById('theme-source').innerHTML = 'System'
})