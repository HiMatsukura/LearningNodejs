FROM node:13

# node.js �̊��ϐ����`����
# �{�Ԋ��ł� production
ENV NODE_ENV=development

WORKDIR /usr/src/app2

# ���`�𐶐�����̂ɕK�v�ȃp�b�P�[�W�̃C���X�g�[��
# package-lock.json������Εs�v�����A�O�̂���
RUN npm install
RUN npm install express
RUN npm install nodemon -g
RUN npm install morgan
RUN npm install body-parser
RUN npm install ejs
RUN npm install connect method-override
RUN npm install cookie-parser express-session csurf

# �|�[�g3000�Ԃ��J������
EXPOSE 3000