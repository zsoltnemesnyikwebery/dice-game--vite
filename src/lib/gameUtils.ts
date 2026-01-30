import type { Game } from "@/models/interfaces";
import { v4 as uuidv4 } from "uuid";
import {
    DEFAULT_SCORE,
    DEFAULT_MAX_SCORE,
    GAME_STATUS,
    DICE_COUNT,
} from "@/lib/constants";
import type { DiceRoll, DiceValue, Player } from "@/models/types";

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
        actions: {},
    })),
    status: GAME_STATUS.NOT_STARTED,
    winner: undefined,
});

/** START THE GAME */
export const startGame = (game: Game): Game => ({
    ...game,
    players: game.players.map((player, i) => ({
        ...player,
        id: uuidv4(),
        avatar: `https://picsum.photos/300?random=${i}`,
    })),
    status: GAME_STATUS.STARTED,
});

/** ROLL THE DICE */
export const rollDice = (): DiceRoll => {
    const rollSingleDice = (): DiceValue => (Math.floor(Math.random() * 6) + 1) as DiceValue;

    return Array.from({ length: DICE_COUNT }, rollSingleDice) as DiceRoll;
};

export const updateAfterRoll = (game: Game): Game => {
    const rollResult = rollDice();

    /* SPECIAL ROLLS  */
    const allSixes = rollResult.every((value) => value === 6);

    // If all ones, reset current score to 0
    if (rollResult.every((value) => value === 1)) {
        const activeIndex = game.players.findIndex(p => p.isActive);
        const players = game.players.map((player, i) =>
            i === activeIndex
                ? {
                    ...player,
                    rolls: rollResult,
                    score: {
                        ...player.score,
                        current: 0,
                    },
                    isActive: false,
                }
                : {
                    ...player,
                    isActive: true
                }
        );

        return {
            ...game,
            players,
        };
    }

    const rollScore = rollResult.reduce((a, b) => a + b, 0) * (allSixes ? 2 : 1);

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
                actions: {
                    ...player.actions,
                    celebration: allSixes,
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

    const players = game.players.map((player) => ({
        ...player,
        isActive: player.isActive ? false : true,
        rolls: undefined,
        score: {
            current: DEFAULT_SCORE,
            total:
                player.id === game.winner?.id
                    ? player.score.total + 1
                    : player.score.total,
        },
    }));

    return {
        ...game,
        players,
        winner: undefined,
        status: GAME_STATUS.STARTED,
    };
};

export const resetGame = (playerNames: [string, string]): Game =>
    createNewGame(playerNames);