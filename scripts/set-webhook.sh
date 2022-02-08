#!/bin/bash
set -xeuo pipefail
curl "https://api.telegram.org/bot$BOT_TOKEN/setWebhook" -F "url=$BOT_HOOK" jq
