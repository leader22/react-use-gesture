import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styles from './styles.css'

// document.addEventListener('gesturestart', e => e.preventDefault())
// document.addEventListener('gesturechange', e => e.preventDefault())

export default function Pinch() {
  const [{ scale1, ...style }, set] = useSpring(() => ({ x: 0, y: 0, rotateZ: 0, scale: 1, scale1: 1 }))
  const domTarget = React.useRef(null)

  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        set({ x, y })
      },
      onPinch: ({ event, initial: [id], da: [d], offset: [, a], memo = [style.scale.get(), scale1.get()] }) => {
        const scale = event.scale ? memo[0] * event.scale : memo[0]
        const scale1 = (memo[1] * d) / id
        // console.log(event.scale)
        set({ scale1, scale, rotateZ: a })
        return memo
      },
    },
    {
      domTarget,
      eventOptions: { passive: false },
      // pinch: {
      //   initial: () => [(style.scale.get() - 1) * 260, style.rotateZ.get()],
      // },
    }
  )

  return (
    <div className={`${styles.simple} flex`}>
      <animated.div ref={domTarget} style={style} />
      <animated.div
        style={{ scale: scale1, position: 'absolute', pointerEvents: 'none', opacity: 0.5, background: 'blue' }}
      />
    </div>
  )
}
