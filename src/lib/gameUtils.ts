import type { Game } from "@/models/interfaces";
import { v4 as uuidv4 } from "uuid";
import {
    DEFAULT_SCORE,
    DEFAULT_MAX_SCORE,
    GAME_STATUS,
    DICE_COUNT,
    // DICE_SIDES,
} from "@/lib/constants";
import type { DiceRoll, DiceValue, Player, RollType } from "@/models/types";

/** INIT NEW GAME */
export const createNewGame = (playerNames: [string, string]): Game => ({
    players: playerNames.map((name, i) => ({
        id: uuidv4(),
        name,
        avatar: `https://picsum.photos/300?random=${i}`,
        color: i === 0 ? "blue" : "red",
        isActive: i === 0,
        roll: undefined,
        score: {
            current: DEFAULT_SCORE,
            total: DEFAULT_SCORE,
        },
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

const isAll = (rolls: DiceRoll, value: DiceValue) => rolls.every((v) => v === value);

/** CALCULATE SCORE */
export const calculateScore = (game: Game): Game => {
    const rollResult = rollDice();
    let rollScore = rollResult.reduce((a, b) => a + b, 0)
    const activeIndex = game.players.findIndex(p => p.isActive);

    let type: RollType = "normal";

    if (isAll(rollResult, 1)) {
        type = "destroy";
        rollScore = 0;
    } else if (isAll(rollResult, 6)) {
        type = "celebration";
        rollScore = rollScore * 2;
    }

    const players = game.players.map((player, i) =>
        i === activeIndex
            ? {
                ...player,
                roll: {
                    dice: rollResult,
                    score: rollScore,
                    type,
                },
            }
            : player
    );

    return {
        ...game,
        players,
    };
};

/** APPLY ROLL RESULT */
export const updateScore = (game: Game): Game => {
    const activeIndex = game.players.findIndex(p => p.isActive);

    const players = game.players.map((player, i) => {
        if (i !== activeIndex || !player.roll) return player;

        if (player.roll.type === "destroy") {
            return {
                ...player,
                score: {
                    ...player.score,
                    current: 0,
                },
                roll: undefined,
            };
        }

        return {
            ...player,
            score: {
                ...player.score,
                current: player.score.current + player.roll.score,
            },
            // roll: undefined,
        };
    });

    return {
        ...game,
        players,
    };
};


export const clearPlayerActions = (game: Game): Game => ({
    ...game,
    players: game.players.map(player => ({
        ...player,
        actions: {
            celebration: false,
            destroy: false,
        },
    })),
});

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