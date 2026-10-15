/** Redis-ready caching stub. */
export const redisConfig = {
  enabled: Boolean(process.env.REDIS_URL),
  url: process.env.REDIS_URL || '',
};

export async function getCache(_key: string): Promise<string | null> {
  return null;
}

export async function setCache(_key: string, _value: string, _ttlSeconds?: number): Promise<void> {
  // Wire ioredis / redis client when REDIS_URL is set.
}
