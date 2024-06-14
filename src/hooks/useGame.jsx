import { createContext, useContext, useReducer, useEffect } from "react";
import { randInt } from "three/src/math/MathUtils.js";
import { insertCoin, onTikTokLiveEvent } from "playroomkit";
import { DEBBUG_MODE } from "../App";

const GAME_TIME=10; 
const NB_friesman = 4;
const NB_hotdogman = 4;
const FRIESMAN_RESPAWN_TIME = 3000;
const FRIESMAN_ATTACKABLE_TIME_AFTER_RESPAWN = 1800;
const HOTDOGMAN_RESPAWN_TIME = 3000;
const HOTDOGMAN_ATTACKABLE_TIME_AFTER_RESPAWN = 1800;

const generateRandomManNames = () => {
  const possiblesNames = [
    // Nombres de Mujeres
    "valentina",
    "camila",
    "isabella",
    "sofía",
    "mariana",
    "gabriela",
    "daniela",
    "lucía",
    "victoria",
    "antonella",
    // Nombres de Hombres
    "alejandro",
    "sebastián",
    "mateo",
    "santiago",
    "nicolás",
    "diego",
    "leonardo",
    "juan",
    "emiliano",
    "rafael",
  ];

  return possiblesNames[randInt(0, possiblesNames.length - 1)];
};

const isFrismanAttackable = (friesman) => {
  return (
    !friesman.dead &&
    (!friesman.respawnTime ||
      Date.now() - friesman.respawnTime >
        FRIESMAN_ATTACKABLE_TIME_AFTER_RESPAWN)
  );
};

const isHotDogManAttackable = (hotdogman) => {
  return (
    !hotdogman.dead &&
    (!hotdogman.respawnTime ||
      Date.now() - hotdogman.respawnTime >
        HOTDOGMAN_ATTACKABLE_TIME_AFTER_RESPAWN)
  );
};

const GameContext = createContext();

function gameReducer(state, action) {
  if (action.type === "start") {
    return {
      ...state,
      status: "playing",
    };
  }

  if (action.type === "respawn") {
    const now = Date.now();
    const friesman = [...state.friesman];
    const hotdogman = [...state.hotdogman];

    return {
      ...state,
      friesman: friesman.map((friesman) => {
        if (friesman.dead && now - friesman.deathTime > FRIESMAN_RESPAWN_TIME) {
          return {
            ...friesman,
            dead: false,
            respawnTime: now,
            name: generateRandomManNames(),
            tipo: "friesman", // Agregar tipo friesman
          };
        }
        return friesman;
      }),
      hotdogman: hotdogman.map((hotdogman) => {
        if (
          hotdogman.dead &&
          now - hotdogman.deathTime > HOTDOGMAN_RESPAWN_TIME
        ) {
          return {
            ...hotdogman,
            dead: false,
            respawnTime: now,
            name: generateRandomManNames(),
            tipo: "hotdogman", // Agregar tipo hotdogman
          };
        }
        return hotdogman;
      }),
    };
  }

  if (state.status !== "playing") {
    return state;
  }

  const friesman = [...state.friesman];
  const hotdogman = [...state.hotdogman];

  if (action.type === "bomb") {
    let killed = 0;
    for (let i = 0; i < friesman.length; i++) {
      if (
        isFrismanAttackable(friesman[i]) ||
        isHotDogManAttackable(hotdogman[i])
      ) {
        killed++;
        friesman[i] = {
          ...friesman[i],
          dead: true,
          deathTime: Date.now(),
          killedBy: action.player,
          deathCause: action.type,
          tipo: "friesman", // Agregar tipo friesman
        };

        hotdogman[i] = {
          ...hotdogman[i],
          dead: true,
          deathTime: Date.now(),
          killedBy: action.player,
          deathCause: action.type,
          tipo: "hotdogman", // Agregar tipo hotdogman
        };
      }
    }

    const leaderboard = [...state.leaderboard];

    if (killed > 0) {
      const playerIndex = leaderboard.findIndex(
        (p) => p.username === action.player.username
      );
      if (playerIndex > -1) {
        leaderboard[playerIndex] = {
          ...action.player,
          kills: leaderboard[playerIndex].kills + killed,
          friesmanKills:
            (leaderboard[playerIndex].friesmanKills || 0) +
            friesman.filter((f) => f.dead && f.killedBy === action.player)
              .length,
          hotdogmanKills:
            (leaderboard[playerIndex].hotdogmanKills || 0) +
            hotdogman.filter((h) => h.dead && h.killedBy === action.player)
              .length,
        };
      } else {
        leaderboard.push({
          ...action.player,
          kills: killed,
          friesmanKills: friesman.filter(
            (f) => f.dead && f.killedBy === action.player
          ).length,
          hotdogmanKills: hotdogman.filter(
            (h) => h.dead && h.killedBy === action.player
          ).length,
        });
      }
      leaderboard.sort((a, b) => b.kills - a.kills);
    }

    return {
      ...state,
      friesman,
      hotdogman,
      leaderboard,
    };
  }

  if (action.type === "like" || action.type === "attack") {
    const friesman = [...state.friesman];
    const hotdogman = [...state.hotdogman];
    const leaderboard = [...state.leaderboard];

    let friesmanUpdated = false;
    let hotdogmanUpdated = false;

    // Escoger aleatoriamente entre friesman y hotdogman
    const randomIndex = Math.random() < 0.5 ? 0 : 1;

    if (randomIndex === 0) {
      // Intentar eliminar un friesman
      for (let i = 0; i < friesman.length; i++) {
        if (
          !friesmanUpdated &&
          isFrismanAttackable(friesman[i]) &&
          (action.type === "like" ||
            friesman[i].name === action.name)
        ) {
          friesman[i] = {
            ...friesman[i],
            dead: true,
            deathTime: Date.now(),
            killedBy: action.player,
            deathCause: action.type,
            tipo: "friesman", // Agregar tipo friesman
          };
          friesmanUpdated = true; // Marcar que se actualizó friesman
        }

        // Si ya se actualizó un friesman, salir del bucle
        if (friesmanUpdated) {
          break;
        }
      }
    } else {
      // Intentar eliminar un hotdogman
      for (let i = 0; i < hotdogman.length; i++) {
        if (
          !hotdogmanUpdated &&
          isHotDogManAttackable(hotdogman[i]) &&
          (action.type === "like" ||
            hotdogman[i].name === action.name)
        ) {
          hotdogman[i] = {
            ...hotdogman[i],
            dead: true,
            deathTime: Date.now(),
            killedBy: action.player,
            deathCause: action.type,
            tipo: "hotdogman", // Agregar tipo hotdogman
          };
          hotdogmanUpdated = true; // Marcar que se actualizó hotdogman
        }

        // Si ya se actualizó un hotdogman, salir del bucle
        if (hotdogmanUpdated) {
          break;
        }
      }
    }

    const playerIndex = leaderboard.findIndex(
      (p) => p.username === action.player.username
    );
    if (playerIndex > -1) {
      leaderboard[playerIndex] = {
        ...action.player,
        kills: leaderboard[playerIndex].kills + 1,
        friesmanKills:
          (leaderboard[playerIndex].friesmanKills || 0) +
          (friesmanUpdated ? 1 : 0),
        hotdogmanKills:
          (leaderboard[playerIndex].hotdogmanKills || 0) +
          (hotdogmanUpdated ? 1 : 0),
      };
    } else {
      leaderboard.push({
        ...action.player,
        kills: 1,
        friesmanKills: friesmanUpdated ? 1 : 0,
        hotdogmanKills: hotdogmanUpdated ? 1 : 0,
      });
    }
    leaderboard.sort((a, b) => b.kills - a.kills);

    return {
      ...state,
      friesman,
      hotdogman,
      leaderboard,
    };
  }

  return state;
}

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    status: "start", //starts,playing,gameOver
    timer: 0,
    friesman: [
      ...Array(NB_friesman)
        .fill()
        .map((_, i) => ({
          name: generateRandomManNames(),
        })),
    ],
    hotdogman: [
      ...Array(NB_hotdogman)
        .fill()
        .map((_, i) => ({
          name: generateRandomManNames(),
        })),
    ],

    leaderboard: [],
  });

  const setupTiktok = async () => {
    await insertCoin({ liveMode: "tiktok" });
    onTikTokLiveEvent((event) => {
      const player = {
        username: event.data.username,
        userPhotoUrl: event.data.userPhotoUrl,
      };
      switch (event.type) {
        case "chat":
          dispatch({
            type: "attack",
            player,
            message: event.data.message,
          });
          break;
        case "gift":
          dispatch({
            type: "bomb",
            player,
          });
          break;
        case "like":
          dispatch({
            type: "like",
            player,
          });
          break;
      }
    });
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: "updateLoop" });
    }, 1000);
    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: "respawn" });
    }, 100);
    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    if (!DEBBUG_MODE) {
      setupTiktok();
    }
  }, []);

  const { friesman, hotdogman, status, timer, leaderboard } = gameState;

  return (
    <GameContext.Provider
      value={{
        dispatch,
        gameState,
        friesman,
        hotdogman,
        status,
        timer,
        leaderboard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame deberia usarse con un GamePRovider");
  }

  return context;
};
