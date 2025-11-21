/**
 * Level Definitions
 * Defines the puzzles for each level.
 */

const LEVELS = [
    {
        id: 1,
        title: 'Hello Workflow',
        description: 'まずは基本から。ソースコードを取得してテストを実行しましょう。',
        slots: 2,
        availableBlocks: ['checkout', 'npm-test'],
        requiredBlocks: ['checkout', 'npm-test'], // 順序はGameロジックでチェック
        solution: ['checkout', 'npm-test'],
        hint: 'まずは `Checkout` でコードを持ってこないと何も始まりません。',
        explanation: 'GitHub Actionsでは、まずリポジトリからコードを取得する `Checkout` が必要です。その後に `Test` を実行することで、コードが正しく動作するかを確認できます。この順序が逆だと、テストするコードがないためエラーになります。'
    },
    {
        id: 2,
        title: 'Environment Setup',
        description: 'Node.jsのプロジェクトです。環境を作って依存関係を入れてからテストしましょう。',
        slots: 4,
        availableBlocks: ['checkout', 'npm-test', 'setup-node', 'npm-install'],
        requiredBlocks: ['checkout', 'setup-node', 'npm-install', 'npm-test'],
        solution: ['checkout', 'setup-node', 'npm-install', 'npm-test'],
        hint: '環境(Setup) -> 準備(Install) -> 実行(Test) の順序が大切です。',
        explanation: '実際の開発では、コードを実行するための環境（Node.jsなど）が必要です。`Setup Node` で環境を作り、`npm install` で必要なライブラリをインストールし、最後に `npm test` でテストを実行します。これがCIの基本的な流れです。'
    },
    {
        id: 3,
        title: 'Build & Release',
        description: 'テストが通ったらビルドして、成果物をアップロードしましょう。',
        slots: 5,
        availableBlocks: ['checkout', 'setup-node', 'npm-install', 'npm-test', 'npm-build', 'upload-artifact'],
        requiredBlocks: ['checkout', 'setup-node', 'npm-install', 'npm-build', 'upload-artifact'],
        solution: ['checkout', 'setup-node', 'npm-install', 'npm-build', 'upload-artifact'],
        hint: 'テストは必須ではありませんが、ビルドの前にテストを入れるのが良い習慣です（このレベルでは省略可）。',
        explanation: 'ビルド（`npm build`）によって生成されたファイル（アーティファクト）は、ジョブが終了すると消えてしまいます。`Upload Artifact` を使うことで、ビルド成果物を保存し、後でダウンロードしたりデプロイに使ったりできるようになります。'
    },
    // 追加のレベル案
    /*
    {
        id: 4,
        title: 'Docker Container',
        description: 'Dockerイメージを作ってみましょう。',
        slots: 2,
        availableBlocks: ['checkout', 'docker-build', 'npm-test'],
        solution: ['checkout', 'docker-build']
    }
    */
];
