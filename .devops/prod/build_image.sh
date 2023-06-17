#!/bin/bash

mkdir workspace
cd ../..
tar zcvf  .devops/prod/workspace/release.tar  .
cd .devops/prod/workspace
tar zxvf release.tar
cp ../Dockerfile .
cp ../dockerignore .
cp ../../common/nginx.conf .
rm -rf .git .github .gitignore .devops
docker login tcr-hroneportal-prod.tencentcloudcr.com --username 4611686018429613089 --password eyJhbGciOiJSUzI1NiIsImtpZCI6IjRDR1E6Mko0NDpSTkszOkxNTVo6T0VXWDpVRkM2Ok1EWUo6SFBDVDpGNVVIOlNVQVQ6UzVWQzpGTENEIn0.eyJvd25lclVpbiI6IjEwMDAxODI3ODg5MCIsIm9wZXJhdG9yVWluIjoiNDYxMTY4NjAxODQyOTYxMzA4OSIsInRva2VuSWQiOiJjOWVjc3BqM2s2NTBhbHBqczB1ZyIsImV4cCI6MTk2NTYwOTMxOCwibmJmIjoxNjUwMjQ5MzE4LCJpYXQiOjE2NTAyNDkzMTh9.N5hAxJIrIrtyhUcQpCK5Vv5LpDIX5mX4QpM5J_wUGA2RU0eA8OsZMonrWkFFAxqoNC57QVX05SHG78Jip6Sbnmc5AMCis7eqKwhYFxnxlJP6TzPA6mnLgl9ZMfDnDet5bXtxU5DtXlAAea9jBLsggy-3j73hJpZ11f3AFfAcU3P2w-zoK-W0yJ7MplP6FH_zjJHT5rqk2Xop_WsZ5kvKJ2v9nmg2VSAG8J2l5D3hJtv1qTsrgmcFRU-E5eUsErnN2I2gA6jS4uq2gcAWNJh1xeNiUrF4JuEzgmElAhpK4U4Bf-fGjaFUZKl3L_Lvfh6kI-imqwP1dcih0O6dXxeMlg
docker build . -t offer-tool-pc:latest
docker tag offer-tool-pc:latest tcr-hroneportal-prod.tencentcloudcr.com/smart_employee.hrportal/offer-tool-pc:latest
docker push tcr-hroneportal-prod.tencentcloudcr.com/smart_employee.hrportal/offer-tool-pc:latest
cd ..
rm -rf workspace
