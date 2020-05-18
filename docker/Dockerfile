FROM node:13

# node.js の環境変数を定義する
# 本番環境では production
ENV NODE_ENV=development

WORKDIR /usr/src/app2

# 雛形を生成するのに必要なパッケージのインストール
RUN npm install -g express-generator
RUN npm install
RUN npm install nodemon -g
RUN npm install morgan

# ポート3000番を開放する
EXPOSE 3000