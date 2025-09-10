FROM node:18.19-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

RUN npm ci --only=production && npm cache clean --force

FROM base AS builder
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set runtime environment variables
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET=adminsecretorcapplication
ENV NEXT_PUBLIC_API_URL="https://api.rxpms.prohealium.com/api"
ENV NEXT_PUBLIC_MS_CLARITY_ID="pnmwnhdol7"
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-75Y3BYG07B"

RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]