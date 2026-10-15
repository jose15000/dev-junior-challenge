FROM node:22-alpine

WORKDIR /app

# Install dependencies required by Prisma engine on Alpine
RUN apk add --no-cache openssl libc6-compat

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Allow lifecycle scripts in non-interactive CI/Docker environment
RUN pnpm config set strict-dep-builds false

# Copy package, lockfile and config first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml .npmrc* ./
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
RUN pnpm prisma:generate

# Copy source code and config
COPY . .

# Build NestJS app
RUN pnpm build

EXPOSE 3000

# Run pending migrations and start production server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
