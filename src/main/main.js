const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { spawn, execFile } = require('child_process');
const util = require('util');
const execFileAsync = util.promisify(execFile);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 750,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.resolve(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
        icon: path.resolve(__dirname, '../../assets/icon.png'),
        titleBarStyle: 'hidden',
        titleBarOverlay: false,
        backgroundColor: '#121212',
        resizable: true
    });

    mainWindow.loadFile(path.resolve(__dirname, '../renderer/index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('window-minimize', () => mainWindow.minimize());
ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
    } else {
        mainWindow.maximize();
    }
});
ipcMain.on('window-close', () => mainWindow.close());

ipcMain.on('open-external', (event, url) => {
    shell.openExternal(url);
});

const scrcpyProcesses = [];

function sendStatus() {
    if (mainWindow) {
        mainWindow.webContents.send('session-status', scrcpyProcesses.length > 0);
    }
}

function getScrcpyPath() {
    const isPackaged = app.isPackaged;
    const baseDir = isPackaged ? process.resourcesPath : path.join(__dirname, '..', '..');
    return path.join(baseDir, 'scrcpy', 'scrcpy.exe');
}

function getAdbPath() {
    const isPackaged = app.isPackaged;
    const baseDir = isPackaged ? process.resourcesPath : path.join(__dirname, '..', '..');
    return path.join(baseDir, 'scrcpy', 'adb.exe');
}

ipcMain.handle('get-devices', async () => {
    try {
        const adbPath = getAdbPath();
        const { stdout } = await execFileAsync(adbPath, ['devices']);
        const lines = stdout.split('\n');
        const devices = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line && !line.startsWith('*')) {
                const parts = line.split('\t');
                if (parts.length === 2) {
                    devices.push({ id: parts[0], state: parts[1] });
                }
            }
        }
        return devices;
    } catch (error) {
        console.error('Failed to enumerate ADB devices:', error);
        return [];
    }
});

ipcMain.handle('run-adb', async (event, args) => {
    try {
        const adbPath = getAdbPath();
        const { stdout, stderr } = await execFileAsync(adbPath, args);
        return { success: true, stdout, stderr };
    } catch (error) {
        console.error('ADB Command failed:', error);
        return { success: false, error: error.message, stderr: error.stderr };
    }
});

ipcMain.on('run-scrcpy', (event, args) => {
    if (scrcpyProcesses.length > 0) {
        scrcpyProcesses.forEach(proc => {
            try { spawn('taskkill', ['/pid', proc.pid, '/f', '/t']); } catch (e) {}
        });
        scrcpyProcesses.length = 0;
        event.reply('terminal-log', '> Cleaning up previous connections...\n');
    }

    const exePath = getScrcpyPath();
    event.reply('terminal-log', `> ${exePath} ${args.join(' ')}\n`);
    const proc = spawn(exePath, args);
    scrcpyProcesses.push(proc);
    sendStatus();

    proc.stdout.on('data', (data) => event.reply('terminal-log', data.toString()));
    proc.stderr.on('data', (data) => event.reply('terminal-log', `ERROR: ${data.toString()}`));
    proc.on('close', (code) => {
        event.reply('terminal-log', `scrcpy exited with code ${code}\n`);
        const index = scrcpyProcesses.indexOf(proc);
        if (index !== -1) scrcpyProcesses.splice(index, 1);
        sendStatus();
    });
});

ipcMain.on('stop-scrcpy', (event) => {
    if (scrcpyProcesses.length > 0) {
        scrcpyProcesses.forEach(proc => spawn('taskkill', ['/pid', proc.pid, '/f', '/t']));
        event.reply('terminal-log', '> Stopping all scrcpy instances...\n');
        scrcpyProcesses.length = 0;
    }
});
