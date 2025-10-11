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
