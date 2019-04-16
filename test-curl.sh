curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "trigger":"1 minute from now", "run": [{"type":"api_callback", "uri": "https://localhost:4000/webhook", "payload": { "hello": "world" }}]}' \
  localhost:8080/api/v1/trigger
