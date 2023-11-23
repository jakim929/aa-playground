FROM nginx:alpine as proxy-base

WORKDIR /etc/nginx

FROM proxy-base as anvil-cors-proxy
WORKDIR /etc/nginx
COPY ./nginx.anvil-proxy.conf ./conf.d/default.conf
EXPOSE 81
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]

FROM proxy-base as bundler-reverse-proxy
WORKDIR /etc/nginx
COPY ./nginx.reverse-proxy.conf ./conf.d/default.conf
EXPOSE 81
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]

FROM ghcr.io/foundry-rs/foundry as anvil-setup
RUN apk add --no-cache bash
WORKDIR /app
COPY ./packages/contracts ./
RUN forge build

ENTRYPOINT ["/bin/bash", "deploy_predeploys_and_contracts.sh"]