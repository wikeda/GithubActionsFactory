/**
 * UI Manager
 * Handles DOM manipulation and user interaction.
 */

const UI = {
    elements: {
        // Screens
        topScreen: document.getElementById('top-screen'),
        mapScreen: document.getElementById('map-screen'),
        gameScreen: document.getElementById('game-screen'),

        // Map Elements
        levelMap: document.getElementById('level-map'),
        btnStartGame: document.getElementById('btn-start-game'),
        btnShowStats: document.getElementById('btn-show-stats'),
        btnMapGlossary: document.getElementById('btn-map-glossary'),
        btnBackMap: document.getElementById('btn-back-map'),
        btnBackToMap: document.getElementById('btn-back-to-map'),

        // Game Elements
        levelDisplay: document.getElementById('level-display'),
        levelTitle: document.getElementById('level-title'),
        slotsContainer: document.getElementById('slots-container'),
        blocksPalette: document.getElementById('blocks-palette'),
        consoleContent: document.getElementById('console-content'),
        pipelineStatus: document.getElementById('pipeline-status'),
        btnRun: document.getElementById('btn-run'),
        btnReset: document.getElementById('btn-reset'),
        btnNextLevel: document.getElementById('btn-next-level'),
        btnGlossary: document.getElementById('btn-glossary'),

        // Modals
        glossaryModal: document.getElementById('glossary-modal'),
        glossaryContent: document.getElementById('glossary-content'),
        levelCompleteModal: document.getElementById('level-complete-modal'),
        levelExplanationText: document.getElementById('level-explanation-text'),
        statsModal: document.getElementById('stats-modal'),
        statsContent: document.getElementById('stats-content'),
        btnCloseModals: document.querySelectorAll('.btn-close')
    },

    /**
     * Initialize UI event listeners
     */
    init: function () {
        this.setupModalListeners();
        this.setupNavigationListeners();
        this.renderGlossary();
    },

    setupNavigationListeners: function () {
        this.elements.btnStartGame.addEventListener('click', () => {
            this.showScreen('map-screen');
            this.renderMap();
        });

        this.elements.btnBackMap.addEventListener('click', () => {
            this.showScreen('map-screen');
            this.renderMap();
        });

        this.elements.btnBackToMap.addEventListener('click', () => {
            this.hideLevelCompleteModal();
            this.showScreen('map-screen');
            this.renderMap();
        });

        this.elements.btnShowStats.addEventListener('click', () => {
            this.renderStats();
            this.elements.statsModal.classList.remove('hidden');
        });

        this.elements.btnMapGlossary.addEventListener('click', () => {
            this.elements.glossaryModal.classList.remove('hidden');
        });

        // ホームボタン（新規追加）
        const btnHome = document.getElementById('btn-home');
        if (btnHome) {
            btnHome.addEventListener('click', () => {
                this.showScreen('top-screen');
            });
        }

        // ロゴクリックでTOP画面に遷移（新規追加）
        const logoHome = document.getElementById('logo-home');
        if (logoHome) {
            logoHome.addEventListener('click', () => {
                this.showScreen('top-screen');
            });
        }
    },

    showScreen: function (screenId) {
        ['top-screen', 'map-screen', 'game-screen'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.add('hidden');
            el.classList.remove('active');
        });

        const target = document.getElementById(screenId);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('active');
        }
    },

    renderMap: function () {
        const container = this.elements.levelMap;
        container.innerHTML = '';

        const data = Storage.load();
        const maxLevel = data.maxLevel;

        // カテゴリ順序をLEVELSの記述順から抽出
        const categories = [];
        LEVELS.forEach(level => {
            if (!categories.includes(level.category)) {
                categories.push(level.category);
            }
        });

        categories.forEach(category => {
            const section = document.createElement('div');
            section.className = 'level-category';

            const title = document.createElement('div');
            title.className = 'category-title';
            title.textContent = category;
            section.appendChild(title);

            const levelsWrap = document.createElement('div');
            levelsWrap.className = 'category-levels';

            LEVELS.filter(l => l.category === category).forEach(level => {
                const node = document.createElement('div');
                node.className = 'level-node';

                if (level.id < maxLevel) {
                    node.classList.add('cleared');
                } else if (level.id > maxLevel) {
                    node.classList.add('locked');
                }

                node.innerHTML = `
                    <div class="level-number">${String(level.id).padStart(2, '0')}</div>
                    <div class="level-status">
                        ${level.id < maxLevel ? 'CLEARED' : (level.id === maxLevel ? 'NEXT' : 'LOCKED')}
                    </div>
                    <div class="level-title-small">${level.title}</div>
                `;

                if (level.id <= maxLevel) {
                    node.addEventListener('click', () => {
                        Game.startLevel(level.id);
                    });
                }

                levelsWrap.appendChild(node);
            });

            section.appendChild(levelsWrap);
            container.appendChild(section);
        });
    },

    renderStats: function () {
        const container = this.elements.statsContent;
        const data = Storage.load();
        const stats = data.stats;

        let totalAttempts = 0;
        let totalClears = 0;
        let html = '<div class="stats-grid">';

        LEVELS.forEach(level => {
            const levelStats = stats[level.id] || { attempts: 0, clears: 0 };
            totalAttempts += levelStats.attempts;
            totalClears += levelStats.clears;

            html += `
                <div class="stat-card">
                    <div class="stat-value">${level.id}</div>
                    <div class="stat-label">${level.title}</div>
                    <div style="margin-top: 10px; font-size: 0.8rem;">
                        クリア回数: ${levelStats.clears}<br>
                        挑戦回数: ${levelStats.attempts}
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // Overall Proficiency
        const proficiency = totalAttempts > 0 ? Math.round((totalClears / totalAttempts) * 100) : 0;

        const summaryHtml = `
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 3rem; color: var(--accent-primary); font-weight: bold;">${proficiency}%</div>
                <div style="color: var(--text-secondary);">総合習熟度</div>
                <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                    総プレイ回数: ${totalAttempts}回
                </div>
            </div>
        `;

        container.innerHTML = summaryHtml + html;
    },

    /**
     * Render the level UI
     * @param {Object} level 
     */
    renderLevel: function (level) {
        this.elements.levelDisplay.textContent = String(level.id).padStart(2, '0');
        this.elements.levelTitle.textContent = level.title;

        // Render Slots
        this.elements.slotsContainer.innerHTML = '';
        for (let i = 0; i < level.slots; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.dataset.index = i;
            this.setupSlotEvents(slot);
            this.elements.slotsContainer.appendChild(slot);
        }

        // Render Palette
        this.elements.blocksPalette.innerHTML = '';
        level.availableBlocks.forEach(blockId => {
            const blockData = BLOCKS[blockId];
            if (blockData) {
                const block = this.createBlockElement(blockData);
                this.elements.blocksPalette.appendChild(block);
            }
        });

        this.clearConsole();
        this.log(`Loaded Level ${level.id}: ${level.title}`, 'info');
        this.log(level.description, 'info');
        this.logHint(level);

        this.updateStatus('READY');
    },

    /**
     * Create a draggable block element
     * @param {Object} blockData 
     * @returns {HTMLElement}
     */
    createBlockElement: function (blockData) {
        const el = document.createElement('div');
        el.className = 'block';
        el.draggable = true;
        el.dataset.id = blockData.id;
        el.innerHTML = `
            <div class="block-icon">${blockData.icon}</div>
            <div class="block-name">${blockData.name}</div>
        `;

        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', blockData.id);
            e.dataTransfer.effectAllowed = 'copy';
            el.classList.add('dragging');
        });

        el.addEventListener('dragend', () => {
            el.classList.remove('dragging');
        });

        return el;
    },

    /**
     * Setup drag and drop events for a slot
     * @param {HTMLElement} slot 
     */
    setupSlotEvents: function (slot) {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            e.dataTransfer.dropEffect = 'copy';
            slot.classList.add('drag-over');
        });

        slot.addEventListener('dragleave', () => {
            slot.classList.remove('drag-over');
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('drag-over');
            const blockId = e.dataTransfer.getData('text/plain');
            const blockData = BLOCKS[blockId];

            if (blockData) {
                // Clear existing content
                slot.innerHTML = '';
                // Create a copy of the block (not draggable inside slot for simplicity, or maybe removable)
                const blockEl = this.createBlockElement(blockData);
                blockEl.draggable = false; // Once placed, maybe click to remove?

                // Add remove functionality
                blockEl.style.cursor = 'pointer';
                blockEl.title = 'Click to remove';
                blockEl.onclick = () => {
                    slot.innerHTML = '';
                    slot.dataset.blockId = '';
                };

                slot.appendChild(blockEl);
                slot.dataset.blockId = blockId;
            }
        });
    },

    /**
     * Get the current configuration from slots
     * @returns {Array} Array of block IDs
     */
    getPipelineConfig: function () {
        const slots = Array.from(this.elements.slotsContainer.children);
        return slots.map(slot => slot.dataset.blockId).filter(id => id !== undefined && id !== '');
    },

    /**
     * Log message to console
     * @param {string} message 
     * @param {string} type 'info' | 'success' | 'error' | 'warning'
     */
    log: function (message, type = 'info') {
        const line = document.createElement('div');
        line.className = `log-line ${type}`;
        line.textContent = `> ${message}`;
        this.elements.consoleContent.appendChild(line);
        this.elements.consoleContent.scrollTop = this.elements.consoleContent.scrollHeight;
    },

    /**
     * Log hint based on attempt count
     * 0回目: ヒントなし
     * 1回目: ソフトヒント（汎用）
     * 2回目以降: レベル固有ヒント
     */
    logHint: function (level) {
        const stats = Storage.load().stats || {};
        const attempts = stats[level.id]?.attempts || 0;

        if (attempts <= 1) return; // 初回（attempts=1）まではヒントなし
        if (attempts === 2) {
            this.log('HINT (soft): 順序と依存関係に気をつけて組み立ててみましょう。', 'warning');
            return;
        }

        if (level.hint) {
            this.log(`HINT: ${level.hint}`, 'warning');
        }
    },

    clearConsole: function () {
        this.elements.consoleContent.innerHTML = '';
    },

    updateStatus: function (status) {
        const badge = this.elements.pipelineStatus;
        badge.textContent = status;
        badge.className = 'status-badge'; // reset

        if (status === 'RUNNING') badge.classList.add('running');
        else if (status === 'SUCCESS') badge.classList.add('success');
        else if (status === 'FAILED') badge.classList.add('failed');
    },

    /**
     * Modal Handling
     */
    setupModalListeners: function () {
        this.elements.btnGlossary.addEventListener('click', () => {
            this.elements.glossaryModal.classList.remove('hidden');
        });

        this.elements.btnCloseModals.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.add('hidden');
            });
        });

        // Close on click outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.add('hidden');
            }
        });
    },

    showLevelCompleteModal: function () {
        this.elements.levelCompleteModal.classList.remove('hidden');
    },

    hideLevelCompleteModal: function () {
        this.elements.levelCompleteModal.classList.add('hidden');
    },

    renderGlossary: function () {
        const container = this.elements.glossaryContent;
        container.innerHTML = '';

        GLOSSARY.forEach(item => {
            const div = document.createElement('div');
            div.style.marginBottom = '15px';
            div.innerHTML = `
                <h3 style="color: var(--accent-primary); margin-bottom: 5px;">${item.term}</h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">${item.definition}</p>
            `;
            container.appendChild(div);
        });
    }
};
