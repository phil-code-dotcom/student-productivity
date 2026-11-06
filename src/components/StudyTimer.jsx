import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Button from "./Button";

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

function StudyTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useLocalStorage("totalStudySeconds", 0);

  // tick every second while the timer is running
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);

    // clean up so we never have two intervals running
    return () => clearInterval(intervalId);
  }, [isRunning]);

  function stopSession() {
    setIsRunning(false);
    setTotalSeconds((prev) => prev + sessionSeconds);
    setSessionSeconds(0);
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-2 text-lg font-bold">Study Tracker</h2>
      <p className="text-3xl font-bold">{formatTime(sessionSeconds)}</p>
      <p className="mb-3 text-sm text-slate-500">
        Total study time: {formatTime(totalSeconds + sessionSeconds)}
      </p>
      <div className="flex gap-2">
        <Button onClick={() => setIsRunning(true)} variant="solid" disabled={isRunning}>
          Start
        </Button>
        <Button onClick={stopSession} disabled={!isRunning}>
          Stop
        </Button>
      </div>
    </section>
  );
}

export default StudyTimer;