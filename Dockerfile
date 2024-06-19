FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci  --legacy-peer-deps
COPY . /app
# RUN npm run dev
CMD [ "npm", "run", "dev" ]
# production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 9000
# CMD ["nginx", "-g", "daemon off;"]