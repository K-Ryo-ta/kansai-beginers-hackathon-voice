# ベースイメージの指定
FROM python:3.9-slim

# 作業ディレクトリの設定
WORKDIR /app

# 必要なファイルをコピー
COPY requirements.txt .

# 依存パッケージのインストール
RUN pip install --no-cache-dir -r requirements.txt
# アプリケーションのコードをコピー
# COPY . .
# ポートの公開
EXPOSE 8000

# apiディレクトリ 絶対パス
# /Users/mitsuki/Documents/hackathon/2024/dev/kansai-beginers-hackathon-voice/api

# dockerファイル 絶対パス
# /Users/mitsuki/Documents/hackathon/2024/dev/kansai-beginers-hackathon-voice/api/Dockerfile

# サーバーの起動コマンド
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]
