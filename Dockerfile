FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first (so Docker can cache it effectively)
COPY package*.json ./

# Install all dependencies including dev dependencies
RUN npm install --legacy-peer-deps

# Copy the source code into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Set environment variables for production
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET=adminsecretorcapplication
ENV NEXT_PUBLIC_API_URL="https://api.rxpms.prohealium.com/api"
ENV NEXT_PUBLIC_MS_CLARITY_ID="pnmwnhdol7"
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-75Y3BYG07B"

# Expose the port for the app
EXPOSE 6325

# Start the app in production mode
CMD ["npm", "start"]