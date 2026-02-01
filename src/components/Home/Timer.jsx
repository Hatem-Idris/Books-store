import { useState, useEffect, useCallback } from "react"

export default function CircularTimer({
  initialHours = 30,
  initialMinutes = 0,
  initialSeconds = 0,
}) {
  const totalInitialSeconds =
    initialHours * 3600 + initialMinutes * 60 + initialSeconds
  const [timeLeft, setTimeLeft] = useState(totalInitialSeconds)
  const [initialTime] = useState(totalInitialSeconds)

  const progress = initialTime > 0 ? (timeLeft / initialTime) * 100 : 0

  useEffect(() => {
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  const formatTime = useCallback((totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    }
  }, [])

  const { hours, minutes, seconds } = formatTime(timeLeft)

  const size = 175
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const passedPercent = 100 - progress
  const passedArcLength = (passedPercent / 100) * circumference
  const angle = (passedPercent / 100) * 360 - 90
  const angleRad = (angle * Math.PI) / 180
  const ballX = size / 2 + radius * Math.cos(angleRad)
  const ballY = size / 2 + radius * Math.sin(angleRad)

  return (
    <div>
      <div style={{ position: "relative", width: size, height: size }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)",
          }}
        />
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="white"
            stroke="#f0e8ec"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e91e8c"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={0}
            opacity={0.35}
            style={{ transition: "all 1s linear" }}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e91e8c"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${passedArcLength} ${circumference}`}
            strokeDashoffset={0}
            style={{ transition: "all 1s linear" }}
          />
        </svg>
        {progress > 0 && (
          <div
            style={{
              position: "absolute",
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#e91e8c",
              left: ballX - 8,
              top: ballY - 8,
              boxShadow: "0 2px 8px rgba(200, 50, 100, 0.4)",
              transition: "all 1s linear",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "2.25rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: "#1a1a1a",
            }}
          >
            {hours}:{minutes}:{seconds}
          </span>
        </div>
      </div>
    </div>
  )
}