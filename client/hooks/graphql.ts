import * as Types from 'types/graphql/schema'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export const PostMediaFragmentDoc = gql`
  fragment PostMedia on SourceMeta {
    id
    media {
      src
    }
    text
  }
`
export const GetDraftsDocument = gql`
  query GetDrafts {
    drafts {
      id
      createdAt
      sourceMeta {
        id
        media {
          src
        }
        text
      }
    }
  }
`

/**
 * __useGetDraftsQuery__
 *
 * To run a query within a React component, call `useGetDraftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDraftsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetDraftsQuery,
    Types.GetDraftsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.GetDraftsQuery, Types.GetDraftsQueryVariables>(
    GetDraftsDocument,
    options,
  )
}
export function useGetDraftsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetDraftsQuery,
    Types.GetDraftsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    Types.GetDraftsQuery,
    Types.GetDraftsQueryVariables
  >(GetDraftsDocument, options)
}
export type GetDraftsQueryHookResult = ReturnType<typeof useGetDraftsQuery>
export type GetDraftsLazyQueryHookResult = ReturnType<
  typeof useGetDraftsLazyQuery
>
export type GetDraftsQueryResult = Apollo.QueryResult<
  Types.GetDraftsQuery,
  Types.GetDraftsQueryVariables
>
export const RemoveFromQueueDocument = gql`
  mutation RemoveFromQueue($id: String!) {
    removeFromQueue(id: $id)
  }
`
export type RemoveFromQueueMutationFn = Apollo.MutationFunction<
  Types.RemoveFromQueueMutation,
  Types.RemoveFromQueueMutationVariables
>

/**
 * __useRemoveFromQueueMutation__
 *
 * To run a mutation, you first call `useRemoveFromQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromQueueMutation, { data, loading, error }] = useRemoveFromQueueMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFromQueueMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RemoveFromQueueMutation,
    Types.RemoveFromQueueMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.RemoveFromQueueMutation,
    Types.RemoveFromQueueMutationVariables
  >(RemoveFromQueueDocument, options)
}
export type RemoveFromQueueMutationHookResult = ReturnType<
  typeof useRemoveFromQueueMutation
>
export type RemoveFromQueueMutationResult =
  Apollo.MutationResult<Types.RemoveFromQueueMutation>
export type RemoveFromQueueMutationOptions = Apollo.BaseMutationOptions<
  Types.RemoveFromQueueMutation,
  Types.RemoveFromQueueMutationVariables
>
export const GetPostDocument = gql`
  query GetPost($id: String!) {
    news(id: $id) {
      id
      inQueue
      images {
        src
      }
      user {
        name
      }
    }
  }
`

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetPostQuery,
    Types.GetPostQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.GetPostQuery, Types.GetPostQueryVariables>(
    GetPostDocument,
    options,
  )
}
export function useGetPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPostQuery,
    Types.GetPostQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Types.GetPostQuery, Types.GetPostQueryVariables>(
    GetPostDocument,
    options,
  )
}
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>
export type GetPostQueryResult = Apollo.QueryResult<
  Types.GetPostQuery,
  Types.GetPostQueryVariables
>
export const ReschedulePostFromDraftsInEditorDocument = gql`
  mutation ReschedulePostFromDraftsInEditor(
    $input: RescheduleInput!
    $date: ISO8601Date!
  ) {
    reschedule(input: $input) {
      id
      posts(date: $date) {
        id
        scheduledOn
        timeslot {
          id
          time
        }
      }
    }
  }
`
export type ReschedulePostFromDraftsInEditorMutationFn =
  Apollo.MutationFunction<
    Types.ReschedulePostFromDraftsInEditorMutation,
    Types.ReschedulePostFromDraftsInEditorMutationVariables
  >

/**
 * __useReschedulePostFromDraftsInEditorMutation__
 *
 * To run a mutation, you first call `useReschedulePostFromDraftsInEditorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReschedulePostFromDraftsInEditorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reschedulePostFromDraftsInEditorMutation, { data, loading, error }] = useReschedulePostFromDraftsInEditorMutation({
 *   variables: {
 *      input: // value for 'input'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useReschedulePostFromDraftsInEditorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ReschedulePostFromDraftsInEditorMutation,
    Types.ReschedulePostFromDraftsInEditorMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.ReschedulePostFromDraftsInEditorMutation,
    Types.ReschedulePostFromDraftsInEditorMutationVariables
  >(ReschedulePostFromDraftsInEditorDocument, options)
}
export type ReschedulePostFromDraftsInEditorMutationHookResult = ReturnType<
  typeof useReschedulePostFromDraftsInEditorMutation
>
export type ReschedulePostFromDraftsInEditorMutationResult =
  Apollo.MutationResult<Types.ReschedulePostFromDraftsInEditorMutation>
export type ReschedulePostFromDraftsInEditorMutationOptions =
  Apollo.BaseMutationOptions<
    Types.ReschedulePostFromDraftsInEditorMutation,
    Types.ReschedulePostFromDraftsInEditorMutationVariables
  >
export const ReloadQueueAfterPostCreationDocument = gql`
  query ReloadQueueAfterPostCreation($date: ISO8601Date!) {
    timeslots {
      id
      time
      posts(date: $date) {
        id
        sentAt
        sourceId
        createdAt
        sourceMeta {
          text
          media {
            src
          }
          id
        }
      }
    }
  }
`

/**
 * __useReloadQueueAfterPostCreationQuery__
 *
 * To run a query within a React component, call `useReloadQueueAfterPostCreationQuery` and pass it any options that fit your needs.
 * When your component renders, `useReloadQueueAfterPostCreationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReloadQueueAfterPostCreationQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useReloadQueueAfterPostCreationQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ReloadQueueAfterPostCreationQuery,
    Types.ReloadQueueAfterPostCreationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    Types.ReloadQueueAfterPostCreationQuery,
    Types.ReloadQueueAfterPostCreationQueryVariables
  >(ReloadQueueAfterPostCreationDocument, options)
}
export function useReloadQueueAfterPostCreationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ReloadQueueAfterPostCreationQuery,
    Types.ReloadQueueAfterPostCreationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    Types.ReloadQueueAfterPostCreationQuery,
    Types.ReloadQueueAfterPostCreationQueryVariables
  >(ReloadQueueAfterPostCreationDocument, options)
}
export type ReloadQueueAfterPostCreationQueryHookResult = ReturnType<
  typeof useReloadQueueAfterPostCreationQuery
>
export type ReloadQueueAfterPostCreationLazyQueryHookResult = ReturnType<
  typeof useReloadQueueAfterPostCreationLazyQuery
>
export type ReloadQueueAfterPostCreationQueryResult = Apollo.QueryResult<
  Types.ReloadQueueAfterPostCreationQuery,
  Types.ReloadQueueAfterPostCreationQueryVariables
>
export const GetTimeslotsDocument = gql`
  query GetTimeslots {
    timeslots {
      id
      time
    }
  }
`

/**
 * __useGetTimeslotsQuery__
 *
 * To run a query within a React component, call `useGetTimeslotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimeslotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimeslotsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTimeslotsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetTimeslotsQuery,
    Types.GetTimeslotsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    Types.GetTimeslotsQuery,
    Types.GetTimeslotsQueryVariables
  >(GetTimeslotsDocument, options)
}
export function useGetTimeslotsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetTimeslotsQuery,
    Types.GetTimeslotsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    Types.GetTimeslotsQuery,
    Types.GetTimeslotsQueryVariables
  >(GetTimeslotsDocument, options)
}
export type GetTimeslotsQueryHookResult = ReturnType<
  typeof useGetTimeslotsQuery
>
export type GetTimeslotsLazyQueryHookResult = ReturnType<
  typeof useGetTimeslotsLazyQuery
>
export type GetTimeslotsQueryResult = Apollo.QueryResult<
  Types.GetTimeslotsQuery,
  Types.GetTimeslotsQueryVariables
>
export const SendToQueueFromEditorDocument = gql`
  mutation SendToQueueFromEditor($input: SendToQueueInput!) {
    sendToQueue(input: $input) {
      id
      scheduledOn
      isDraft
    }
  }
`
export type SendToQueueFromEditorMutationFn = Apollo.MutationFunction<
  Types.SendToQueueFromEditorMutation,
  Types.SendToQueueFromEditorMutationVariables
>

/**
 * __useSendToQueueFromEditorMutation__
 *
 * To run a mutation, you first call `useSendToQueueFromEditorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendToQueueFromEditorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendToQueueFromEditorMutation, { data, loading, error }] = useSendToQueueFromEditorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendToQueueFromEditorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SendToQueueFromEditorMutation,
    Types.SendToQueueFromEditorMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.SendToQueueFromEditorMutation,
    Types.SendToQueueFromEditorMutationVariables
  >(SendToQueueFromEditorDocument, options)
}
export type SendToQueueFromEditorMutationHookResult = ReturnType<
  typeof useSendToQueueFromEditorMutation
>
export type SendToQueueFromEditorMutationResult =
  Apollo.MutationResult<Types.SendToQueueFromEditorMutation>
export type SendToQueueFromEditorMutationOptions = Apollo.BaseMutationOptions<
  Types.SendToQueueFromEditorMutation,
  Types.SendToQueueFromEditorMutationVariables
>
export const GetDataToRescheduleDocument = gql`
  query GetDataToReschedule($id: String!) {
    timeslots {
      id
      time
    }
    post(id: $id) {
      id
      scheduledOn
      timeslot {
        id
        time
      }
    }
  }
`

/**
 * __useGetDataToRescheduleQuery__
 *
 * To run a query within a React component, call `useGetDataToRescheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataToRescheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataToRescheduleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDataToRescheduleQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetDataToRescheduleQuery,
    Types.GetDataToRescheduleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    Types.GetDataToRescheduleQuery,
    Types.GetDataToRescheduleQueryVariables
  >(GetDataToRescheduleDocument, options)
}
export function useGetDataToRescheduleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetDataToRescheduleQuery,
    Types.GetDataToRescheduleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    Types.GetDataToRescheduleQuery,
    Types.GetDataToRescheduleQueryVariables
  >(GetDataToRescheduleDocument, options)
}
export type GetDataToRescheduleQueryHookResult = ReturnType<
  typeof useGetDataToRescheduleQuery
>
export type GetDataToRescheduleLazyQueryHookResult = ReturnType<
  typeof useGetDataToRescheduleLazyQuery
>
export type GetDataToRescheduleQueryResult = Apollo.QueryResult<
  Types.GetDataToRescheduleQuery,
  Types.GetDataToRescheduleQueryVariables
>
export const ReschedulePostDocument = gql`
  mutation ReschedulePost(
    $input: RescheduleInput!
    $date: ISO8601Date!
    $secondDate: ISO8601Date!
  ) {
    reschedule(input: $input) {
      id
      currentDayPosts: posts(date: $date) {
        id
        scheduledOn
        timeslot {
          id
          time
        }
      }
      anotherDayPosts: posts(date: $secondDate) {
        id
        scheduledOn
        timeslot {
          id
          time
        }
      }
    }
  }
`
export type ReschedulePostMutationFn = Apollo.MutationFunction<
  Types.ReschedulePostMutation,
  Types.ReschedulePostMutationVariables
>

/**
 * __useReschedulePostMutation__
 *
 * To run a mutation, you first call `useReschedulePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReschedulePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reschedulePostMutation, { data, loading, error }] = useReschedulePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      date: // value for 'date'
 *      secondDate: // value for 'secondDate'
 *   },
 * });
 */
export function useReschedulePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ReschedulePostMutation,
    Types.ReschedulePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.ReschedulePostMutation,
    Types.ReschedulePostMutationVariables
  >(ReschedulePostDocument, options)
}
export type ReschedulePostMutationHookResult = ReturnType<
  typeof useReschedulePostMutation
>
export type ReschedulePostMutationResult =
  Apollo.MutationResult<Types.ReschedulePostMutation>
export type ReschedulePostMutationOptions = Apollo.BaseMutationOptions<
  Types.ReschedulePostMutation,
  Types.ReschedulePostMutationVariables
>
export const ReschedulePostFromDraftsDocument = gql`
  mutation ReschedulePostFromDrafts(
    $input: RescheduleInput!
    $date: ISO8601Date!
  ) {
    reschedule(input: $input) {
      id
      posts(date: $date) {
        id
        scheduledOn
        timeslot {
          id
          time
        }
      }
    }
  }
`
export type ReschedulePostFromDraftsMutationFn = Apollo.MutationFunction<
  Types.ReschedulePostFromDraftsMutation,
  Types.ReschedulePostFromDraftsMutationVariables
>

/**
 * __useReschedulePostFromDraftsMutation__
 *
 * To run a mutation, you first call `useReschedulePostFromDraftsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReschedulePostFromDraftsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reschedulePostFromDraftsMutation, { data, loading, error }] = useReschedulePostFromDraftsMutation({
 *   variables: {
 *      input: // value for 'input'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useReschedulePostFromDraftsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ReschedulePostFromDraftsMutation,
    Types.ReschedulePostFromDraftsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.ReschedulePostFromDraftsMutation,
    Types.ReschedulePostFromDraftsMutationVariables
  >(ReschedulePostFromDraftsDocument, options)
}
export type ReschedulePostFromDraftsMutationHookResult = ReturnType<
  typeof useReschedulePostFromDraftsMutation
>
export type ReschedulePostFromDraftsMutationResult =
  Apollo.MutationResult<Types.ReschedulePostFromDraftsMutation>
export type ReschedulePostFromDraftsMutationOptions =
  Apollo.BaseMutationOptions<
    Types.ReschedulePostFromDraftsMutation,
    Types.ReschedulePostFromDraftsMutationVariables
  >
export const GetQueueDocument = gql`
  query GetQueue($date: ISO8601Date!) {
    timeslots {
      id
      time
      posts(date: $date) {
        id
        sentAt
        sourceId
        createdAt
        scheduledOn
        timeslot {
          id
          time
        }
        sourceMeta {
          ...PostMedia
        }
      }
    }
  }
  ${PostMediaFragmentDoc}
`

/**
 * __useGetQueueQuery__
 *
 * To run a query within a React component, call `useGetQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQueueQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetQueueQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetQueueQuery,
    Types.GetQueueQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.GetQueueQuery, Types.GetQueueQueryVariables>(
    GetQueueDocument,
    options,
  )
}
export function useGetQueueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetQueueQuery,
    Types.GetQueueQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Types.GetQueueQuery, Types.GetQueueQueryVariables>(
    GetQueueDocument,
    options,
  )
}
export type GetQueueQueryHookResult = ReturnType<typeof useGetQueueQuery>
export type GetQueueLazyQueryHookResult = ReturnType<
  typeof useGetQueueLazyQuery
>
export type GetQueueQueryResult = Apollo.QueryResult<
  Types.GetQueueQuery,
  Types.GetQueueQueryVariables
>
export const ReschedulePostOnDropDocument = gql`
  mutation ReschedulePostOnDrop($input: RescheduleInput!, $date: ISO8601Date!) {
    reschedule(input: $input) {
      id
      currentDayPosts: posts(date: $date) {
        id
        scheduledOn
        sentAt
        timeslot {
          id
          time
        }
      }
    }
  }
`
export type ReschedulePostOnDropMutationFn = Apollo.MutationFunction<
  Types.ReschedulePostOnDropMutation,
  Types.ReschedulePostOnDropMutationVariables
>

/**
 * __useReschedulePostOnDropMutation__
 *
 * To run a mutation, you first call `useReschedulePostOnDropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReschedulePostOnDropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reschedulePostOnDropMutation, { data, loading, error }] = useReschedulePostOnDropMutation({
 *   variables: {
 *      input: // value for 'input'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useReschedulePostOnDropMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ReschedulePostOnDropMutation,
    Types.ReschedulePostOnDropMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.ReschedulePostOnDropMutation,
    Types.ReschedulePostOnDropMutationVariables
  >(ReschedulePostOnDropDocument, options)
}
export type ReschedulePostOnDropMutationHookResult = ReturnType<
  typeof useReschedulePostOnDropMutation
>
export type ReschedulePostOnDropMutationResult =
  Apollo.MutationResult<Types.ReschedulePostOnDropMutation>
export type ReschedulePostOnDropMutationOptions = Apollo.BaseMutationOptions<
  Types.ReschedulePostOnDropMutation,
  Types.ReschedulePostOnDropMutationVariables
>
export const MoveToDraftsFromQueueDocument = gql`
  mutation MoveToDraftsFromQueue($input: SaveAsDraftInput!) {
    saveAsDraft(input: $input) {
      id
    }
  }
`
export type MoveToDraftsFromQueueMutationFn = Apollo.MutationFunction<
  Types.MoveToDraftsFromQueueMutation,
  Types.MoveToDraftsFromQueueMutationVariables
>

/**
 * __useMoveToDraftsFromQueueMutation__
 *
 * To run a mutation, you first call `useMoveToDraftsFromQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveToDraftsFromQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveToDraftsFromQueueMutation, { data, loading, error }] = useMoveToDraftsFromQueueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveToDraftsFromQueueMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.MoveToDraftsFromQueueMutation,
    Types.MoveToDraftsFromQueueMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.MoveToDraftsFromQueueMutation,
    Types.MoveToDraftsFromQueueMutationVariables
  >(MoveToDraftsFromQueueDocument, options)
}
export type MoveToDraftsFromQueueMutationHookResult = ReturnType<
  typeof useMoveToDraftsFromQueueMutation
>
export type MoveToDraftsFromQueueMutationResult =
  Apollo.MutationResult<Types.MoveToDraftsFromQueueMutation>
export type MoveToDraftsFromQueueMutationOptions = Apollo.BaseMutationOptions<
  Types.MoveToDraftsFromQueueMutation,
  Types.MoveToDraftsFromQueueMutationVariables
>
export const GetPostsDocument = gql`
  query GetPosts {
    feed {
      id
      inQueue
      message
      user {
        name
      }
      images {
        src
      }
    }
  }
`

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetPostsQuery,
    Types.GetPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.GetPostsQuery, Types.GetPostsQueryVariables>(
    GetPostsDocument,
    options,
  )
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPostsQuery,
    Types.GetPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Types.GetPostsQuery, Types.GetPostsQueryVariables>(
    GetPostsDocument,
    options,
  )
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>
export type GetPostsLazyQueryHookResult = ReturnType<
  typeof useGetPostsLazyQuery
>
export type GetPostsQueryResult = Apollo.QueryResult<
  Types.GetPostsQuery,
  Types.GetPostsQueryVariables
>
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      result
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  Types.LoginMutation,
  Types.LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.LoginMutation,
    Types.LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(
    LoginDocument,
    options,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  Types.LoginMutation,
  Types.LoginMutationVariables
>
