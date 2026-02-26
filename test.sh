#!/bin/bash
npx tsx src/service/index.ts > server.log 2>&1 &
SERVER_PID=$!
sleep 2
curl -s -X POST -F "audio=@test/questions.csv;type=audio/webm" http://localhost:3001/api/transcribe
echo ""
kill $SERVER_PID
