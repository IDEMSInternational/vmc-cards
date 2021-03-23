export type CardMetadata = {
    "title": string,
    "type": string,
    "slug": string,
    "card_value": string,
    "card_suit": "club" | "diamond" | "spade" | "heart",
    statement?: string;
}

export interface Card {
    "title": string,
    "type": string,
    "slug": string,
    "card_value": string,
    "card_suit": "club" | "diamond" | "spade" | "heart",
    statement?: string;
    "metadata"?: {
        "type"?: string
    },
    "main_version"?: {
        "statement"?: string
        "hint"?: string
        "explanation"?: string
    },
    "extension_1"?: {
        "statement"?: string,
        "hint"?: string,
        "explanation"?: string
    },
    "additional_information"?: {
        "about"?: string,
        "references"?: string
    }
}