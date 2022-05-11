export const createTweetUrl = ({
  id,
  username,
}: {
  id: string
  username: string
}) => `https://twitter.com/${username}/status/${id}`

export const parseTweetId = (url: string) => {
  const regExp =
    /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\?|\/.*)?$/
  const match = regExp.exec(url)
  if (match && match[2]) {
    return match[2]
  }
  return null
}
