const MAX_RECONNECT_RETRIES = 10

function retryStrategy(times, reason) {
  if (times > MAX_RECONNECT_RETRIES) {
    console.log("Too many reconnection attempts. Stopping.");
    return null;
  }
  const delay = Math.min(times * 100, 2000);
  return delay;
}

module.exports = retryStrategy