FROM node
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install --no-optional
EXPOSE 3000
CMD ["npm", "start", "--force"]
