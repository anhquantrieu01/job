import { redis } from "./redis"

export async function getCache(key:string){

  return await redis.get(key)

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setCache(key:string,data:any,ttl=60){

  await redis.set(key,data,{ex:ttl})

}