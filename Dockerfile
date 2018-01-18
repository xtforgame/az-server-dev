FROM node:7-onbuild

RUN mkdir -p /usr/volumes/src /usr/volumes/share /usr/volumes/output
VOLUME ["/usr/volumes/src", "/usr/volumes/share", "/usr/volumes/output"]

COPY docker-cmd.sh /usr/src/app/

EXPOSE 80 443
