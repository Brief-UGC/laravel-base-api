FROM ubuntu:24.04

LABEL maintainer="Taylor Otwell"

ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID:-laravel}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY:-password}
ENV AWS_REGION=${AWS_DEFAULT_REGION:-ap-southeast-1}

ARG NODE_VERSION=22
ARG MYSQL_CLIENT="mysql-client"

WORKDIR /var/www/html

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN echo "Acquire::http::Pipeline-Depth 0;" > /etc/apt/apt.conf.d/99custom && \
    echo "Acquire::http::No-Cache true;" >> /etc/apt/apt.conf.d/99custom && \
    echo "Acquire::BrokenProxy    true;" >> /etc/apt/apt.conf.d/99custom

RUN apt-get update && apt-get upgrade -y \
    && mkdir -p /etc/apt/keyrings \
    && apt-get install -y gnupg gosu curl ca-certificates zip unzip git supervisor sqlite3 libcap2-bin libpng-dev python3 dnsutils librsvg2-bin fswatch ffmpeg nano  \
    && curl -sS 'https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xb8dc7e53946656efbce4c1dd71daeaab4ad4cab6' | gpg --dearmor | tee /etc/apt/keyrings/ppa_ondrej_php.gpg > /dev/null \
    && echo "deb [signed-by=/etc/apt/keyrings/ppa_ondrej_php.gpg] https://ppa.launchpadcontent.net/ondrej/php/ubuntu noble main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
    && apt-get update -y \
    && apt-get install -y nginx php8.4-cli php8.4-fpm php8.4-dev \
       php8.4-sqlite3 php8.4-gd \
       php8.4-curl php8.4-mongodb \
       php8.4-imap php8.4-mysql php8.4-mbstring \
       php8.4-xml php8.4-zip php8.4-bcmath php8.4-soap \
       php8.4-intl php8.4-readline \
       php8.4-ldap \
       php8.4-msgpack php8.4-igbinary php8.4-redis \
       php8.4-memcached php8.4-pcov php8.4-imagick php8.4-xdebug \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_VERSION.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update -y \
    && apt-get install -y nodejs \
    && npm install -g npm \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /etc/apt/keyrings/yarn.gpg >/dev/null \
    && echo "deb [signed-by=/etc/apt/keyrings/yarn.gpg] https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-get update -y \
    && apt-get install -y yarn \
    && apt-get install -y $MYSQL_CLIENT

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY --from=amazon/aws-cli /usr/local/aws-cli/ /usr/local/aws-cli/
COPY --from=minio/mc:latest /usr/bin/mc /usr/bin/mc
RUN ln -s /usr/local/aws-cli/v2/current/bin/aws /usr/local/bin/

RUN apt-get -y autoremove \
&& apt-get -y clean \
&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN setcap "cap_net_bind_service=+ep" /usr/bin/php8.4

RUN userdel -r ubuntu
RUN groupadd --force -g 1000 laravel
RUN useradd -ms /bin/bash --no-user-group -g 1000 -u 1000 laravel

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY fpm-pool.conf /etc/php/8.4/fpm/pool.d/www.conf
COPY php.ini /etc/php/8.4/fpm/conf.d/99-php.ini
COPY xdebug.ini /etc/php/8.4/cli/conf.d/20-xdebug.ini

RUN mkdir -p /var/www/html && \
    mkdir -p /var/log/php && \
    mkdir -p /var/log/supervisor && \
    mkdir -p /tmp/laravel/storage/framework/views

RUN chown -R laravel:laravel /var/www/html && \
    chown -R laravel:laravel /run && \
    chown -R laravel:laravel /var/lib/nginx && \
    chown -R laravel:laravel /var/log/nginx && \
    chown -R laravel:laravel /var/log/php && \
    chown -R laravel:laravel /tmp/laravel/storage/framework/views

WORKDIR /var/www/html

EXPOSE 80

CMD [ "/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf" ]

