# syntax=docker/dockerfile:1

FROM golang:1.20-bullseye
RUN apt-get update && apt-get install -y jq
EXPOSE 26656 26657 1317 9090
COPY --from=app . /opt/cardex
RUN cd /opt/cardex && make install-test-binary
WORKDIR /opt/cardex

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD \
  curl -f http://127.0.0.1:1317/blocks/1 >/dev/null 2>&1 || exit 1

CMD bash /opt/cardex/network/init.sh && \
  bash /opt/cardex/network/init-cardexd.sh && \
  bash /opt/cardex/network/start.sh