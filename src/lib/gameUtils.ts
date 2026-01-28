import type { Game } from "@/models/interfaces";
import { v4 as uuidv4 } from "uuid";
import {
    DEFAULT_SCORE,
    DEFAULT_MAX_SCORE,
    GAME_STATUS,
} from "@/lib/constants";
import type { DiceRoll, Player } from "@/models/types";

/** INIT NEW GAME */
export const createNewGame = (playerNames: [string, string]): Game => ({
    players: playerNames.map((name, i) => ({
        id: undefined,
        name,
        avatar: undefined,
        color: i === 0 ? "blue" : "red",
        isActive: i === 0,
        rolls: undefined,
        score: {
            current: DEFAULT_SCORE,
            total: DEFAULT_SCORE,
        },
    })),
    status: "not_started",
    winner: null,
});

/** START THE GAME */
export const startGame = (game: Game): Game => ({
    ...game,
    players: game.players.map((player, i) => ({
        ...player,
        id: uuidv4(),
        avatar: `https://picsum.photos/300?random=${i}`,
    })),
    status: "in_progress",
});

/** ROLL THE DICE */
export const rollDice = (): DiceRoll => [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
];

export const updateAfterRoll = (game: Game): Game => {
    const rollResult = rollDice();
    const rollScore = rollResult[0] + rollResult[1];

    const activeIndex = game.players.findIndex(p => p.isActive);

    const players = game.players.map((player, i) =>
        i === activeIndex
            ? {
                ...player,
                rolls: rollResult,
                score: {
                    ...player.score,
                    current: player.score.current + rollScore,
                },
            }
            : player
    );

    return {
        ...game,
        players,
    };
};

/** END THE TURN */
export const endTurn = (game: Game): Game => {
    const activeIndex = game.players.findIndex(p => p.isActive);

    const players = game.players.map((player, i) => {
        if (i === activeIndex) {
            return {
                ...player,
                isActive: false,
                rolls: undefined,
                score: {
                    ...player.score,
                    total: player.score.total,
                },
            };
        }

        return {
            ...player,
            isActive: true,
        };
    });

    return {
        ...game,
        players,
    };
};

/** CHECK FOR WINNER */
export const checkWinner = (game: Game): Player | null => {
    return game.players.find((p) => p.score.current >= DEFAULT_MAX_SCORE) || null;
};

export const startNewRound = (game: Game): Game => {
    if (!game.winner) return game;

    const players = game.players.map(player => ({
        ...player,
        isActive: false,
        rolls: undefined,
        score: {
            current: DEFAULT_SCORE,
            total:
                player.id === game.winner?.id
                    ? player.score.total + 1
                    : player.score.total,
        },
    }));

    // első játékos kezd
    players[0].isActive = true;

    return {
        ...game,
        players,
        winner: null,
        status: GAME_STATUS.STARTED,
    };
};

export const resetGame = (playerNames: [string, string]): Game =>
  createNewGame(playerNames);
