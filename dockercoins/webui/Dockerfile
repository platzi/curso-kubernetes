FROM node:14
RUN npm install express
RUN npm install redis@2.8.0
COPY files/ /files/
COPY webui.js /
CMD ["node", "webui.js"]
EXPOSE 80
