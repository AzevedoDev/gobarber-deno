FROM debian:stable-20200514-slim

ARG DENO_VERSION=1.0.3
ENV DENO_VERSION=${DENO_VERSION}
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get -qq update \
  && apt-get -qq install -y --no-install-recommends curl ca-certificates unzip \
  && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
  --output deno.zip \
  && unzip deno.zip \
  && rm deno.zip \
  && chmod +x deno \
  && mv deno /usr/bin/deno \
  && apt-get -qq remove --purge -y curl ca-certificates unzip \
  && apt-get -y -qq autoremove \
  && apt-get -qq clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && mkdir -p /opt/app 

ENV DENO_DIR /opt/app
ENV PORT 3000
EXPOSE ${PORT}

WORKDIR ${DENO_DIR}

CMD ["deno", "run", "-A", "server.ts"]