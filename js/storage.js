/**
 * Storage Manager
 * Handles saving and loading game progress to LocalStorage.
 */

const STORAGE_KEY = 'githubActionsFactoryData';

const Storage = {
    /**
     * Load game data
     * @returns {Object} { maxLevel: number, stats: { [levelId]: { attempts: number, clears: number } } }
     */
    load: function () {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            const parsed = data ? JSON.parse(data) : {};
            return {
                maxLevel: parsed.maxLevel || 1,
                stats: parsed.stats || {}
            };
        } catch (e) {
            console.error('Failed to load save data', e);
            return { maxLevel: 1, stats: {} };
        }
    },

    /**
     * Save game data
     * @param {Object} data 
     */
    save: function (data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save data', e);
        }
    },

    /**
     * Update max level reached
     * @param {number} levelId 
     */
    completeLevel: function (levelId) {
        const data = this.load();
        if (levelId >= data.maxLevel) {
            data.maxLevel = levelId + 1;
        }

        // Update stats
        if (!data.stats[levelId]) data.stats[levelId] = { attempts: 0, clears: 0 };
        data.stats[levelId].clears++;

        this.save(data);
    },

    /**
     * Record an attempt
     * @param {number} levelId 
     */
    recordAttempt: function (levelId) {
        const data = this.load();
        if (!data.stats[levelId]) data.stats[levelId] = { attempts: 0, clears: 0 };
        data.stats[levelId].attempts++;
        this.save(data);
    },

    /**
     * Reset all progress
     */
    reset: function () {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
};
