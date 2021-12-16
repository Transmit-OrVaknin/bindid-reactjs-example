while ! netstat -tna | grep 'LISTEN\>' | grep -q '3000'; do
  sleep 1 # time in seconds, tune it as needed
done
echo "React server is up & running"
