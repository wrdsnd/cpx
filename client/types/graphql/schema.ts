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

export type Image = {
  __typename?: 'Image'
  src: Scalars['String']
}

export type MediaInput = {
  src: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  removeFromQueue?: Maybe<Scalars['Boolean']>
  reschedule: Array<Maybe<Timeslot>>
  saveAsDraft: Post
  sendToQueue: Post
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
  images: Array<Image>
  inQueue: Scalars['Boolean']
  message?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

export type Post = {
  __typename?: 'Post'
  createdAt?: Maybe<Scalars['ISO8601DateTime']>
  id: Scalars['String']
  isDraft: Scalars['Boolean']
  scheduledOn?: Maybe<Scalars['ISO8601Date']>
  sentAt?: Maybe<Scalars['ISO8601DateTime']>
  sourceId: Scalars['String']
  sourceMeta?: Maybe<SourceMeta>
  timeslot?: Maybe<Timeslot>
}

export type Query = {
  __typename?: 'Query'
  drafts?: Maybe<Array<Maybe<Post>>>
  feed?: Maybe<Array<Maybe<News>>>
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

export type SourceMeta = {
  __typename?: 'SourceMeta'
  author: Scalars['String']
  id: Scalars['String']
  media?: Maybe<Array<Maybe<Image>>>
  text?: Maybe<Scalars['String']>
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

export type User = {
  __typename?: 'User'
  name: Scalars['String']
}

export type GetDraftsForEditorQueryVariables = Exact<{ [key: string]: never }>

export type GetDraftsForEditorQuery = {
  __typename?: 'Query'
  drafts?: Array<{
    __typename?: 'Post'
    id: string
    createdAt?: any | null
    sourceMeta?: {
      __typename?: 'SourceMeta'
      id: string
      text?: string | null
      media?: Array<{ __typename?: 'Image'; src: string } | null> | null
    } | null
  } | null> | null
}

export type GetPostQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetPostQuery = {
  __typename?: 'Query'
  news?: {
    __typename?: 'News'
    id: string
    inQueue: boolean
    images: Array<{ __typename?: 'Image'; src: string }>
    user?: { __typename?: 'User'; name: string } | null
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
      sourceMeta?: {
        __typename?: 'SourceMeta'
        text?: string | null
        id: string
        media?: Array<{ __typename?: 'Image'; src: string } | null> | null
      } | null
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

export type PostMediaFragment = {
  __typename?: 'SourceMeta'
  id: string
  text?: string | null
  media?: Array<{ __typename?: 'Image'; src: string } | null> | null
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
      timeslot?: { __typename?: 'Timeslot'; id: string; time: any } | null
      sourceMeta?: {
        __typename?: 'SourceMeta'
        id: string
        text?: string | null
        media?: Array<{ __typename?: 'Image'; src: string } | null> | null
      } | null
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

export type GetDraftsQueryVariables = Exact<{ [key: string]: never }>

export type GetDraftsQuery = {
  __typename?: 'Query'
  drafts?: Array<{
    __typename?: 'Post'
    id: string
    createdAt?: any | null
    sourceMeta?: {
      __typename?: 'SourceMeta'
      id: string
      text?: string | null
      media?: Array<{ __typename?: 'Image'; src: string } | null> | null
    } | null
  } | null> | null
}

export type RemoveFromQueueMutationVariables = Exact<{
  id: Scalars['String']
}>

export type RemoveFromQueueMutation = {
  __typename?: 'Mutation'
  removeFromQueue?: boolean | null
}

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>

export type GetPostsQuery = {
  __typename?: 'Query'
  feed?: Array<{
    __typename?: 'News'
    id: string
    inQueue: boolean
    message?: string | null
    user?: { __typename?: 'User'; name: string } | null
    images: Array<{ __typename?: 'Image'; src: string }>
  } | null> | null
}
