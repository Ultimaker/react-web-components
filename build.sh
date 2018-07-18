#!/usr/bin/env bash
# Copyright (c) 2018 Ultimaker B.V.

docker build --tag rwc .
docker run --detach \
    --publish 9001:9001 \
    --volume $PWD:/usr/src/app \
    rwc
echo "Storybook: http://172.17.0.1:9001"
