# Natours JP - 日本各地の旅行ツアーを閲覧・購入できる Web アプリ

## 制作期間

2024 年 10 月～ 2025 年 1 月

## 制作背景

Udemy の Web 開発コースのプロジェクトである。日本各地のツアーを閲覧・購入できる Web アプリを開発し、詳細情報を表示することで、旅行ツアーの選択をより簡単にした。

さらに、購入後の体験共有を促進するため、主体的に機能拡張に取り組んだ。

## 概要

ユーザーは旅行ツアーを選択し、詳細情報を確認した上で購入することが可能だった。また、ログイン機能を備え、未ログイン状態ではツアーを購入できない仕様とし、決済システムに Stripe を統合することで、安全かつスムーズな支払いを実現した。

## 拡張機能概要

レビューシステムや動画アップロード機能を実装し、購入後のユーザー体験の共有を促進をした。

## 役割

フルスタック開発

## URL

- Web サイト: [https://natours-jp.vercel.app/](https://natours-jp.vercel.app/)
- Frontend GitHub: [vegetable-w/natours-jp-react](https://github.com/vegetable-w/natours-jp-react)
- Backend GitHub: [vegetable-w/natours-jp](https://github.com/vegetable-w/natours-jp)

---

## 課題

**ユーザーが購入後の体験を共有しやすくする仕組みが必要だった。**

- レビューシステムや動画アップロード機能を実装し、他のユーザーが購入前に参考にできるようにした。

**もともと Pug を使用したサーバーサイドレンダリングのフロントエンドだったため、開発の柔軟性と拡張性が制限されていた。**

- React を用いた SPA に移行し、API ベースの設計を採用することで、開発の柔軟性と拡張性を向上させた。

**大容量動画ファイルをアップロードする際、通信の安定性の問題が発生する可能性があった。**

- 分割アップロードと再開可能なアップロードを実装し、途中で接続が切れてもスムーズにアップロードを再開できるようにした。

---

## 工夫ポイント

**購入済みツアーにレビューを投稿できる機能を開発**

- Axios を使用してバックエンドと通信し、レビューをデータベースに保存した。

**動画アップロード機能を実装し、旅行の様子を共有可能**

- 再開可能なファイルアップロードのためのオープンプロトコル tus とメデイア向けクラウドストレージ Cloudinary を統合し、大容量動画のアップロードと管理を最適化した。

**ユーザーの利便性向上（レビューなどの表示）**

- 投稿されたレビューや動画はツアー詳細ページに表示され、他のユーザーが参考にできるようにした。
- 気に入ったツアーをお気に入り登録できる機能を追加し、React の Context API を活用してグローバルな状態を管理した。マイページから簡単にアクセスできるように実現した。

**データベースを設計・管理**

- 6 つの業務に対応するスキ一マを設計した。
- インデックスを最適化してクエリの高速化を実現した。

**統一的なエラーハンドリングの実装と非同期エラーハンドリングの最適化**

- AppError クラスを導入し、操作エラーと非操作エラーを区別して処理した。
- 非同期処理のエラーを自動的に next() に渡し、ミドルウェアで統一的に処理した。

---

## 機能

- **ツアー閲覧**: 日本各地の多彩なガイド付きツアーを、使いやすい UI で簡単に検索・閲覧可能。
- **セキュアなユーザー認証**: セキュアなバックエンド認証と接続されたログインページを提供。バックエンドサービスを利用した安全なログイン管理。
- **予約管理**: ユーザーアカウントからツアーの予約を確認可能。
- **お気に入り管理**: 気に入ったツアーをお気に入りリストに保存可能。
- **レビューシステム**: 体験したツアーに関するレビューを投稿可能。バックエンドから取得したレビューを表示可能。
- **動画アップロードシステム**: ユーザーが体験したツアーに関する動画をアップロードし、バックエンドから取得・表示可能。

---

## 🛠️ 使用技術

### フロントエンド

- **React**: UI 構築に使用。
- **Vite**: 高速な開発環境と最適化ビルド。
- **tus**: 動画アップロード処理に利用。

### バックエンド

- **Node.js**: 実行環境。
- **Express**: バックエンドフレームワーク。
- **MongoDB & Mongoose**: データベースおよびデータモデリング。
- **tus**: 動画アップロードを処理。
- **Cloudinary**: アップロードした動画の保存・管理。
- **Stripe**: 決済処理。

---
