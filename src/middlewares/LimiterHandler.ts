import rateLimiter from 'express-rate-limit'

const LimiterHandler = rateLimiter({
  limit: Number(process.env.REQ_LIMIT),
  windowMs: Number(process.env.REQ_MS),
  message: "You can't make any more request at the moment. Try again later."
})

export default LimiterHandler