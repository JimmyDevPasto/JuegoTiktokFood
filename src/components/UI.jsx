import { useRef, useEffect } from "react";
import { DEBBUG_MODE } from "../App";
import { useGame } from "../hooks/useGame";
import { randInt } from "three/src/math/MathUtils";

import IconFriesman from "../assets/icon-fries.png";
import IconHotdogman from "../assets/icon-dog.png";

const fakeUser = {
  username: "Jimmy",
  userPhotoUrl: "https://lh3.googleusercontent.com/a/ACg8ocKwAbmduYjW2_DoszI6VFxM--bmryzglroyzTPUplcDS3LjHMUE=s288-c-no",
};

const gradients = [
  "bg-gradient-to-t from-yellow-600 to-yellow-400",
  "bg-gradient-to-t from-gray-600 to-slate-300",
  "bg-gradient-to-t from-yellow-900 to-amber-600",
  "bg-gradient-to-t from-black to-gray-600",
];

export const UI = () => {
  const leaderboardRef = useRef();
  const { status, friesman, hotdogman, dispatch, leaderboard, timer } = useGame();

  useEffect(() => {
    let toEnd = false;
    const interval = setInterval(() => {
      leaderboardRef.current?.scrollTo({
        top: 0,
        left: toEnd ? leaderboardRef.current.scrollWidth : 0,
        behavior: "smooth",
      });
      toEnd = !toEnd;
    }, 4500);
    return () => clearInterval(interval);
  }, []);
 
    
  return (
    <main className="fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col gap-4 items-stretch justify-between pointer-events-none">
      {/* Título en la parte superior */}
      {status === "start" && (
        <div className="w-full py-4 bg-black text-center">
          <h1 className="text-5xl text-yellow-500 font-bold font-Creepster">
            Pesadillas de Sabores
          </h1>
        </div>
      )}
      <div
        className="flex w-full overflow-x-auto pointer-events-auto"
        ref={leaderboardRef}
      >
        {leaderboard.map((player, index) => (
          <div
            key={index}
            className={`p-2 flex-shrink-0 w-32 flex flex-col justify-center items-center gap-1
            ${gradients[index < 3 ? index : 3]}`}
          >
            <img
              className="w-20 h-20 rounded-full border-4 border-white border-opacity-50"
              src={player.userPhotoUrl}
              alt="Player avatar"
            />
            <h2 className="font-bold text-sm text-white truncate max-w-full">
              #{index + 1} {player.username}
            </h2>
            <div className="flex items-center gap-1">
              <img src={IconFriesman} alt="friesman icon" className="w-5" />
              <p className="font-bold text-white">
                {player.friesmanKills || 0}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img src={IconHotdogman} alt="hotdogman icon" className="w-5" />
              <p className="font-bold text-white">
                {player.hotdogmanKills || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
      {status === "start" && (
        <div className="p-4">
          <p className="text-center text-white text-4xl font-bold">
            🏋️‍♂️🏃‍♀️🍟
            <br />
            Salva a Samanta de caer en la tentación!
          </p>
          <p className="text-left text-white text-lg">
            <br />
            <b>✍️ Type</b> la comida chatarra acabó con tu dieta
            <br />
            <b>❤️ Like</b> Aguanta la tentación
            <br />
            <b>🎁 Gift</b> una ayudita para Samanta
            <br />
          </p>
          <button
            className="mt-2 bg-yellow-500 text-black font-bold p-4 rounded-md pointer-events-auto w-full"
            onClick={() => dispatch({ type: "start" })}
          >
            START
          </button>
        </div>
      )}
      <div className="p-4">
        {status === "gameover" && (
          <>
            <p className="text-center text-white text-lg font-bold">
              ¡Felicitaciones!
              <br />
              ¡Salvaste a Susana de no romper su dieta!
            </p>
            <button
              className="mt-2 bg-green-200 text-yellow-500 font-bold p-4 rounded-md pointer-events-auto w-full"
              onClick={() => dispatch({ type: "restart" })}
            >
              Juguemos de Nuevo
            </button>
          </>
        )}
        {status === "playing" && (
          <p className="text-right text-4xl font-bold text-white">⏳ {timer}</p>
        )}
        {status === "playing" && DEBBUG_MODE && (
          <div className="mt-4 flex gap-4">
            <button
              className="mt-4 bg-blue-300 p-4 rounded-md pointer-events-auto"
              onClick={() =>
                dispatch({
                  type: "attack",
                  player: fakeUser,
                  name: friesman[randInt(0, friesman.length - 1)].name,
                })
              }
            >
              CHAT
            </button>
            <button
              className="mt-4 bg-yellow-200 p-4 rounded-md pointer-events-auto"
              onClick={() => {
                dispatch({ type: "like", player: fakeUser });
              }}
            >
              LIKE
            </button>
            <button
              className="mt-4 bg-rose-400 p-4 rounded-md pointer-events-auto"
              onClick={() => dispatch({ type: "bomb", player: fakeUser })}
            >
              GIFT
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
