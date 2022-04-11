export interface TokenModel {
    token: string;
    login: string;
    displayName: string;
    profileImage: string;
    type: string;
    createDate: number;
}

export interface TokenInput {
    code?: string;
    token?: string;
}
