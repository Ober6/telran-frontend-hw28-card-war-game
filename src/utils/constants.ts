export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king' | 'ace';

export const suits: Suit[] = ['clubs', 'diamonds', 'hearts', 'spades'];
export const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

export const ROUND_COUNT = 26;

export type Card = {
    suit: Suit;
    rank: Rank;
};