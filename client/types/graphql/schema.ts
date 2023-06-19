export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  ISO8601Date: any
  ISO8601DateTime: any
  ISO8601Time: any
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginResult = {
  __typename?: 'LoginResult'
  result: Scalars['Boolean']
}

export type LogoutResult = {
  __typename?: 'LogoutResult'
  result: Scalars['Boolean']
}

export type Media = {
  __typename?: 'Media'
  createdAt: Scalars['ISO8601DateTime']
  id: Scalars['String']
  post: Post
  type: MediaType
  url: Scalars['String']
}

export type MediaInput = {
  type: MediaType
  url: Scalars['String']
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export type Mutation = {
  __typename?: 'Mutation'
  login: LoginResult
  logout: LogoutResult
  removeFromQueue?: Maybe<Scalars['Boolean']>
  reschedule: Array<Maybe<Timeslot>>
  saveAsDraft: Post
  sendToQueue: Post
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRemoveFromQueueArgs = {
  id?: InputMaybe<Scalars['String']>
}

export type MutationRescheduleArgs = {
  input: RescheduleInput
}

export type MutationSaveAsDraftArgs = {
  input: SaveAsDraftInput
}

export type MutationSendToQueueArgs = {
  input: SendToQueueInput
}

export type News = {
  __typename?: 'News'
  id: Scalars['String']
  media: Array<TwitterMedia>
  message?: Maybe<Scalars['String']>
  user: TwitterUser
}

export type Post = {
  __typename?: 'Post'
  content: Scalars['String']
  createdAt?: Maybe<Scalars['ISO8601DateTime']>
  id: Scalars['String']
  isDraft: Scalars['Boolean']
  media: Array<Media>
  scheduledOn?: Maybe<Scalars['ISO8601Date']>
  sentAt?: Maybe<Scalars['ISO8601DateTime']>
  sourceId: Scalars['String']
  timeslot?: Maybe<Timeslot>
}

export type Query = {
  __typename?: 'Query'
  drafts?: Maybe<Array<Maybe<Post>>>
  feed?: Maybe<Array<Maybe<News>>>
  likes: Array<News>
  news?: Maybe<News>
  post: Post
  queue?: Maybe<Array<Maybe<Post>>>
  timeslots?: Maybe<Array<Maybe<Timeslot>>>
}

export type QueryNewsArgs = {
  id: Scalars['String']
}

export type QueryPostArgs = {
  id: Scalars['String']
}

export type RescheduleInput = {
  id: Scalars['String']
  scheduledOn: Scalars['ISO8601Date']
  timeslotId: Scalars['String']
}

export type SaveAsDraftInput = {
  id: Scalars['String']
}

export type SendToQueueInput = {
  author?: InputMaybe<Scalars['String']>
  isDraft?: InputMaybe<Scalars['Boolean']>
  media?: InputMaybe<Array<InputMaybe<MediaInput>>>
  scheduledOn?: InputMaybe<Scalars['ISO8601Date']>
  sourceId: Scalars['String']
  text?: InputMaybe<Scalars['String']>
  timeslotId?: InputMaybe<Scalars['String']>
}

export type Timeslot = {
  __typename?: 'Timeslot'
  id: Scalars['String']
  posts?: Maybe<Array<Post>>
  time: Scalars['ISO8601Time']
}

export type TimeslotPostsArgs = {
  date: Scalars['ISO8601Date']
}

export type TwitterMedia = {
  __typename?: 'TwitterMedia'
  type: MediaType
  url: Scalars['String']
}

export type TwitterUser = {
  __typename?: 'TwitterUser'
  name: Scalars['String']
}

export type GetDraftsQueryVariables = Exact<{ [key: string]: never }>

export type GetDraftsQuery = {
  __typename?: 'Query'
  drafts?: Array<{
    __typename?: 'Post'
    id: string
    createdAt?: any | null
    content: string
    sourceId: string
    media: Array<{
      __typename?: 'Media'
      id: string
      url: string
      type: MediaType
      createdAt: any
    }>
  } | null> | null
}

export type RemoveFromQueueMutationVariables = Exact<{
  id: Scalars['String']
}>

export type RemoveFromQueueMutation = {
  __typename?: 'Mutation'
  removeFromQueue?: boolean | null
}

export type GetPostQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetPostQuery = {
  __typename?: 'Query'
  news?: {
    __typename?: 'News'
    id: string
    media: Array<{ __typename?: 'TwitterMedia'; url: string; type: MediaType }>
    user: { __typename?: 'TwitterUser'; name: string }
  } | null
}

export type ReschedulePostFromDraftsInEditorMutationVariables = Exact<{
  input: RescheduleInput
  date: Scalars['ISO8601Date']
}>

export type ReschedulePostFromDraftsInEditorMutation = {
  __typename?: 'Mutation'
  reschedule: Array<{
    __typename?: 'Timeslot'
    id: string
    posts?: Array<{
      __typename?: 'Post'
      id: string
      scheduledOn?: any | null
      timeslot?: { __typename?: 'Timeslot'; id: string; time: any } | null
    }> | null
  } | null>
}

export type ReloadQueueAfterPostCreationQueryVariables = Exact<{
  date: Scalars['ISO8601Date']
}>

export type ReloadQueueAfterPostCreationQuery = {
  __typename?: 'Query'
  timeslots?: Array<{
    __typename?: 'Timeslot'
    id: string
    time: any
    posts?: Array<{
      __typename?: 'Post'
      id: string
      sentAt?: any | null
      sourceId: string
      createdAt?: any | null
      content: string
      media: Array<{
        __typename?: 'Media'
        id: string
        url: string
        createdAt: any
      }>
    }> | null
  } | null> | null
}

export type GetTimeslotsQueryVariables = Exact<{ [key: string]: never }>

export type GetTimeslotsQuery = {
  __typename?: 'Query'
  timeslots?: Array<{
    __typename?: 'Timeslot'
    id: string
    time: any
  } | null> | null
}

export type SendToQueueFromEditorMutationVariables = Exact<{
  input: SendToQueueInput
}>

export type SendToQueueFromEditorMutation = {
  __typename?: 'Mutation'
  sendToQueue: {
    __typename?: 'Post'
    id: string
    scheduledOn?: any | null
    isDraft: boolean
  }
}

export type PostModalDataFragment = {
  __typename?: 'Post'
  content: string
  media: Array<{
    __typename?: 'Media'
    id: string
    url: string
    type: MediaType
    createdAt: any
  }>
}

export type GetDataToRescheduleQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetDataToRescheduleQuery = {
  __typename?: 'Query'
  timeslots?: Array<{
    __typename?: 'Timeslot'
    id: string
    time: any
  } | null> | null
  post: {
    __typename?: 'Post'
    id: string
    scheduledOn?: any | null
    timeslot?: { __typename?: 'Timeslot'; id: string; time: any } | null
  }
}

export type ReschedulePostMutationVariables = Exact<{
  input: RescheduleInput
  date: Scalars['ISO8601Date']
  secondDate: Scalars['ISO8601Date']
}>

export type ReschedulePostMutation = {
  __typename?: 'Mutation'
  reschedule: Array<{
    __typename?: 'Timeslot'
    id: string
    currentDayPosts?: Array<{
      __typename?: 'Post'
      id: string
      scheduledOn?: any | null
      timeslot?: { __typename?: 'Timeslot'; id: string; time: any } | null
    }> | null
    anotherDayPosts?: Array<{
      __typename?: 'Post'
      id: string
      scheduledOn?: any | null
      timeslot?: { __typename?: 'Timeslot'; id: string; time: any } | null
    }> | null
  } | null>
}

export type ReschedulePostFromDraftsMutationVariables = Exact<{
  input: RescheduleInput
  date: Scalars['ISO8601Date']
}>

export type ReschedulePostFromDraftsMutation = {
  __typename?: 'Mutation'
  reschedule: Array<{
    __typename?: 'Timeslot'
    id: string
    posts?: Array<{
      __typename?: 'Post'
      id: string
      scheduledOn?: any | null
      timeslot?: { __typename?: 'Timeslot'; id: string; time: any } | null
    }> | null
  } | null>
}

export type GetQueueQueryVariables = Exact<{
  date: Scalars['ISO8601Date']
}>

export type GetQueueQuery = {
  __typename?: 'Query'
  timeslots?: Array<{
    __typename?: 'Timeslot'
    id: string
    time: any
    posts?: Array<{
      __typename?: 'Post'
      id: string
      sentAt?: any | null
      sourceId: string
      createdAt?: any | null
      scheduledOn?: any | null
      content: string
      timeslot?: { __typename?: 'Timeslot'; id: string; time: any } | null
      media: Array<{
        __typename?: 'Media'
        id: string
        url: string
        type: MediaType
        createdAt: any
      }>
    }> | null
  } | null> | null
}

export type ReschedulePostOnDropMutationVariables = Exact<{
  input: RescheduleInput
  date: Scalars['ISO8601Date']
}>

export type ReschedulePostOnDropMutation = {
  __typename?: 'Mutation'
  reschedule: Array<{
    __typename?: 'Timeslot'
    id: string
    currentDayPosts?: Array<{
      __typename?: 'Post'
      id: string
      scheduledOn?: any | null
      sentAt?: any | null
      timeslot?: { __typename?: 'Timeslot'; id: string; time: any } | null
    }> | null
  } | null>
}

export type MoveToDraftsFromQueueMutationVariables = Exact<{
  input: SaveAsDraftInput
}>

export type MoveToDraftsFromQueueMutation = {
  __typename?: 'Mutation'
  saveAsDraft: { __typename?: 'Post'; id: string }
}

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>

export type GetPostsQuery = {
  __typename?: 'Query'
  feed?: Array<{
    __typename?: 'News'
    id: string
    message?: string | null
    user: { __typename?: 'TwitterUser'; name: string }
    media: Array<{ __typename?: 'TwitterMedia'; url: string; type: MediaType }>
  } | null> | null
}

export type GetLikesQueryVariables = Exact<{ [key: string]: never }>

export type GetLikesQuery = {
  __typename?: 'Query'
  likes: Array<{
    __typename?: 'News'
    id: string
    message?: string | null
    user: { __typename?: 'TwitterUser'; name: string }
    media: Array<{ __typename?: 'TwitterMedia'; url: string; type: MediaType }>
  }>
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'LoginResult'; result: boolean }
}
