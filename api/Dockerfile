# ベースイメージの指定
FROM python:3.9-slim

# 作業ディレクトリの設定
WORKDIR /app

# 必要なファイルをコピー
COPY requirements.txt .

# 依存パッケージのインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションのコードをコピー
COPY . .
RUN prisma generate
# ポートの公開
EXPOSE 8000

# サーバーの起動コマンド
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
