#!/bin/sh
source .env
#stitch-cli login --api-key=$STITCH_API_PUBLIC_KEY --private-api-key=$STITCH_API_PRIVATE_KEY

# change the value of --app-id=zerotolive-njchv
stitch-cli import \
  --app-id=$STITCH_APP_ID \
  --include-hosting
 
