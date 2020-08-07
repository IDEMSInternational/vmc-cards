export interface Card {
    suit: "hearts" | "diamons" | "spades" | "clubs";
    rank: number | "j" | "q" | "k" | "a" | "joker";
    text: string;
};