import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [current, setCurrent] = useState(new Date(Date.now() + 30 * 60 * 1000));
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
  let isToday = React.useMemo(() => today === date, [today, date]);
  let { minHour, minMinute } = React.useMemo(() => {
    let minHour;
    let minMinute;
    if (isToday) {
      minHour = current.getHours() % 12 || 12;
      if (parseInt(hour) === minHour) {
        minMinute = current.getMinutes();
      }
    }
    return { minHour, minMinute };
  }, [isToday, hour]);
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
          setHour(e.target.value < 10 ? "0" + e.target.value : e.target.value);
        }}
        placeholder="hour"
        min={minHour || 1}
        max={12}
      />
      <input
        type="number"
        value={minute}
        onChange={(e) =>
          setMinute(e.target.value < 10 ? "0" + e.target.value : e.target.value)
        }
        placeholder="min"
        min={minMinute || 0}
        max={59}
      />
      <select
        value={meridian}
        onChange={(e) => {
          if (isToday) {
            setMeridian(current.getHours() >= 12 ? "pm" : "am");
          } else setMeridian(e.target.value);
        }}
      >
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
    </div>
  );
};
