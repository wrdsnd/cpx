export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
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
  sendToQueue: Post
  removeFromQueue?: Maybe<Scalars['Boolean']>
  reschedule: Array<Maybe<Timeslot>>
  saveAsDraft: Post
}

export type MutationSendToQueueArgs = {
  input: SendToQueueInput
}

export type MutationRemoveFromQueueArgs = {
  id?: Maybe<Scalars['String']>
}

export type MutationRescheduleArgs = {
  input: RescheduleInput
}

export type MutationSaveAsDraftArgs = {
  input: SaveAsDraftInput
}

export type News = {
  __typename?: 'News'
  id: Scalars['String']
  inQueue: Scalars['Boolean']
  message?: Maybe<Scalars['String']>
  user?: Maybe<User>
  images: Array<Image>
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['String']
  sentAt?: Maybe<Scalars['ISO8601DateTime']>
  sourceId: Scalars['String']
  createdAt?: Maybe<Scalars['ISO8601DateTime']>
  sourceMeta?: Maybe<SourceMeta>
  timeslot?: Maybe<Timeslot>
  isDraft: Scalars['Boolean']
  scheduledOn?: Maybe<Scalars['ISO8601Date']>
}

export type Query = {
  __typename?: 'Query'
  feed?: Maybe<Array<Maybe<News>>>
  news?: Maybe<News>
  post: Post
  queue?: Maybe<Array<Maybe<Post>>>
  drafts?: Maybe<Array<Maybe<Post>>>
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
  sourceId: Scalars['String']
  text?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
  media?: Maybe<Array<Maybe<MediaInput>>>
  isDraft?: Maybe<Scalars['Boolean']>
  timeslotId?: Maybe<Scalars['String']>
  scheduledOn?: Maybe<Scalars['ISO8601Date']>
}

export type SourceMeta = {
  __typename?: 'SourceMeta'
  id: Scalars['String']
  author: Scalars['String']
  text?: Maybe<Scalars['String']>
  media?: Maybe<Array<Maybe<Image>>>
}

export type Timeslot = {
  __typename?: 'Timeslot'
  id: Scalars['String']
  time: Scalars['ISO8601Time']
  posts?: Maybe<Array<Post>>
}

export type TimeslotPostsArgs = {
  date: Scalars['ISO8601Date']
}

export type User = {
  __typename?: 'User'
  name: Scalars['String']
}

export type GetPostQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetPostQuery = {
  __typename?: 'Query'
  news?: Maybe<{
    __typename?: 'News'
    id: string
    inQueue: boolean
    images: Array<{ __typename?: 'Image'; src: string }>
    user?: Maybe<{ __typename?: 'User'; name: string }>
  }>
}

export type ReloadQueueAfterPostCreationQueryVariables = Exact<{
  date: Scalars['ISO8601Date']
}>

export type ReloadQueueAfterPostCreationQuery = {
  __typename?: 'Query'
  timeslots?: Maybe<
    Array<
      Maybe<{
        __typename?: 'Timeslot'
        id: string
        time: any
        posts?: Maybe<
          Array<{
            __typename?: 'Post'
            id: string
            sentAt?: Maybe<any>
            sourceId: string
            createdAt?: Maybe<any>
            sourceMeta?: Maybe<{
              __typename?: 'SourceMeta'
              text?: Maybe<string>
              id: string
              media?: Maybe<Array<Maybe<{ __typename?: 'Image'; src: string }>>>
            }>
          }>
        >
      }>
    >
  >
}

export type GetTimeslotsQueryVariables = Exact<{ [key: string]: never }>

export type GetTimeslotsQuery = {
  __typename?: 'Query'
  timeslots?: Maybe<
    Array<Maybe<{ __typename?: 'Timeslot'; id: string; time: any }>>
  >
}

export type SendToQueueFromEditorMutationVariables = Exact<{
  input: SendToQueueInput
}>

export type SendToQueueFromEditorMutation = {
  __typename?: 'Mutation'
  sendToQueue: {
    __typename?: 'Post'
    id: string
    scheduledOn?: Maybe<any>
    isDraft: boolean
  }
}

export type PostMediaFragment = {
  __typename?: 'SourceMeta'
  id: string
  text?: Maybe<string>
  media?: Maybe<Array<Maybe<{ __typename?: 'Image'; src: string }>>>
}

export type GetDataToRescheduleQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetDataToRescheduleQuery = {
  __typename?: 'Query'
  timeslots?: Maybe<
    Array<Maybe<{ __typename?: 'Timeslot'; id: string; time: any }>>
  >
  post: {
    __typename?: 'Post'
    id: string
    scheduledOn?: Maybe<any>
    timeslot?: Maybe<{ __typename?: 'Timeslot'; id: string; time: any }>
  }
}

export type ReschedulePostMutationVariables = Exact<{
  input: RescheduleInput
  date: Scalars['ISO8601Date']
  secondDate: Scalars['ISO8601Date']
}>

export type ReschedulePostMutation = {
  __typename?: 'Mutation'
  reschedule: Array<
    Maybe<{
      __typename?: 'Timeslot'
      id: string
      currentDayPosts?: Maybe<
        Array<{
          __typename?: 'Post'
          id: string
          scheduledOn?: Maybe<any>
          timeslot?: Maybe<{ __typename?: 'Timeslot'; id: string; time: any }>
        }>
      >
      anotherDayPosts?: Maybe<
        Array<{
          __typename?: 'Post'
          id: string
          scheduledOn?: Maybe<any>
          timeslot?: Maybe<{ __typename?: 'Timeslot'; id: string; time: any }>
        }>
      >
    }>
  >
}

export type ReschedulePostFromDraftsMutationVariables = Exact<{
  input: RescheduleInput
  date: Scalars['ISO8601Date']
}>

export type ReschedulePostFromDraftsMutation = {
  __typename?: 'Mutation'
  reschedule: Array<
    Maybe<{
      __typename?: 'Timeslot'
      id: string
      posts?: Maybe<
        Array<{
          __typename?: 'Post'
          id: string
          scheduledOn?: Maybe<any>
          timeslot?: Maybe<{ __typename?: 'Timeslot'; id: string; time: any }>
        }>
      >
    }>
  >
}

export type GetQueueQueryVariables = Exact<{
  date: Scalars['ISO8601Date']
}>

export type GetQueueQuery = {
  __typename?: 'Query'
  timeslots?: Maybe<
    Array<
      Maybe<{
        __typename?: 'Timeslot'
        id: string
        time: any
        posts?: Maybe<
          Array<{
            __typename?: 'Post'
            id: string
            sentAt?: Maybe<any>
            sourceId: string
            createdAt?: Maybe<any>
            scheduledOn?: Maybe<any>
            timeslot?: Maybe<{ __typename?: 'Timeslot'; id: string; time: any }>
            sourceMeta?: Maybe<{
              __typename?: 'SourceMeta'
              id: string
              text?: Maybe<string>
              media?: Maybe<Array<Maybe<{ __typename?: 'Image'; src: string }>>>
            }>
          }>
        >
      }>
    >
  >
}

export type ReschedulePostOnDropMutationVariables = Exact<{
  input: RescheduleInput
  date: Scalars['ISO8601Date']
}>

export type ReschedulePostOnDropMutation = {
  __typename?: 'Mutation'
  reschedule: Array<
    Maybe<{
      __typename?: 'Timeslot'
      id: string
      currentDayPosts?: Maybe<
        Array<{
          __typename?: 'Post'
          id: string
          scheduledOn?: Maybe<any>
          sentAt?: Maybe<any>
          timeslot?: Maybe<{ __typename?: 'Timeslot'; id: string; time: any }>
        }>
      >
    }>
  >
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
  drafts?: Maybe<
    Array<
      Maybe<{
        __typename?: 'Post'
        id: string
        createdAt?: Maybe<any>
        sourceMeta?: Maybe<{
          __typename?: 'SourceMeta'
          id: string
          text?: Maybe<string>
          media?: Maybe<Array<Maybe<{ __typename?: 'Image'; src: string }>>>
        }>
      }>
    >
  >
}

export type RemoveFromQueueMutationVariables = Exact<{
  id: Scalars['String']
}>

export type RemoveFromQueueMutation = {
  __typename?: 'Mutation'
  removeFromQueue?: Maybe<boolean>
}

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>

export type GetPostsQuery = {
  __typename?: 'Query'
  feed?: Maybe<
    Array<
      Maybe<{
        __typename?: 'News'
        id: string
        inQueue: boolean
        message?: Maybe<string>
        user?: Maybe<{ __typename?: 'User'; name: string }>
        images: Array<{ __typename?: 'Image'; src: string }>
      }>
    >
  >
}
