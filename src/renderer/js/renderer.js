window.App = {
    scrcpyRunning: false,
    activeSessionConfig: null,
    activeToggles: new Set(),
    curLang: localStorage.getItem('scrcpy-lang') || 'en'
};

if (window.App.curLang === 'pt-BR') window.App.curLang = 'pt';

const translations = {
    en: {
        quickActions: "Quick Actions",
        startDefault: "Start default",
        stopScrcpy: "Stop scrcpy",
        options: "Options",
        screenOff: "Turn Screen Off (-S)",
        alwaysOnTop: "Always On Top",
        noAudio: "No Audio",
        stayAwake: "Stay Awake",
        showTouches: "Show Touches",
        readOnly: "Read Only",
        powerOff: "Power Off on Close",
        performance: "Performance & Video",
        lowRes: "Limit Res (1024)",
        maxFps: "Max 60 FPS",
        advanced: "Advanced",
        otgMode: "OTG Mode",
        titleScreenOff: "Turn screen off while mirroring",
        titleAlwaysOnTop: "Make scrcpy window always on top",
        titleNoAudio: "Disable audio forwarding",
        titleStayAwake: "Prevent device from sleeping",
        titleShowTouches: "Show visual feedback for touches",
        titleReadOnly: "Disable device control (view only)",
        titlePowerOff: "Power off device screen on close",
        titleRecord: "Record screen to file",
        titleLowRes: "Limit resolution to 1024px",
        titleMaxFps: "Limit FPS to 60",
        titleOtg: "OTG mode (Simulate physical mouse/keyboard without mirroring)",
        customCommand: "Custom Command",
        placeholderCustom: "e.g. -m 1024 -b 2M",
        run: "Run",
        resolutionLimit: "Resolution:",
        bitrateLimit: "Bitrate:",
        runAtRes: "Run at",
        highResWarning: "High resolutions may cause delay depending on your network.",
        terminalOutput: "Terminal Output",
        clear: "Clear",
        device: "Device",
        autoDevice: "Auto (Any)",
        titleRefreshDevices: "Refresh connected devices",
        runAll: "Start with My Settings",
        titleRunAll: "Run combined Device + Resolution + Custom Args",
        pendingChanges: "Settings changed. Apply to restart.",
        runningStatus: "Running",
        applyRestart: "Apply & Restart",
        fpsLimit: "Max FPS:",
        wirelessTitle: "Wireless Connection",
        wirelessDesc: "Enable TCP/IP on device via USB first.",
        enableTcpIp: "Enable TCP/IP Mode",
        connect: "Connect",
        tutWelcomeTitle: "Welcome to DroidMirror!",
        tutWelcomeDesc: "Let's take a quick look at how to control your Android device.",
        tutDeviceTitle: "Device Selection",
        tutDeviceDesc: "Choose which connected device you want to mirror here.",
        tutSettingsTitle: "Powerful Settings",
        tutSettingsDesc: "Combine resolution, FPS, bitrate, and toggles for the perfect experience.",
        tutRunTitle: "Start Mirroring",
        tutRunDesc: "Click here to start scrcpy with all your custom settings applied.",
        tutTerminalTitle: "Terminal Output",
        tutTerminalDesc: "Watch the magic happen here. Technical logs will appear in real-time.",
        next: "Next",
        skip: "Skip",
        understand: "Understood!",
        restartTutorial: "Restart Tutorial",
        tutFinalTitle: "Tutorial Finished!",
        tutFinalDesc: "Did you understand how to use DroidMirror or would you like to review the tutorial?"
    },
    pt: {
        quickActions: "Ações Rápidas",
        startDefault: "Iniciar normal",
        stopScrcpy: "Parar scrcpy",
        options: "Opções",
        screenOff: "Desligar Tela (-S)",
        alwaysOnTop: "Sempre no Topo",
        noAudio: "Sem Áudio",
        stayAwake: "Manter Acordado",
        showTouches: "Exibir Toques",
        readOnly: "Apenas Leitura",
        powerOff: "Delsig. ao Fechar",
        performance: "Desempenho & Vídeo",
        lowRes: "Limitar Res (1024)",
        maxFps: "Máx 60 FPS",
        advanced: "Avançado",
        otgMode: "Modo OTG",
        titleScreenOff: "Desliga a tela do dispositivo durante o espelhamento",
        titleAlwaysOnTop: "Mantém a janela do scrcpy sempre visível",
        titleNoAudio: "Desativa o repasse de áudio",
        titleStayAwake: "Impede o celular de apagar a tela",
        titleShowTouches: "Exibe feedback visual para toques na tela",
        titleReadOnly: "Desativa o controle do dispositivo (apenas visualização)",
        titlePowerOff: "Desliga a tela do dispositivo ao encerrar a sessão",
        titleRecord: "Grava a tela em um arquivo de vídeo",
        titleLowRes: "Limita a resolução a 1024px para mais fluidez",
        titleMaxFps: "Limita o vídeo a 60 quadros por segundo",
        titleOtg: "Modo OTG (Simula mouse/teclado sem espelhar o vídeo)",
        customCommand: "Comando Personalizado",
        placeholderCustom: "ex: -m 1024 -b 2M",
        run: "Iniciar",
        resolutionLimit: "Resolução limite:",
        bitrateLimit: "Taxa de Bits:",
        runAtRes: "Iniciar em",
        highResWarning: "Resoluções altas podem causar atraso dependendo da sua rede.",
        terminalOutput: "Saída do Terminal",
        clear: "Limpar",
        device: "Dispositivo",
        autoDevice: "Auto (Qualquer)",
        titleRefreshDevices: "Atualizar dispositivos conectados",
        runAll: "Iniciar com Minhas Configurações",
        titleRunAll: "Inicia combinando Dispositivo + Resolução + Comandos Custom",
        pendingChanges: "Configurações alteradas. Reinisie para aplicar.",
        runningStatus: "Rodando",
        applyRestart: "Aplicar e Reiniciar",
        fpsLimit: "FPS Máximo:",
        wirelessTitle: "Conexão Wireless",
        wirelessDesc: "Ative o Modo TCP/IP via USB primeiro.",
        enableTcpIp: "Ativar Modo TCP/IP",
        connect: "Conectar",
        tutWelcomeTitle: "Bem-vindo ao DroidMirror!",
        tutWelcomeDesc: "Vamos dar uma olhada rápida em como controlar seu dispositivo Android.",
        tutDeviceTitle: "Seleção de Dispositivo",
        tutDeviceDesc: "Escolha qual dispositivo conectado você deseja espelhar aqui.",
        tutSettingsTitle: "Configurações Poderosas",
        tutSettingsDesc: "Combine resolução, FPS, bitrate e opções para a experiência perfeita.",
        tutRunTitle: "Iniciar Espelhamento",
        tutRunDesc: "Clique aqui para iniciar o scrcpy com todas as suas configurações aplicadas.",
        tutTerminalTitle: "Saída do Terminal",
        tutTerminalDesc: "Veja a mágica acontecer aqui. Logs técnicos aparecerão em tempo real.",
        next: "Próximo",
        skip: "Pular",
        understand: "Entendi tudo!",
        restartTutorial: "Rever Tutorial",
        tutFinalTitle: "Tutorial Finalizado!",
        tutFinalDesc: "Você entendeu como usar o DroidMirror ou gostaria de rever o tutorial?"
    }
};

const resolutionsArray = [
    { label: '480p', value: '480' },
    { label: '720p', value: '720' },
    { label: '1080p', value: '1080' },
    { label: '1440p', value: '1440' },
    { label: 'Max', value: '0' }
];

const fpsArray = [
    { label: '30 FPS', value: '30' },
    { label: '60 FPS', value: '60' },
    { label: '90 FPS', value: '90' },
    { label: '120 FPS', value: '120' },
    { label: 'Unlimited', value: '0' }
];

const bitrateArray = [
    { label: '1 Mbps', value: '1M' },
    { label: '2 Mbps', value: '2M' },
    { label: '4 Mbps', value: '4M' },
    { label: '8 Mbps', value: '8M' },
    { label: '12 Mbps', value: '12M' },
    { label: '16 Mbps', value: '16M' },
    { label: '20 Mbps', value: '20M' }
];

document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const btnClear = document.getElementById('btn-clear-log');
    const langSelect = document.getElementById('lang-select');
    const deviceSelect = document.getElementById('device-select');
    const btnRefreshDevices = document.getElementById('btn-refresh-devices');
    const customArgsInput = document.getElementById('custom-args');
    const btnRunAll = document.getElementById('btn-run-all');
    const runAllText = document.getElementById('run-all-text');
    const runAllIcon = document.getElementById('run-all-icon');
    const pendingAlert = document.getElementById('pending-alert');
    const btnStopSide = document.getElementById('btn-stop-side');
    const resSlider = document.getElementById('res-slider');
    const resLabel = document.getElementById('res-label');
    const runResText = document.getElementById('run-res-text');
    const resWarning = document.getElementById('res-warning');
    const fpsSlider = document.getElementById('fps-slider');
    const fpsLabel = document.getElementById('fps-label');
    const bitrateSlider = document.getElementById('bitrate-slider');
    const bitrateLabel = document.getElementById('bitrate-label');

    const btnTcpIp = document.getElementById('btn-tcpip');
    const btnConnectWireless = document.getElementById('btn-connect-wireless');
    const wirelessIpInput = document.getElementById('wireless-ip');

    function applyTranslations(lang) {
        const texts = translations[lang] || translations.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (texts[key]) el.innerText = texts[key];
        });
        document.querySelectorAll('[data-title]').forEach(el => {
            const key = el.getAttribute('data-title');
            if (texts[key]) el.title = texts[key];
        });
        document.querySelectorAll('[data-placeholder]').forEach(el => {
            const key = el.getAttribute('data-placeholder');
            if (texts[key]) el.placeholder = texts[key];
        });
    }

    function getCurrentUIConfig() {
        return JSON.stringify({
            resIndex: resSlider?.value,
            fpsIndex: fpsSlider?.value,
            bitrateIndex: bitrateSlider?.value,
            customArgs: customArgsInput?.value.trim(),
            deviceId: deviceSelect?.value,
            toggles: Array.from(window.App.activeToggles).sort()
        });
    }

    function saveSettings() {
        const settings = {
            resIndex: resSlider?.value,
            fpsIndex: fpsSlider?.value,
            bitrateIndex: bitrateSlider?.value,
            customArgs: customArgsInput?.value,
            deviceId: deviceSelect?.value,
            toggles: Array.from(window.App.activeToggles)
        };
        localStorage.setItem('scrcpy-settings', JSON.stringify(settings));
    }

    function loadSettings() {
        const saved = localStorage.getItem('scrcpy-settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                if (resSlider && settings.resIndex !== undefined) resSlider.value = settings.resIndex;
                if (fpsSlider && settings.fpsIndex !== undefined) fpsSlider.value = settings.fpsIndex;
                if (bitrateSlider && settings.bitrateIndex !== undefined) bitrateSlider.value = settings.bitrateIndex;
                if (customArgsInput && settings.customArgs !== undefined) customArgsInput.value = settings.customArgs;
                if (settings.toggles) {
                    window.App.activeToggles = new Set(settings.toggles);
                    updateToggleUI();
                }
            } catch (e) { console.error(e); }
        }
    }

    function updateButtonState() {
        const isDirty = window.App.activeSessionConfig && window.App.activeSessionConfig !== getCurrentUIConfig();
        const texts = translations[window.App.curLang] || translations.en;

        btnRunAll?.classList.remove('running', 'apply-restart', 'primary');
        btnStopSide?.classList.add('hidden');

        if (!window.App.scrcpyRunning) {
            btnRunAll?.classList.add('primary');
            if (runAllIcon) runAllIcon.innerHTML = '<i data-lucide="rocket"></i>';
            if (runAllText) runAllText.innerText = texts.runAll;
            pendingAlert?.classList.add('hidden');
        } else {
            btnStopSide?.classList.remove('hidden');
            if (isDirty) {
                btnRunAll?.classList.add('apply-restart');
                if (runAllIcon) runAllIcon.innerHTML = '<i data-lucide="refresh-cw"></i>';
                if (runAllText) runAllText.innerText = texts.applyRestart;
                pendingAlert?.classList.remove('hidden');
            } else {
                btnRunAll?.classList.add('running');
                if (runAllIcon) runAllIcon.innerHTML = '<i data-lucide="play-circle"></i>';
                if (runAllText) runAllText.innerText = texts.runningStatus;
                pendingAlert?.classList.add('hidden');
            }
        }
        if (window.lucide) window.lucide.createIcons();
    }

    function updateToggleUI() {
        const toggleMap = {
            'btn-screen-off': '-S',
            'btn-always-on-top': '--always-on-top',
            'btn-no-audio': '--no-audio',
            'btn-stay-awake': '-w',
            'btn-show-touches': '--show-touches',
            'btn-read-only': '--no-control',
            'btn-power-off': '--power-off-on-close'
        };
        
        Object.keys(toggleMap).forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                if (window.App.activeToggles.has(toggleMap[btnId])) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }

    function updateSliderLabel() {
        if (!resSlider || !resLabel || !runResText) return;
        const res = resolutionsArray[resSlider.value];
        resLabel.textContent = res.label;
        const runText = translations[window.App.curLang].runAtRes;
        runResText.textContent = `${runText} ${res.label}`;
        
        if (resSlider.value >= 2) resWarning?.classList.remove('hidden');
        else resWarning?.classList.add('hidden');

        if (fpsSlider && fpsLabel) {
            const fpsObj = fpsArray[fpsSlider.value];
            fpsLabel.textContent = fpsObj.label;
        }

        if (bitrateSlider && bitrateLabel) {
            const brObj = bitrateArray[bitrateSlider.value];
            bitrateLabel.textContent = brObj.label;
        }
    }

    function appendLog(text) {
        if (!terminal) return;
        const isScrolledToBottom = terminal.scrollHeight - terminal.clientHeight <= terminal.scrollTop + 1;
        terminal.innerText += text;
        if (isScrolledToBottom) terminal.scrollTop = terminal.scrollHeight;
    }

    async function refreshDevices() {
        if (!window.scrcpyAPI) return;
        const devices = await window.scrcpyAPI.getDevices();
        const currentSelection = deviceSelect?.value;
        
        while (deviceSelect && deviceSelect.options.length > 1) deviceSelect.remove(1);
        
        devices.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.id;
            opt.text = `${d.id} (${d.state})`;
            deviceSelect?.add(opt);
        });
        
        if (currentSelection) deviceSelect.value = currentSelection;
    }

    function runWithDevice(args) {
        if (!window.scrcpyAPI) return;
        const serial = deviceSelect?.value;
        const finalArgs = serial ? ['-s', serial, ...args] : [...args];
        window.scrcpyAPI.runCommand(finalArgs);
    }

    if (window.scrcpyAPI) {
        document.getElementById('btn-win-min')?.addEventListener('click', () => window.scrcpyAPI.minimize());
        document.getElementById('btn-win-max')?.addEventListener('click', () => window.scrcpyAPI.maximize());
        document.getElementById('btn-win-close')?.addEventListener('click', () => window.scrcpyAPI.close());
        window.scrcpyAPI.onLog(appendLog);
        window.scrcpyAPI.onSessionStatus((running) => {
            window.App.scrcpyRunning = running;
            if (!running) window.App.activeSessionConfig = null;
            updateButtonState();
        });
    }

    langSelect?.addEventListener('change', (e) => {
        window.App.curLang = e.target.value;
        localStorage.setItem('scrcpy-lang', window.App.curLang);
        applyTranslations(window.App.curLang);
        updateSliderLabel();
        updateButtonState();
    });

    btnClear?.addEventListener('click', () => { if (terminal) terminal.innerText = ''; });
    btnRefreshDevices?.addEventListener('click', refreshDevices);
    setInterval(refreshDevices, 3000);
    deviceSelect?.addEventListener('change', () => { saveSettings(); updateButtonState(); });

    btnRunAll?.addEventListener('click', () => {
        saveSettings();
        window.App.activeSessionConfig = getCurrentUIConfig();
        updateButtonState();
        const args = [];
        const res = resolutionsArray[resSlider.value];
        if (res.value !== '0') args.push('-m', res.value);
        
        const fps = fpsArray[fpsSlider.value];
        if (fps.value !== '0') args.push('--max-fps', fps.value);

        const br = bitrateArray[bitrateSlider.value];
        args.push('-b', br.value);

        const custom = customArgsInput?.value.trim();
        if (custom) args.push(...custom.split(' ').filter(a => a.length > 0));
        args.push(...Array.from(window.App.activeToggles));
        runWithDevice(args);
    });

    btnStopSide?.addEventListener('click', () => window.scrcpyAPI?.stopCommand());
    document.getElementById('btn-start')?.addEventListener('click', () => runWithDevice([]));
    document.getElementById('btn-stop')?.addEventListener('click', () => window.scrcpyAPI?.stopCommand());

    ['btn-screen-off', 'btn-always-on-top', 'btn-no-audio', 'btn-stay-awake', 'btn-show-touches', 'btn-read-only', 'btn-power-off'].forEach(id => {
        const flagMap = {
            'btn-screen-off': '-S',
            'btn-always-on-top': '--always-on-top',
            'btn-no-audio': '--no-audio',
            'btn-stay-awake': '-w',
            'btn-show-touches': '--show-touches',
            'btn-read-only': '--no-control',
            'btn-power-off': '--power-off-on-close'
        };
        const flag = flagMap[id];
        document.getElementById(id)?.addEventListener('click', () => {
            if (window.App.activeToggles.has(flag)) window.App.activeToggles.delete(flag);
            else window.App.activeToggles.add(flag);
            updateToggleUI();
            saveSettings();
            updateButtonState();
        });
    });

    document.getElementById('btn-max-fps')?.addEventListener('click', () => runWithDevice(['--max-fps', '60']));
    document.getElementById('btn-record')?.addEventListener('click', () => runWithDevice(['--record', 'scrcpy_record.mp4']));
    document.getElementById('btn-otg')?.addEventListener('click', () => runWithDevice(['--otg']));

    const updateAll = () => { saveSettings(); updateButtonState(); };
    resSlider?.addEventListener('input', updateSliderLabel);
    resSlider?.addEventListener('change', updateAll);
    fpsSlider?.addEventListener('input', updateSliderLabel);
    fpsSlider?.addEventListener('change', updateAll);
    bitrateSlider?.addEventListener('input', updateSliderLabel);
    bitrateSlider?.addEventListener('change', updateAll);
    customArgsInput?.addEventListener('input', updateButtonState);

    document.getElementById('btn-run-res')?.addEventListener('click', () => {
        const res = resolutionsArray[resSlider.value];
        runWithDevice(res.value === '0' ? [] : ['-m', res.value]);
    });

    document.getElementById('btn-custom')?.addEventListener('click', () => {
        const input = customArgsInput?.value.trim();
        updateAll();
        if (input) runWithDevice(input.split(' ').filter(a => a.length > 0));
    });

    document.getElementById('btn-social-yt')?.addEventListener('click', () => window.scrcpyAPI?.openExternal('https://www.youtube.com/@NonsensysDEV'));
    document.getElementById('btn-repo-droid')?.addEventListener('click', () => window.scrcpyAPI?.openExternal('https://github.com/Genymobile/scrcpy'));
    document.getElementById('btn-repo-scrcpy')?.addEventListener('click', () => window.scrcpyAPI?.openExternal('https://github.com/Genymobile/scrcpy'));


    btnTcpIp?.addEventListener('click', async () => {
        appendLog("> Switching device to TCP/IP mode (port 5555)...\n");
        const res = await window.scrcpyAPI.runAdb(['tcpip', '5555']);
        if (res.success) {
            appendLog(`> Success: ${res.stdout}\n`);
            appendLog("> You can now disconnect the USB and use the Connect button.\n");
        } else {
            appendLog(`> Error: ${res.stderr || res.error}\n`);
        }
    });

    btnConnectWireless?.addEventListener('click', async () => {
        const ip = wirelessIpInput?.value.trim();
        if (!ip) {
            appendLog("> Please enter an IP address.\n");
            return;
        }
        appendLog(`> Connecting to wireless device at ${ip}...\n`);
        const res = await window.scrcpyAPI.runAdb(['connect', `${ip}:5555`]);
        if (res.success) {
            appendLog(`> Result: ${res.stdout}\n`);
            refreshDevices();
        } else {
            appendLog(`> Error: ${res.stderr || res.error}\n`);
        }
    });


    let currentStep = 0;
    const tutorialSteps = [
        { target: null, title: 'tutWelcomeTitle', desc: 'tutWelcomeDesc' },
        { target: 'device-select', title: 'tutDeviceTitle', desc: 'tutDeviceDesc' },
        { target: 'res-slider', title: 'tutSettingsTitle', desc: 'tutSettingsDesc' },
        { target: 'btn-run-all', title: 'tutRunTitle', desc: 'tutRunDesc' },
        { target: 'terminal', title: 'tutTerminalTitle', desc: 'tutTerminalDesc' }
    ];

    async function showTutorialStep(index) {
        const container = document.getElementById('tutorial-container');
        if (!container) return;
        
        container.innerHTML = '';
        if (index >= tutorialSteps.length) {
            finishTutorial();
            return;
        }

        const step = tutorialSteps[index];
        const texts = translations[window.App.curLang] || translations.en;

        if (step.target) {
            const targetEl = document.getElementById(step.target);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await new Promise(r => setTimeout(r, 600)); 
            }
        }

        const overlay = document.createElement('div');
        overlay.className = 'tutorial-overlay';
        
        if (step.target) {
            const targetEl = document.getElementById(step.target);
            if (targetEl) {
                const rect = targetEl.getBoundingClientRect();
                const spotlight = document.createElement('div');
                spotlight.className = 'tutorial-spotlight';
                spotlight.style.width = `${rect.width + 12}px`;
                spotlight.style.height = `${rect.height + 12}px`;
                spotlight.style.top = `${rect.top - 6}px`;
                spotlight.style.left = `${rect.left - 6}px`;
                overlay.appendChild(spotlight); 
            }
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'tutorial-tooltip';
        tooltip.innerHTML = `
            <h3>${texts[step.title]}</h3>
            <p>${texts[step.desc]}</p>
            <div class="tutorial-buttons">
                <button id="tut-skip" class="btn-small">${texts.skip}</button>
                <button id="tut-next" class="btn-small">${texts.next}</button>
            </div>
        `;

        if (!step.target) {
            tooltip.style.position = 'relative';
        } else {
            const targetEl = document.getElementById(step.target);
            if (targetEl) {
                const rect = targetEl.getBoundingClientRect();
                const winW = window.innerWidth;
                const winH = window.innerHeight;
                const tooltipW = 280;
                
                let left = rect.left;
                if (left + tooltipW > winW - 20) {
                    left = winW - tooltipW - 40;
                }
                left = Math.max(20, left);

                let top = rect.bottom + 25;
                if (top + 150 > winH) {
                    top = rect.top - 180;
                }
                top = Math.max(70, top); 

                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
            }
        }

        overlay.appendChild(tooltip);
        container.appendChild(overlay);

        document.getElementById('tut-next').onclick = (e) => {
            e.stopPropagation();
            currentStep++;
            showTutorialStep(currentStep);
        };
        document.getElementById('tut-skip').onclick = (e) => {
            e.stopPropagation();
            finishTutorial();
        };
    }

    function finishTutorial() {
        document.getElementById('tutorial-container').innerHTML = '';
        const modal = document.getElementById('tutorial-modal-overlay');
        const texts = translations[window.App.curLang] || translations.en;
        
        if (modal) {
            document.getElementById('modal-title').innerText = texts.tutFinalTitle;
            document.getElementById('modal-desc').innerText = texts.tutFinalDesc;
            document.getElementById('btn-modal-restart').innerText = texts.restartTutorial;
            document.getElementById('btn-modal-done').innerText = texts.understand;
            modal.classList.remove('hidden');
        }
    }

    document.getElementById('btn-modal-restart')?.addEventListener('click', () => {
        document.getElementById('tutorial-modal-overlay').classList.add('hidden');
        currentStep = 0;
        showTutorialStep(currentStep);
    });

    document.getElementById('btn-modal-done')?.addEventListener('click', () => {
        document.getElementById('tutorial-modal-overlay').classList.add('hidden');
        localStorage.setItem('scrcpy-tutorial-done', 'true');
    });

    if (langSelect) langSelect.value = window.App.curLang;
    applyTranslations(window.App.curLang);
    loadSettings();
    updateSliderLabel();
    refreshDevices();
    updateButtonState();

    if (localStorage.getItem('scrcpy-tutorial-done') !== 'true') {
        setTimeout(() => showTutorialStep(0), 1000);
    }
});
