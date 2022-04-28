Topbar => only FromURL mode, always show TimeslotPage
Queue timeslot => both modes, never show TimelotPage

cases:
url post => call send to queue; need: post data, picked schedule slot
draft post => call reschedule; need: post data, picked schedule slot

```
input SendToQueueInput {
    sourceId: String!
    text: String
    author: String
    media: [MediaInput]
    isDraft: Boolean
    timeslotId: String
    scheduledOn: ISO8601Date
}
```

```
input RescheduleInput {
    id: String!
    scheduledOn: ISO8601Date!
    timeslotId: String!
}
```
