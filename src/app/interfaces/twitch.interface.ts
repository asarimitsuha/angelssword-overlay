export interface TwitchGetUserResponse {
    data: [{
        id: number;
        login: string;
        display_name: string;
        type: string;
        broadcaster_type: string;
        description: string;
        profile_image_url: string;
        offline_image_url: string;
        view_count: number
        email: string;
        created_at: string;
    }];
}

export interface TwitchGetClipData {
    id: string;
    url: string;
    embed_url: string;
    broadcaster_id: string;
    broadcaster_name: string;
    creator_id: string;
    creator_name: string;
    video_id: string;
    game_id: string;
    language: string;
    title: string;
    view_count: string;
    created_at: string;
    thumbnail_url: string;
    duration: number;
}

export interface TwitchGetClipsResponse {
    data: TwitchGetClipData[];
    pagination: {
        cursor?: string;
    }
}

export interface TwitchGetChannelsResponse {
    data: {
        broadcaster_id: string;
        broadcaster_login: string;
        broadcaster_name: string;
        broadcaster_language: string;
        game_id: string;
        game_name: string;
        title: string;
        delay: number;
    }[];
}
