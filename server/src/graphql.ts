
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum MediaType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO"
}

export class LoginInput {
    email: string;
    password: string;
}

export class SaveAsDraftInput {
    id: string;
}

export class MediaInput {
    type: MediaType;
    url: string;
}

export class RescheduleInput {
    id: string;
    scheduledOn: ISO8601Date;
    timeslotId: string;
}

export class SendToQueueInput {
    sourceId: string;
    text?: Nullable<string>;
    author?: Nullable<string>;
    media?: Nullable<Nullable<MediaInput>[]>;
    isDraft?: Nullable<boolean>;
    timeslotId?: Nullable<string>;
    scheduledOn?: Nullable<ISO8601Date>;
}

export abstract class IQuery {
    abstract feed(): Nullable<Nullable<News>[]> | Promise<Nullable<Nullable<News>[]>>;

    abstract news(id: string): Nullable<News> | Promise<Nullable<News>>;

    abstract post(id: string): Post | Promise<Post>;

    abstract queue(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;

    abstract drafts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;

    abstract timeslots(): Nullable<Nullable<Timeslot>[]> | Promise<Nullable<Nullable<Timeslot>[]>>;

    abstract likes(): News[] | Promise<News[]>;
}

export abstract class IMutation {
    abstract sendToQueue(input: SendToQueueInput): Post | Promise<Post>;

    abstract removeFromQueue(id?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract reschedule(input: RescheduleInput): Nullable<Timeslot>[] | Promise<Nullable<Timeslot>[]>;

    abstract saveAsDraft(input: SaveAsDraftInput): Post | Promise<Post>;

    abstract login(input: LoginInput): LoginResult | Promise<LoginResult>;

    abstract logout(): LogoutResult | Promise<LogoutResult>;
}

export class LoginResult {
    result: boolean;
}

export class LogoutResult {
    result: boolean;
}

export class Media {
    id: string;
    type: MediaType;
    url: string;
    post: Post;
    createdAt: ISO8601DateTime;
}

export class Post {
    id: string;
    sentAt?: Nullable<ISO8601DateTime>;
    content: string;
    media: Media[];
    sourceId: string;
    createdAt?: Nullable<ISO8601DateTime>;
    timeslot?: Nullable<Timeslot>;
    isDraft: boolean;
    scheduledOn?: Nullable<ISO8601Date>;
}

export class Timeslot {
    id: string;
    time: ISO8601Time;
    posts?: Nullable<Post[]>;
}

export class TwitterUser {
    name: string;
}

export class TwitterMedia {
    type: MediaType;
    url: string;
}

export class News {
    id: string;
    message?: Nullable<string>;
    user: TwitterUser;
    media: TwitterMedia[];
}

export type ISO8601Date = Date;
export type ISO8601DateTime = Date;
export type ISO8601Time = Date;
type Nullable<T> = T | null;
