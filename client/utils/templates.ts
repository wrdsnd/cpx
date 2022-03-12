export const createTelegramMessage = ({
  id,
  username,
}: {
  id: string
  username: string
}) => `Twitter: [@${username}](https://twitter.com/${username}/status/${id})`
