/**
 * Creates an indirect url to the tweet
 * @example https://twitter.com/twitter/status/123
 * @param id
 */
export function createTweetUrl(id: string) {
  /**
   * Twitter requires an author's name in a url
   * but doesn't care if this tweet belongs to the specified author.
   * So any author name (like for example "twitter") will work here
   */
  return `https://twitter.com/twitter/status/${id}`
}

export const parseTweetId = (url: string) => {
  const regExp =
    /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\?|\/.*)?$/
  const match = regExp.exec(url)
  if (match && match[2]) {
    return match[2]
  }
  return null
}
