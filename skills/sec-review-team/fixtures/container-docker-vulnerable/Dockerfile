# VULNERABILITY: base image pinned by tag only, not by digest — tag can be moved
FROM node:18

WORKDIR /app

# VULNERABILITY: ADD used instead of COPY — ADD can unpack tarballs and fetch URLs
ADD . /app

RUN npm install

# VULNERABILITY: secret values baked into image layer via ENV — visible in docker history
ENV SECRET_KEY=admin123
ENV DB_PASSWORD=prodpassword123

# VULNERABILITY: no USER instruction — container runs as root (uid 0)
EXPOSE 3000
CMD ["node", "server.js"]
