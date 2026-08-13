import { motion } from "framer-motion"

const breathingAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  },
}

const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
  },
}

const swayAnimation = {
  animate: {
    rotate: [-2, 2, -2],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
  },
}

export function LotusFlower({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...breathingAnimation}
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 20C60 20 45 40 45 60C45 80 60 100 60 100C60 100 75 80 75 60C75 40 60 20 60 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 30C60 30 30 50 30 70C30 90 60 100 60 100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 30C60 30 90 50 90 70C90 90 60 100 60 100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 40C60 40 15 55 15 75C15 95 60 100 60 100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 40C60 40 105 55 105 75C105 95 60 100 60 100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="100" r="3" fill="currentColor" opacity="0.3" />
    </motion.svg>
  )
}

export function TreePose({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...swayAnimation}
      className={className}
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="15" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M50 23V75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 35L30 50"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 35L70 50"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 75L35 110"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 75L50 110L65 95"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 50L25 45"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M70 50L75 45"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

export function MeditationFigure({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...breathingAnimation}
      className={className}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M60 30V55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M60 40L35 55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M60 40L85 55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M35 55L25 50"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M85 55L95 50"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M60 55L30 75L90 75L60 55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 75L20 85"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M90 75L100 85"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

export function ChildsPose({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...floatingAnimation}
      className={className}
      viewBox="0 0 140 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="35" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M33 35C33 35 50 30 70 35C90 40 100 50 100 50"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M100 50L120 65"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M100 50L115 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M33 35L25 55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M25 55L15 65"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

export function SunSymbol({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...breathingAnimation}
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="10"
          x2="50"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </motion.svg>
  )
}

export function Mandala({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" as const }}
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="10"
          x2="100"
          y2="190"
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.2"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="40"
          rx="15"
          ry="30"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </motion.svg>
  )
}

export function BreathingIcon({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...breathingAnimation}
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 15C40 15 25 25 25 40C25 55 40 65 40 65C40 65 55 55 55 40C55 25 40 15 40 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 25C40 25 32 32 32 40C32 48 40 55 40 55C40 55 48 48 48 40C48 32 40 25 40 25Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.3" />
    </motion.svg>
  )
}

export function WarriorPose({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...swayAnimation}
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="18" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M60 26V65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 45L60 38L95 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 65L30 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 65L95 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 45L20 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M95 45L100 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  )
}

export function DownwardDog({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...floatingAnimation}
      className={className}
      viewBox="0 0 130 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="30" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M27 33L50 55L80 45L105 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 33L15 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M105 60L115 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M105 60L115 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 55L10 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  )
}

export function CobraPose({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...breathingAnimation}
      className={className}
      viewBox="0 0 120 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 25C40 30 60 38 90 40C100 41 110 42 115 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 27L15 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M90 40L95 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M115 42L118 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 40L10 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  )
}

export function KidsTreePose({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      {...swayAnimation}
      className={className}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="18" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 27V70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 38L28 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 38L72 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 52L22 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M72 52L78 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 70L35 110" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 70L55 85L65 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}
