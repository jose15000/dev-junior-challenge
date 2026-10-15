FROM node:22-alpine

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Allow lifecycle scripts in non-interactive CI/Docker environment
RUN pnpm config set strict-dep-builds false

# Build-time environment variable for Next.js browser client
ARG NEXT_PUBLIC_API_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV PORT=5173

COPY package.json pnpm-lock.yaml .npmrc* ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 5173

CMD ["pnpm", "start"]
