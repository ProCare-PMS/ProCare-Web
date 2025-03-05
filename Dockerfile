# Build Stage
FROM node:18-alpine AS BUILD_IMAGE

WORKDIR /app

# Install dependencies (including dev dependencies)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the source code and build it
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine AS PRODUCTION_STAGE

WORKDIR /app

# Copy the necessary build files
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

# Install only production dependencies
# RUN npm install --production --legacy-peer-deps

# Set environment variables
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET=adminsecretorcapplication
ENV NEXT_PUBLIC_API_URL="https://api.rxpms.prohealium.com/api"
ENV NEXT_PUBLIC_MS_CLARITY_ID="pnmwnhdol7"
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-75Y3BYG07B"

EXPOSE 6325

CMD ["npm", "start"]