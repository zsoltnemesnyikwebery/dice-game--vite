import type { Game } from "@/models/interfaces";
import { v4 as uuidv4 } from "uuid";
import {
    DEFAULT_SCORE,
    DEFAULT_MAX_SCORE,
    GAME_STATUS,
    DICE_COUNT,
    DICE_SIDES,
} from "@/lib/constants";
import type { DiceRoll, DiceValue, Player } from "@/models/types";

/** INIT NEW GAME */
export const createNewGame = (playerNames: [string, string]): Game => ({
    players: playerNames.map((name, i) => ({
        id: uuidv4(),
        name,
        avatar: `https://picsum.photos/300?random=${i}`,
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
    status: GAME_STATUS.STARTED,
});

/** ROLL THE DICE */
export const rollDice = (): DiceRoll => {
    const rollSingleDice = (): DiceValue => (Math.floor(Math.random() * 6) + 1) as DiceValue;

    return Array.from({ length: DICE_COUNT }, rollSingleDice) as DiceRoll;
};

export const updateAfterRoll = (game: Game): Game => {
    const rollResult = rollDice();
    const activeIndex = game.players.findIndex(p => p.isActive);

    const isAll = (rolls: DiceRoll, value: DiceValue) => rolls.every((v) => v === value);

    /* SPECIAL ROLLS  */
    // 1.) if all ones, reset current score to 0
    const allOnes = isAll(rollResult, 1);

    if (allOnes) {
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
                    actions: {
                        destroy: true,
                    }
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

    // 2.) if all 6s, double the score, otherwise normal score
    const allSixes = isAll(rollResult, 6);
    const rollScore = rollResult.reduce((a, b) => a + b, 0) * (isAll(rollResult, DICE_SIDES) ? 2 : 1);

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
                    celebration: allSixes
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
    const players = game.players.map((player, i) => {
        if (i === game.players.findIndex(p => p.isActive)) {
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