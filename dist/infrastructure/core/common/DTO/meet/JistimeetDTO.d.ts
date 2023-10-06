export declare class JitsiMeetDataDTO {
    kid: string;
    alg: string;
    aud: string;
    context: {
        user: {
            id: string;
            name: string;
            avatar: string;
            email: string;
            moderator: boolean;
        };
        features: {
            livestreaming: boolean;
            recording: boolean;
            transcription: boolean;
            'sip-inbound-call': boolean;
            'sip-outbound-call': boolean;
            'inbound-call': boolean;
            'outbound-call': boolean;
        };
        room: {
            regex: boolean;
        };
    };
    sub: string;
    iss: string;
    room: string;
    nbf: string;
    exp: string;
}
