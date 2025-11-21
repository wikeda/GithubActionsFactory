/**
 * Game Logic
 * Controls the game loop and validation.
 */

const Game = {
    currentLevelId: 1,
    currentLevel: null,
    isRunning: false,

    init: function () {
        // Initial screen is handled by HTML structure (Top Screen active by default)
        this.setupControls();
    },

    startLevel: function (id) {
        this.currentLevelId = id;
        this.loadLevel(id);
        UI.showScreen('game-screen');
    },

    loadLevel: function (id) {
        this.currentLevel = LEVELS.find(l => l.id === id);
        if (!this.currentLevel) {
            console.error('Level not found:', id);
            return;
        }
        UI.renderLevel(this.currentLevel);
    },

    setupControls: function () {
        UI.elements.btnRun.addEventListener('click', () => this.runPipeline());
        UI.elements.btnReset.addEventListener('click', () => this.resetLevel());
        UI.elements.btnNextLevel.addEventListener('click', () => this.nextLevel());
    },

    resetLevel: function () {
        if (this.isRunning) return;
        this.loadLevel(this.currentLevelId);
    },

    nextLevel: function () {
        UI.hideLevelCompleteModal();
        if (this.currentLevelId < LEVELS.length) {
            this.currentLevelId++;
            this.startLevel(this.currentLevelId);
        } else {
            alert('Congratulations! You have completed all levels!');
            UI.showScreen('map-screen');
            UI.renderMap();
        }
    },

    runPipeline: function () {
        if (this.isRunning) return;
        this.isRunning = true;
        UI.updateStatus('RUNNING');
        UI.log('Starting workflow...', 'info');

        // Record attempt
        Storage.recordAttempt(this.currentLevelId);

        const config = UI.getPipelineConfig();

        // Simulate execution delay
        let stepIndex = 0;

        const executeStep = () => {
            if (stepIndex >= config.length) {
                this.finishExecution(config);
                return;
            }

            const blockId = config[stepIndex];
            const block = BLOCKS[blockId];

            UI.log(`[Step ${stepIndex + 1}] Running ${block.name}...`, 'info');

            setTimeout(() => {
                // Basic validation per step (mocking)
                if (blockId === 'npm-install' && !this.hasDependency(config, stepIndex, 'env-node')) {
                    this.failExecution(`Error: 'npm' command not found. Node.js environment is missing.`);
                    return;
                }

                UI.log(`✓ ${block.name} completed successfully.`, 'success');
                stepIndex++;
                executeStep();
            }, 800); // 800ms delay per step
        };

        executeStep();
    },

    hasDependency: function (config, currentIndex, requiredOutput) {
        // Check if any previous block outputs the required dependency
        for (let i = 0; i < currentIndex; i++) {
            const prevBlock = BLOCKS[config[i]];
            if (prevBlock && prevBlock.output === requiredOutput) {
                return true;
            }
        }
        return false;
    },

    finishExecution: function (config) {
        this.isRunning = false;

        // Check against solution
        const isCorrect = this.validateSolution(config);

        if (isCorrect) {
            UI.updateStatus('SUCCESS');
            UI.log('Build Successful! Artifacts generated.', 'success');
            Storage.completeLevel(this.currentLevelId);

            // Show explanation
            UI.elements.levelExplanationText.textContent = this.currentLevel.explanation || 'Good job!';

            setTimeout(() => {
                UI.showLevelCompleteModal();
            }, 1000);
        } else {
            this.failExecution('Workflow finished but did not meet requirements.');
        }
    },

    failExecution: function (reason) {
        this.isRunning = false;
        UI.updateStatus('FAILED');
        UI.log(reason, 'error');
        UI.log('Build Failed.', 'error');

        // Show hint based on attempts after a failure
        if (this.currentLevel) {
            UI.logHint(this.currentLevel);
        }
    },

    validateSolution: function (config) {
        // Simple validation: Check if config matches solution exactly
        // Or check if all required blocks are present in correct relative order

        const solution = this.currentLevel.solution;

        if (config.length !== solution.length) {
            UI.log(`Expected ${solution.length} steps, but got ${config.length}.`, 'warning');
            return false;
        }

        for (let i = 0; i < solution.length; i++) {
            if (config[i] !== solution[i]) {
                UI.log(`Step ${i + 1}: Expected ${BLOCKS[solution[i]].name}, but got ${BLOCKS[config[i]].name}.`, 'warning');
                return false;
            }
        }

        return true;
    }
};
