# Build Stage
FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies (including dev dependencies)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the source code and build it
COPY . .
RUN npm run build  # Build only in the build stage

# Production Stage
FROM node:18-alpine AS prod

WORKDIR /app

# Copy the necessary build files from the build stage
COPY --from=base /app/package*.json ./
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET=adminsecretorcapplication
ENV NEXT_PUBLIC_API_URL="https://api.rxpms.prohealium.com/api"
ENV NEXT_PUBLIC_MS_CLARITY_ID="pnmwnhdol7"
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-75Y3BYG07B"

EXPOSE 6325

# Start the app
CMD ["npm", "start"]