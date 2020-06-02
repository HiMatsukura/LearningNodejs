FROM node:13

# node.js の環境変数を定義する
# 本番環境では production
ENV NODE_ENV=development

WORKDIR /usr/src/app2

# 雛形を生成するのに必要なパッケージのインストール
# package-lock.jsonがあれば不要だが、念のため
RUN npm install
RUN npm install express
RUN npm install express-generator
RUN npm install nodemon -g
RUN npm install morgan
RUN npm install body-parser
RUN npm install ejs
RUN npm install connect method-override
RUN npm install cookie-parser express-session csurf
RUN npm install twitter
RUN npm install fs

# ポート3000番を開放する
EXPOSE 3000