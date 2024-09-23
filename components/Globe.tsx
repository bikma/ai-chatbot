// components\Globe.tsx
import React from 'react'

const Globe = () => {
  return (
    <div className="globe">
      {/* Placeholder for Globe Animation */}
      <img src="/globe.png" alt="Spinning Globe" width="150" height="150" />
      <style jsx>{`
        .globe {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Globe
