FROM debian:stable-20200327-slim as BUILDER

ENV DENO_VERSION=1.0.1
ARG DEBIAN_FRONTEND=noninteractive
ENV DENO_DIR /opt/app
ENV DENO_EXEC /usr/bin/deno

RUN useradd -M --uid 1993 --user-group deno -s /sbin/nologin \
 && mkdir -p ${DENO_DIR} \
 && chown deno:deno ${DENO_DIR} \
 && apt-get -qq update \
 && apt-get -qq install -y --no-install-recommends curl ca-certificates unzip \
 && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
         --output deno.zip \
 && unzip deno.zip \
 && chmod 777 deno \
 && mv deno ${DENO_EXEC}

EXPOSE 3000

CMD ["/usr/bin/deno", "run", "--allow-net", "server.ts"]