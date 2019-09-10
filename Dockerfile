# build stage
FROM node:10.15.0-alpine as build-stage
ENV NODE_ENV=dev
COPY package.json package-lock.json ./
RUN npm i && mkdir /app && mv ./node_modules ./app
RUN npm i -g @angular/cli
WORKDIR /app
COPY . .
RUN ./node_modules/@angular/cli/bin/ng build --prod 

FROM nginx:1.14.0-alpine as production-stage

# Copy the respective nginx configuration files
COPY nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist/GIZ-WEB /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

