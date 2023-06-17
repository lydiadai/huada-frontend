#!/bin/bash

mkdir workspace
cd ../..
tar zcvf  .devops/dev/workspace/release.tar  .
cd .devops/dev/workspace
tar zxvf release.tar
rm -rf .git .github .gitignore
cp ../Dockerfile .
cp ../../common/nginx.conf .
docker login ccr.ccs.tencentyun.com --username=100022108197 -p Info@201611
docker build . -t offer-tool-pc:latest
docker tag offer-tool-pc:latest ccr.ccs.tencentyun.com/offer_tool/web:latest
docker push ccr.ccs.tencentyun.com/offer_tool/web:latest
cd ..
rm -rf workspace

