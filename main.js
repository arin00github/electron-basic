const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron');
const { BrowserView } = require('electron/main');
const fs = require('fs')
// include the Node.js 'path' module at the top of your file
const path = require('path')//
require('electron-reload')(__dirname);


app.disableHardwareAcceleration();

let win = null;
let win2 = null;

const template = [
  {
    label: 'File',
    submenu : [
      {role: 'close'},
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role:'undo'},
      {role: 'redo'},
      {type: 'seperator'},
      {role: 'cut'},
      {role:'copy'}
    ]
  },
  {label:'window',
submenu: [
{
  label: 'Lear more',
  click: async() => {
    const {shell} = requre('electron');
    await shell.openExternal('http://electronjs.org')
  }
}
]}
]


function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation : true
    },
   // autoHideMenuBar: true,
   // frame: false,
    center: true,
    title: '어플리케이션01'
  })

  //결제창
  win2 = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation : true
    },
    title: 'nexon포인트 결제',
    show: false
  })
  

  win.loadFile('index.html');
  
}


//app앱 서비스가 준비되면 그다음 createWindow() 실행해라
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})


ipcMain.on('openPaywindow', () => {
  win2.show()
  win2.loadFile('index2.html');
})

ipcMain.on('payMoney', (evt, payload) => {
  console.log('2.nexon take money', payload)
  win.webContents.send("savePoint", payload);
  win2.webContents.send("savePoint", payload);

})
   
app.on('window-all-closed', function () {
    win = null;
    win2 = null;
  if (process.platform !== 'darwin') app.quit()
})



// ipcMain.handle('dark-mode:toggle', () => {
//   if(nativeTheme.shouldUseDarkColors) {
//     nativeTheme.themeSource = 'light'
//   }else {
//     nativeTheme.themeSource = 'dark'
//   }
//   return nativeTheme.shouldUseDarkColors
// })

// ipcMain.handle('dark-mode:system', () => {
//   nativeTheme.themeSource = 'system'
// })