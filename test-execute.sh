curl --header "Content-Type: application/json" \
  --request POST \
  --data '[{"type":"api_callback", "uri": "http://localhost:8080/echo", "payload": { "hello": "world" }}]' \
  localhost:8080/api/v1/execute
