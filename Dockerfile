FROM node:14.16.0-alpine

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json ./
EXPOSE 8000

CMD ["npm", "start"]