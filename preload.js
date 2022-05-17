const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nexonapi',{
  open: () => {
    ipcRenderer.send('openPaywindow')
  },
  pay: (channel, data) => {
    let validChannels = ['payMoney'];
    if(validChannels.includes(channel)){
     
      ipcRenderer.send(channel, data)
    }
  },
  save: (channel, func) => {
    let validChannels = ['savePoint']
    if(validChannels.includes(channel)){
      ipcRenderer.on(channel, (evt, data) => func(evt, data))
    }
  }
})


// contextBridge.exposeInMainWorld('darkMode', {
  
//   toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
//   system: ()=> ipcRenderer.invoke('dark-mode:system'),
  
// })


