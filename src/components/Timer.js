import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [current, setCurrent] = useState(new Date(Date.now() + 30 * 60 * 1000));
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent(new Date(Date.now() + 30 * 60 * 1000));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const today = current.toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [hour, setHour] = useState(() => {
    const currentHour = current.getHours() % 12;
    return currentHour === 0
      ? 12
      : currentHour < 10
      ? "0" + currentHour
      : currentHour;
  });
  const [minute, setMinute] = useState(() => {
    const currentMin = current.getMinutes();
    return currentMin < 10 ? "0" + currentMin : currentMin;
  });
  const [meridian, setMeridian] = useState(
    current.getHours() >= 12 ? "pm" : "am"
  );
  // const currentMeridian = current
  //   .toLocaleTimeString()
  //   .slice(-2)
  //   .toLowerCase();
  let isToday = React.useMemo(() => today === date, [today, date]);
  const { minHour, minMinute, maxHour } = React.useMemo(() => {
    let minHour;
    let minMinute;
    let maxHour;
    if (isToday) {
      minHour = current.getHours() % 12;
      if (minHour >= 1) maxHour = 11;
      if (
        parseInt(hour) === minHour ||
        (minHour === 0 && parseInt(hour) === 12)
      ) {
        minMinute = current.getMinutes();
      }
      if (minHour === 0) minHour = 1;
    }
    return { minHour, minMinute, maxHour };
  }, [isToday, hour, meridian, current]);
  useEffect(() => {
    if (minute < minMinute) setMinute(minMinute);
  }, [minMinute]);
  useEffect(() => {
    if (hour < minHour) setHour(minHour);
  }, [minHour]);
  useEffect(() => {
    if (isToday && current.getHours() >= 12) setMeridian("pm");
  }, [date]);
  return (
    <div>
      <label>Date: </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={today}
      />
      <label>Time: </label>
      <input
        type="number"
        value={hour}
        onChange={(e) => {
          const val = e.target.value;
          setHour(val < 10 ? "0" + val : val);
        }}
        placeholder="hour"
        min={minHour || 1}
        max={maxHour || 12}
      />
      <input
        type="number"
        value={minute}
        onChange={(e) => {
          const val = e.target.value;
          setMinute(val < 10 ? "0" + val : val);
        }}
        placeholder="min"
        min={minMinute || 0}
        max={59}
      />
      <select
        value={meridian}
        onChange={(e) => {
          if (isToday && current.getHours() >= 12) {
            setMeridian("pm");
          } else setMeridian(e.target.value);
        }}
      >
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
    </div>
  );
};
