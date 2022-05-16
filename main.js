const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const { BrowserView } = require('electron/main');
const fs = require('fs')
// include the Node.js 'path' module at the top of your file
const path = require('path')//
require('electron-reload')(__dirname);


app.disableHardwareAcceleration();

let win = null
// modify your existing createWindow() function
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
  // win2 = new BrowserWindow({
  //   width: 900,
  //   height: 700,
  //   webPreferences: {
  //     preload: path.join(__dirname, 'preload.js'),
  //     nodeIntegration: true,
  //     contextIsolation : true
  //   },
  //   title: '어플리케이션02'
  // })


  // const view = new BrowserView()
  // win.setBrowserView(view)
  // view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  // view.webContents.loadURL('https://electronjs.org')

  win.loadFile('index.html');
 // win2.loadFile('index2.html');

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

ipcMain.handle('dark-mode:toggle', () => {
  if(nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  }else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

ipcMain.on('toMain', (evt, payload) => {

  console.log('2. take payload in main.js', payload)
  // fs.readFile('path/to/file', (error, data) => {
  //   win.webContents.send("fromMain", payload);
  // })
  win.webContents.send("fromMain", payload);

})



   
app.on('window-all-closed', function () {
    win = null
  if (process.platform !== 'darwin') app.quit()
})