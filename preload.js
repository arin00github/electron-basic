const { contextBridge, ipcRenderer } = require('electron')


// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency])
//   }

  
// })


contextBridge.exposeInMainWorld('darkMode', {
  
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: ()=> ipcRenderer.invoke('dark-mode:system'),
  
})


contextBridge.exposeInMainWorld('api',{
  send: (channel, data) => {
    let validChannels = ['toMain'];
    if(validChannels.includes(channel)){
      console.log('ipcRenderer send api')
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain']
    if(validChannels.includes(channel)){
      ipcRenderer.on(channel, (evt, data) => func(evt, data))
    }
  }
})