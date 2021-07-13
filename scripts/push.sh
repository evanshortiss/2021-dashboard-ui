#!/usr/bin/env bash

IMAGE_TAG=${IMAGE_TAG:-latest}
IMAGE_REPOSITORY=${IMAGE_REPOSITORY:-quay.io/evanshortiss/shipwars-replay-ui}

docker push ${IMAGE_REPOSITORY}:${IMAGE_TAG}
