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
    },
    'docker-login': {
        id: 'docker-login',
        name: 'Docker Login',
        icon: '🔑',
        description: 'コンテナレジストリへログインします。',
        type: 'setup',
        requires: [],
        output: 'registry-auth'
    },
    'docker-push': {
        id: 'docker-push',
        name: 'Docker Push',
        icon: '⤴️',
        description: 'ビルドしたDockerイメージをレジストリにプッシュします。',
        type: 'command',
        requires: ['docker-image', 'registry-auth'],
        output: 'image-pushed'
    },
    'npm-lint': {
        id: 'npm-lint',
        name: 'npm lint',
        icon: '🧹',
        description: 'Lintを実行してコード規約違反を検出します。',
        type: 'command',
        requires: ['code', 'node_modules'],
        output: 'lint-results'
    },
    'cache-node': {
        id: 'cache-node',
        name: 'Cache deps',
        icon: '🧊',
        description: 'node_modulesをキャッシュしてインストールを高速化します。',
        type: 'utility',
        requires: ['env-node'],
        output: 'cached-node'
    },
    'coverage-upload': {
        id: 'coverage-upload',
        name: 'Upload Coverage',
        icon: '📈',
        description: 'テストカバレッジをアップロードします。',
        type: 'utility',
        requires: ['test-results'],
        output: 'coverage'
    },
    'matrix-test': {
        id: 'matrix-test',
        name: 'Matrix Test',
        icon: '🗂️',
        description: '複数環境でテストを並列実行します。',
        type: 'command',
        requires: ['code', 'node_modules'],
        output: 'matrix-results'
    },
    'security-scan': {
        id: 'security-scan',
        name: 'Security Scan',
        icon: '🔒',
        description: '脆弱性スキャンを実行します。',
        type: 'command',
        requires: ['code'],
        output: 'scan-report'
    },
    'deploy-staging': {
        id: 'deploy-staging',
        name: 'Deploy Staging',
        icon: '🚀',
        description: 'ステージング環境へデプロイします。',
        type: 'command',
        requires: ['build-artifacts'],
        output: 'staging'
    },
    'manual-approval': {
        id: 'manual-approval',
        name: 'Manual Approval',
        icon: '✅',
        description: '本番デプロイ前の手動承認ステップです。',
        type: 'utility',
        requires: ['build-artifacts'],
        output: 'approval-granted'
    },
    'deploy-production': {
        id: 'deploy-production',
        name: 'Deploy Production',
        icon: '🌐',
        description: '本番環境へデプロイします。',
        type: 'command',
        requires: ['build-artifacts', 'approval-granted'],
        output: 'production'
    },
    'reusable-workflow': {
        id: 'reusable-workflow',
        name: 'Call Reusable WF',
        icon: '♻️',
        description: '共通の再利用ワークフローを呼び出します。',
        type: 'command',
        requires: ['code'],
        output: 'reusable-run'
    },
    'concurrency-guard': {
        id: 'concurrency-guard',
        name: 'Concurrency Guard',
        icon: '⛔',
        description: '重複実行を防ぐための同時実行ガードです。',
        type: 'utility',
        requires: ['code'],
        output: 'guarded'
    },
    'notify-slack': {
        id: 'notify-slack',
        name: 'Notify Slack',
        icon: '🔔',
        description: '結果をSlackに通知します。',
        type: 'utility',
        requires: [],
        output: 'notified'
    },
    'setup-python': {
        id: 'setup-python',
        name: 'Setup Python',
        icon: '🐍',
        description: 'Python環境をセットアップします。',
        type: 'setup',
        requires: [],
        output: 'env-python'
    },
    'pip-install': {
        id: 'pip-install',
        name: 'pip install',
        icon: '📦',
        description: 'Python依存をインストールします。',
        type: 'command',
        requires: ['env-python'],
        output: 'py-deps'
    },
    'pytest': {
        id: 'pytest',
        name: 'pytest',
        icon: '🧪',
        description: 'Pythonテストを実行します。',
        type: 'command',
        requires: ['py-deps'],
        output: 'py-tests'
    }
};
