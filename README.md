# 関西ビギナーズハッカソン vol3 VOICE

# 概要

## github 練習お試しゾーン

永野正剛です
hello World
kakuninn:kotaniryota
後藤充規(ごとうみつき)です。大学 1 年です。

# 環境構築

## front

### Next.js のインストール

1. `npx create-next-app@latest`
2. `npm i`
   What is your project named? my-app
   Would you like to use TypeScript? No / Yes
   Would you like to use ESLint? No / Yes
   Would you like to use Tailwind CSS? No / Yes
   Would you like to use `src/` directory? No / Yes
   Would you like to use App Router? (recommended) No / Yes
   Would you like to customize the default import alias (@/_)? No / Yes
   What import alias would you like configured? @/_
   ssh を設定後
3. `git clone git@github.com:K-Ryo-ta/kansai-beginers-hackathon-voice.git`
4. `npm i`
5. `npm run dev`

## tailwind について

- className 内に記述する

```TypeScript
{* 例 *}
<h1 className="{* プロパティ名 *}">hoge</h1>
```

## Branch strategy

- 機能開発: features-ブランチ名
- バグ修正: hotfix-ブランチ名, bug-ブランチ名

## Commit message

```shell
feat: 新しい機能
fix: バグの修正
docs: ドキュメントのみの変更
style: 空白、フォーマット、セミコロン追加など
refactor: 仕様に影響がないコード改善(リファクタ)
perf: パフォーマンス向上関連
test: テスト関連
chore: ビルド、補助ツール、ライブラリ関連
```

```shell
feat: 〇〇なため、△△を追加
ex) 記事の分類ができないため、タグ機能を追加
```

#　レビュー時の注意点

- PR に対して、レビューを行う際は、レビューを行うブランチを checkout してください。
