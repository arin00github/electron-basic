const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron');
const { BrowserView } = require('electron/main');
const fs = require('fs')
// include the Node.js 'path' module at the top of your file
const path = require('path')//
require('electron-reload')(__dirname);

let win = null




function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation : false
    },
    center: true,
    title: '어플리케이션01'
  })

  win.loadFile('index.html');
  win.webContents.openDevTools();


   // 웹 페이지 로드 완료
   win.webContents.on('did-finish-load', (evt) => {
    // onWebcontentsValue 이벤트 송신
    win.webContents.send('onWebcontentsValue', 'on load...')
  })
}


//app앱 서비스가 준비되면 그다음 createWindow() 실행해라
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})




ipcMain.on('onInputValue', (evt, payload) => {

  const computedPayload = payload + '(computed)'

  evt.reply('replyInputValue',computedPayload)

})



   
app.on('window-all-closed', function () {
    win = null
  if (process.platform !== 'darwin') app.quit()
})