export interface ChatMessage {
    chatroom_id: number;
    content: string;
    created_at: string;
    id: string;
    metadata: {
        message_ref: string;
    }
    sender: {
        id: number;
        identity: {
            color: string;
            badges: {
                text: string;
                type: string;
            }[];
        },
        slug: string;
        username: string;
    }
    type: string;
    message?: {
        id: string;
    }
}
