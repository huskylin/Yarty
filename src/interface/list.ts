export interface ListColumn {
    key: string;
    title: string;
    thumbnails: string;
    videoOwnerChannelTitle: string;
    videoId: string
}

export interface ListResponse {
    items: Items;
    listName: ListName;
}

export interface Items {
    kind: string
    etag: string
    items: Item[]
    pageInfo: PageInfo
}

export interface Item {
    kind: string
    etag: string
    id: string
    snippet: Snippet
}

export interface Snippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails
    channelTitle: string
    playlistId: string
    position: number
    resourceId: ResourceId
    videoOwnerChannelTitle: string
    videoOwnerChannelId: string
}

export interface Thumbnails {
    default: Default
    medium: Medium
    high: High
    standard?: Standard
    maxres?: Maxres
}

export interface Default {
    url: string
    width: number
    height: number
}

export interface Medium {
    url: string
    width: number
    height: number
}

export interface High {
    url: string
    width: number
    height: number
}

export interface Standard {
    url: string
    width: number
    height: number
}

export interface Maxres {
    url: string
    width: number
    height: number
}

export interface ResourceId {
    kind: string
    videoId: string
}

export interface PageInfo {
    totalResults: number
    resultsPerPage: number
}

export interface ListName {
    kind: string
    etag: string
    pageInfo: PageInfo2
    items: Item2[]
}

export interface PageInfo2 {
    totalResults: number
    resultsPerPage: number
}

export interface Item2 {
    kind: string
    etag: string
    id: string
    snippet: Snippet2
}

export interface Snippet2 {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails2
    channelTitle: string
    localized: Localized
}

export interface Thumbnails2 {
    default: Default2
    medium: Medium2
    high: High2
    standard: Standard2
    maxres: Maxres2
}

export interface Default2 {
    url: string
    width: number
    height: number
}

export interface Medium2 {
    url: string
    width: number
    height: number
}

export interface High2 {
    url: string
    width: number
    height: number
}

export interface Standard2 {
    url: string
    width: number
    height: number
}

export interface Maxres2 {
    url: string
    width: number
    height: number
}

export interface Localized {
    title: string
    description: string
}
export interface Session {
    user: User
    expires: string
    accessToken: string
}
export interface User {
    id: string
    name: string
    email: string
    image: string
}
