FROM nginx:alpine
RUN apk add -U bash
COPY default.conf /etc/nginx/conf.d/
COPY dist /usr/share/nginx/html