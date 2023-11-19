FROM nginx:alpine as base

WORKDIR /etc/nginx

FROM base as rundler-proxy
WORKDIR /etc/nginx
COPY ./nginx.rundler-proxy.conf ./conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]

FROM base as anvil-proxy
WORKDIR /etc/nginx
COPY ./nginx.anvil-proxy.conf ./conf.d/default.conf
EXPOSE 81
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]