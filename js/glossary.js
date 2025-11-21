/**
 * Glossary Data
 * Terms and definitions for GitHub Actions.
 */

const GLOSSARY = [
    {
        term: 'GitHub Actions',
        definition: 'GitHubが提供するCI/CD（継続的インテグレーション/継続的デリバリー）プラットフォーム。コードの変更をトリガーにして、ビルド、テスト、デプロイなどのワークフローを自動化できます。'
    },
    {
        term: 'Workflow',
        definition: '1つ以上のジョブで構成される自動化されたプロセス。YAMLファイルとして `.github/workflows` ディレクトリに定義します。'
    },
    {
        term: 'Job',
        definition: 'ワークフロー内で実行される一連のステップ。デフォルトでは並列に実行されますが、依存関係を定義して順序付けることも可能です。'
    },
    {
        term: 'Step',
        definition: 'ジョブの中で実行される個々のタスク。シェルコマンドの実行や、Actionの使用が含まれます。'
    },
    {
        term: 'Action',
        definition: '頻繁に繰り返されるタスクを実行するためのカスタムアプリケーション。GitHub Marketplaceで公開されているものや、自分で作成したものを使用できます（例: `actions/checkout`）。'
    },
    {
        term: 'Runner',
        definition: 'ワークフローが実行されるサーバー。GitHubがホストするランナー（Ubuntu, Windows, macOS）や、自分でホストするセルフホストランナーがあります。'
    },
    {
        term: 'Event',
        definition: 'ワークフローの実行をトリガーする特定のアクティビティ。`push`（プッシュ時）、`pull_request`（プルリクエスト作成時）、`schedule`（定期実行）などがあります。'
    },
    {
        term: 'Artifact',
        definition: 'ワークフローの実行中に生成されるファイル（ビルド成果物やテスト結果など）。ジョブ間でデータを共有したり、実行後にダウンロードしたりするために使用します。'
    },
    {
        term: 'CI (Continuous Integration)',
        definition: '継続的インテグレーション。コードの変更を頻繁にメインブランチに統合し、その都度自動ビルドとテストを行う開発手法。'
    },
    {
        term: 'CD (Continuous Delivery)',
        definition: '継続的デリバリー。CIを通過したコードを、自動的に本番環境やステージング環境にデプロイ（またはデプロイ可能な状態に）する手法。'
    }
];
