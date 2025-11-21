/**
 * Block Definitions
 * Defines the available Action blocks in the game.
 */

const BLOCKS = {
    'checkout': {
        id: 'checkout',
        name: 'Checkout',
        icon: '📥',
        description: 'リポジトリからソースコードをチェックアウトします。',
        type: 'setup',
        output: 'code'
    },
    'setup-node': {
        id: 'setup-node',
        name: 'Setup Node',
        icon: '🔧',
        description: 'Node.js環境をセットアップします。',
        type: 'setup',
        requires: [],
        output: 'env-node'
    },
    'npm-install': {
        id: 'npm-install',
        name: 'npm install',
        icon: '📦',
        description: '依存関係（パッケージ）をインストールします。',
        type: 'command',
        requires: ['code', 'env-node'],
        output: 'node_modules'
    },
    'npm-test': {
        id: 'npm-test',
        name: 'npm test',
        icon: '🧪',
        description: 'テストを実行してコードの品質をチェックします。',
        type: 'command',
        requires: ['code', 'node_modules'],
        output: 'test-results'
    },
    'npm-build': {
        id: 'npm-build',
        name: 'npm build',
        icon: '🔨',
        description: 'ソースコードをビルドして配布可能な形式にします。',
        type: 'command',
        requires: ['code', 'node_modules'],
        output: 'build-artifacts'
    },
    'upload-artifact': {
        id: 'upload-artifact',
        name: 'Upload Artifact',
        icon: '📤',
        description: 'ビルド成果物を保存します。',
        type: 'utility',
        requires: ['build-artifacts'],
        output: 'uploaded'
    },
    'docker-build': {
        id: 'docker-build',
        name: 'Docker Build',
        icon: '🐳',
        description: 'Dockerイメージをビルドします。',
        type: 'command',
        requires: ['code'],
        output: 'docker-image'
    }
};
