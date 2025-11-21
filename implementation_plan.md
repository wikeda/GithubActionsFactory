# GitHub Actions Factory - Implementation Plan

## 1. Project Overview
A puzzle simulation game to learn GitHub Actions concepts.
- **Genre**: Factory Simulation / Puzzle
- **Platform**: Web Browser (GitHub Pages compatible)
- **Storage**: LocalStorage (for progress and settings)
- **Target Audience**: Beginners to GitHub Actions

## 2. Core Gameplay
- **Objective**: Process "Source Code" into a "Release Package" by placing correct Action blocks in the pipeline.
- **Mechanics**:
    - **Conveyor Belt**: Represents the workflow timeline.
    - **Blocks**: Represent GitHub Actions steps (e.g., `checkout`, `setup-node`, `npm install`, `npm test`, `docker build`).
    - **Execution**: When the player presses "Run", the code moves through the blocks.
    - **Success Condition**: The code passes all checks and transformations required for the level.
    - **Failure Condition**: Missing dependencies, wrong order, or syntax errors cause the pipeline to stop (fail).

## 3. Architecture
- **Tech Stack**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla ES6+).
- **File Structure**:
    ```
    GithubActionsFactory/
    ├── index.html
    ├── css/
    │   ├── style.css       # Global styles
    │   ├── game.css        # Game board styles
    │   └── components.css  # UI components (modals, buttons)
    ├── js/
    │   ├── app.js          # Entry point
    │   ├── game.js         # Game loop and logic
    │   ├── levels.js       # Level definitions
    │   ├── blocks.js       # Block definitions and behavior
    │   ├── storage.js      # LocalStorage wrapper
    │   ├── ui.js           # UI rendering and interaction
    │   └── glossary.js     # Glossary data and logic
    └── assets/             # Images and icons
    ```

## 4. Features
### 4.1 Game Loop
1.  **Top Screen**: Introduction to the game and learning objectives.
2.  **Level Map**: Visual map of levels showing progress and allowing replay.
3.  **Planning Phase**: Player drags blocks from the palette to the conveyor belt slots.
4.  **Run Phase**: Player clicks "Commit & Push" (Start). The pipeline executes visually.
5.  **Result**:
    - **Success**: "Build Passing" animation with detailed Japanese explanation of the workflow logic.
    - **Fail**: "Build Failed" animation with error logs.

### 4.2 Glossary (用語集)
- A dictionary of GitHub Actions terms accessible anytime.
- Terms: Workflow, Job, Step, Action, Runner, Event, Artifact, Secret, etc.
- Unlocks terms as they appear in levels.

### 4.3 Levels (Draft)
- **Lvl 1: The Basics**: Just `checkout` and `test`. (Intro to order)
- **Lvl 2: Environment**: `setup-node` -> `install` -> `test`. (Intro to dependencies)
- **Lvl 3: Artifacts**: `build` -> `upload-artifact`. (Intro to outputs)
- **Lvl 4: Parallelism**: Running lint and test in parallel (visualized as branching belts).
- **Lvl 5: Caching**: Using `cache` to speed up (time limit challenge).

### 4.4 Statistics & Progress
- Track number of attempts/clears per level.
- Display "Proficiency" (習熟度) based on play count and success rate.

## 5. UI/UX Design
- **Theme**: "Dark Mode" IDE-like aesthetic mixed with "Factory" visuals.
- **Colors**: GitHub Dark Dimmed palette (Greys, Blues, Greens for success, Reds for failure).
- **Interactions**: Drag and Drop API for blocks.
- **Screens**:
    - **Top Screen**: Title, Description, "Start Game" button.
    - **Map Screen**: Nodes for each level, status indicators (locked/unlocked/cleared), Stats button.
    - **Game Screen**: The main factory interface.
    - **Stats Modal**: Detailed play statistics.

## 6. Implementation Steps
1.  **Setup**: Create project structure and basic HTML/CSS.
2.  **Core Logic**: Implement the block system and pipeline execution engine.
3.  **UI Implementation**: Game board, drag & drop, glossary modal.
4.  **Content**: Define levels 1-5 and glossary terms.
5.  **Polish**: Animations, sound effects (optional), save system.
