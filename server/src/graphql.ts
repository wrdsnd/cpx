
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SaveAsDraftInput {
    id: string;
}

export class MediaInput {
    src: string;
}

export class RescheduleInput {
    id: string;
    scheduledOn: ISO8601Date;
    timeslotId: string;
}

export class SendToQueueInput {
    sourceId: string;
    text?: string;
    author?: string;
    media?: MediaInput[];
    isDraft?: boolean;
    timeslotId?: string;
    scheduledOn?: ISO8601Date;
}

export abstract class IQuery {
    abstract feed(): News[] | Promise<News[]>;

    abstract news(id: string): News | Promise<News>;

    abstract post(id: string): Post | Promise<Post>;

    abstract queue(): Post[] | Promise<Post[]>;

    abstract drafts(): Post[] | Promise<Post[]>;

    abstract timeslots(): Timeslot[] | Promise<Timeslot[]>;
}

export abstract class IMutation {
    abstract sendToQueue(input: SendToQueueInput): Post | Promise<Post>;

    abstract removeFromQueue(id?: string): boolean | Promise<boolean>;

    abstract reschedule(input: RescheduleInput): Timeslot[] | Promise<Timeslot[]>;

    abstract saveAsDraft(input: SaveAsDraftInput): Post | Promise<Post>;
}

export class SourceMeta {
    id: string;
    author: string;
    text?: string;
    media?: Image[];
}

export class Post {
    id: string;
    sentAt?: ISO8601DateTime;
    sourceId: string;
    createdAt?: ISO8601DateTime;
    sourceMeta?: SourceMeta;
    timeslot?: Timeslot;
    isDraft: boolean;
    scheduledOn?: ISO8601Date;
}

export class Timeslot {
    id: string;
    time: ISO8601Time;
    posts?: Post[];
}

export class User {
    name: string;
}

export class Image {
    src: string;
}

export class News {
    id: string;
    inQueue: boolean;
    message?: string;
    user?: User;
    images: Image[];
}

export type ISO8601Date = Date;
export type ISO8601DateTime = Date;
export type ISO8601Time = Date;
