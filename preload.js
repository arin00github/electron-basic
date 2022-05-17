const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('api',{
  send: (channel, data) => {
    let validChannels = ['onInputValue'];
    if(validChannels.includes(channel)){
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    let validChannels = ['replyInputValue', 'onWebcontentsValue']
    if(validChannels.includes(channel)){
      ipcRenderer.on(channel, (evt, data) => func(evt, data))
    }
  }
})

