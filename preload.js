const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nexonapi',{
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

