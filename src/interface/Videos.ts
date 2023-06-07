export interface YouTubeVideosResponse {
    kind: string
    etag: string
    items: Item[]
    pageInfo: PageInfo
}

export interface Item {
    kind: string
    etag: string
    id: string
    contentDetails: ContentDetails
}

export interface ContentDetails {
    duration: string
    dimension: string
    definition: string
    caption: string
    licensedContent: boolean
    regionRestriction?: RegionRestriction
    contentRating: ContentRating
    projection: string
}

export interface RegionRestriction {
    blocked: string[]
}

export interface ContentRating { }

export interface PageInfo {
    totalResults: number
    resultsPerPage: number
}
