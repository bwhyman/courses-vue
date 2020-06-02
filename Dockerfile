FROM nginx:latest
COPY mysite.template /etc/nginx/conf.d/mysite.template dist/ /usr/share/nginx/html/
ENTRYPOINT /bin/bash -c "envsubst < /etc/nginx/conf.d/mysite.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
