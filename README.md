# recursion_backendproject_5_team

Recursion のバックエンドプロジェクト 5 をチーム開発で行う。

## 開発環境・ツールバージョン

| ツール / ソフトウェア | バージョン | 備考                                  |
| --------------------- | ---------- | ------------------------------------- |
| PHP                   | 8.2.29     | FPM を使用                            |
| Composer              | 2.8.12     | PHP 用パッケージ管理ツール            |
| Laravel               | 12.31.1    | PHP フレームワーク                    |
| MySQL                 | 8.0        | データベース                          |
| Docker Desktop        | 3.4 以降   | docker, docker compose コマンドのため |

# ローカルでの実行手順

## 前提

- Docker desktop がインストールされていること
  - Docker compose は v2 以降であること

## .env ファイルを作成

- /.env.example をコピーして同一ディレクトリ内に.env として配置
  - docker-compose.yml で使う環境変数を定義

## 各コンテナをビルド

```
docker compose build
```

## 各コンテナを Detached mode で起動

```
docker compose up -d
```

## 初回のみ必要な手順

```
# Laravelコンテナ内のシェルに入る
docker exec -it app bash

# コンテナ内で
cp .env.example .env
php artisan key:generate
php artisan migrate
```

## ブラウザで確認

http://localhost:8000/

# よく使うコマンド

## コンテナ内のシェルを使いたいとき

```
docker exec -it {container_name} bash
```

## コンテナ内のログを確認したいとき

```
docker compose logs -f {container_name}
```

## コンテナのステータス確認

```
docker ps #起動中のコンテナを表示
docker ps -a #停止中のコンテナも含めて表示
```

## すべてのコンテナを停止

```
docker compose down
```

## ローカル開発用 Stripe 設定手順
### 1. Stripe アカウントの作成
- Stripe公式サイトにアクセス
- 無料で始める からアカウントを作成
- テストモードで利用することを確認

### 2. API キーの取得
- Stripe ダッシュボードにログイン
- 下メニューから　”開発者" → "概要"
- テストモードのキーを取得
  - Publishable Key: pk_test_...
  - Secret Key: sk_test_...

### 3. Webhook シークレットの取得
- Stripe ダッシュボード → "開発者" → "Webhook"
- 「エンドポイントを追加」
  - URL はローカルで ngrok などを使って作成
  →(例：{取得URL}/api/stripe/webhook)
  - イベントは必要なものだけ選択
  →(checkout.session.completed, checkout.session.expired)
- Webhook Secret (whsec_...) をコピー

### 4. ローカル .env ファイルの設定
プロジェクトのルートに .env を作成（または更新）し、以下を追加：
```bash
STRIPE_KEY=pk_test_あなたの公開キー
STRIPE_SECRET=sk_test_あなたの秘密キー
STRIPE_WEBHOOK_SECRET=whsec_あなたのWebhookシークレット
```
### 5. データベース初期化と Seeder 実行
各自の環境で以下を実行し、DB と Stripe のテストデータを同期：
```bash
docker compose exec app php artisan migrate:fresh --seed
```
### 6. Stripe 上での確認
- Stripe ダッシュボード → 商品 : Seeder に書いた stripe_product_id がテスト商品として存在するか確認

- 「価格」stripe_price_id が登録されているか確認

### 7. 注意事項
- 3のWebhook シークレットの取得はメーリング機能、購入履歴、シップメント機能などの動作に必要になります

- ngrokサーバーを立ち上げる毎にStripeダッシュボード上の"エンドポイントURL"の更新が必要です