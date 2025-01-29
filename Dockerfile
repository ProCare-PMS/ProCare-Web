# FROM node:18-alpine

# WORKDIR /app
# COPY package.json package-lock.json /app/
# RUN npm ci  --legacy-peer-deps
# COPY . /app
# # RUN npm run dev
# # CMD [ "npm", "run", "dev" ]
# # production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 9000
# CMD ["nginx", "-g", "daemon off;"]


# Build Stage
FROM node:18-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build


# Production Stage
FROM node:18-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET=adminsecretorcapplication
ENV NEXT_PUBLIC_API_URL = "https://procare-backend.onrender.com/api"
ENV NEXT_PUBLIC_MS_CLARITY_ID = "pnmwnhdol7"
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = "G-75Y3BYG07B"
EXPOSE 6325
CMD ["npm", "start"]