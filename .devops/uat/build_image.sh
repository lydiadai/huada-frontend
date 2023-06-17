#!/bin/bash

mkdir workspace
cd ../..
tar zcvf  .devops/uat/workspace/release.tar  .
cd .devops/uat/workspace
tar zxvf release.tar
cp ../Dockerfile .
cp ../../common/nginx.conf .
rm -rf .git .github .gitignore .devops
docker login tcr-hroneportal-nonprod.tencentcloudcr.com --username 4611686018429680398 --password eyJhbGciOiJSUzI1NiIsImtpZCI6IjdETzI6M1k2RTpOSFFDOjZKQUM6UkdHMjpCUFNaOkY3VVU6RVBDVDpENlFTOllBNko6TEQyUjpJSkRCIn0.eyJvd25lclVpbiI6IjEwMDAxODU5OTE4NyIsIm9wZXJhdG9yVWluIjoiNDYxMTY4NjAxODQyOTY4MDM5OCIsInRva2VuSWQiOiJjOWVjNTFzcXE2b3RwdjJlaDk5MCIsImV4cCI6MTk2NTYwNjI3OSwibmJmIjoxNjUwMjQ2Mjc5LCJpYXQiOjE2NTAyNDYyNzl9.fnMoIFo4fS6fhHs7vLgzgqMGdY03S9Do91HlOKdrbuD5sVeykZJvBXiElNpY9YUv0H-NpreAZ1ppJHanx-R2E89CB8kUrGjqWuoLYrE91Kx5iIh5el6IZ-WrqTjcYXqzDpewpEaPSKhvHpQNZXei1PS7Ywf-kqqm0_1BeM8tCDpxsI0M6-7bG5gZF_07-13PCIAy9tuyYh_D6R4HYbj4XUjYXXTqxqmr5xX72f8XkzZRTalpUJats_cBVUFmf5Vh9e6c2POkcK_JErRKIiSTy2tGt7cEr6u_Trgb2c9wPP_aEtmxyFZNNjyE0Bi1d6NvD4RCTw2dIb1PAcXvFESILg
docker build . -t offer-tool-pc:latest
docker tag offer-tool-pc:latest tcr-hroneportal-nonprod.tencentcloudcr.com/smart_employee.hrportal/offer-tool-pc:latest
docker push tcr-hroneportal-nonprod.tencentcloudcr.com/smart_employee.hrportal/offer-tool-pc:latest
cd ..
rm -rf workspace
