#!/bin/bash
# Remove posible files in folder
rm -rf ./SSLCertificates
# Create Folder and Files Structure
mkdir SSLCertificates
cp ./openssl.cnf ./SSLCertificates/ 
mkdir SSLCertificates/demoCA
mkdir SSLCertificates/demoCA/certs
mkdir SSLCertificates/demoCA/crl
mkdir SSLCertificates/demoCA/newcerts
mkdir SSLCertificates/demoCA/private
touch SSLCertificates/demoCA/index.txt
echo -n '01' > SSLCertificates/demoCA/serial

# Generate Certification Authority Key
openssl genrsa -des3 -passout pass:ulima2020 -out ./SSLCertificates/demoCA/private/ca.key 1024
echo "***************************************"
echo "Certification Authority's Key Generated"
echo "***************************************"
# Generate auto-sign Certification Authority certificate
openssl req -new -x509 -days 365 -key ./SSLCertificates/demoCA/private/ca.key -passin pass:ulima2020 -out ./SSLCertificates/demoCA/ca.crt -subj "/C=PE/ST=Lima/L=Lima/O=Universidad de Lima/OU=Ingenieria de Sistemas/CN=Diego Garcia/emailAddress=garcia.diego1197@gmail.com"
echo "***********************************************"
echo "Certification Authority's Certificate Generated"
echo "***********************************************"
# Generate Server (Requester) keys
openssl genrsa -des3 -passout pass:ciberseguridad20202 -out ./SSLCertificates/server.key 1024
echo "*************************"
echo "Servers's Key Generated"
echo "*************************"
# Generate Certification Sign Request
openssl req -new -key ./SSLCertificates/server.key -passin pass:ciberseguridad20202 -out ./SSLCertificates/server.csr -subj "/C=PE/ST=Lima/L=Lima/O=Universidad de Lima/OU=Ing de Sistemas/CN=Diego Garcia/emailAddress=garcia.diego1197@gmail.com"
echo "****************************************"
echo "Servers's Certificate Request Generated"
echo "****************************************"
openssl ca -batch -passin pass:ulima2020 -out ./SSLCertificates/demoCA/newcerts/server.crt -config ./SSLCertificates/openssl.cnf -infiles ./SSLCertificates/server.csr
echo "*************************************************************"
echo "Servers's Certificate Request Signed and Certificate Generated"
echo "*************************************************************"