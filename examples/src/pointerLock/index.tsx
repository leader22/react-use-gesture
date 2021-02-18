import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styles from './styles.css'

const pos = (v: number, max: number, rad: number) => (v < -rad ? max + (v % (max - rad)) : v % (max - rad))

export default function Pinch() {
  const [style, set] = useSpring(() => ({ x: 0, y: 0, rotateZ: 0, scale: 1 }))
  const ref = React.useRef<HTMLDivElement>(null)

  // React.useEffect(() => {
  //   ref.current!.requestPointerLock()
  // }, [])

  // const bind = useDrag(({ first, last, offset: [x, y] }) => {
  //   console.log('yo', x, y)
  //   if (first) ref.current!.requestPointerLock()
  //   if (last) document.exitPointerLock()
  //   const { innerWidth: w, innerHeight: h } = window
  //   // console.log('drag')
  //   set({ x: pos(x, w, 50), y: pos(y, h, 50), immediate: true })
  // }, {domTarget: ref})

  // useDrag(
  //   ({ last, offset: [x, y] }) => {
  //     if (last) document.exitPointerLock()
  //     const { innerWidth: w, innerHeight: h } = window
  //     set({ x: pos(x, w, 50), y: pos(y, h, 50), immediate: true })
  //   },
  //   { domTarget: document }
  // )

  const handlePointerMove = () => {
    ref.current!.requestPointerLock()
    ref.current!.addEventListener('mousemove', e => console.log(e.movementX))
  }

  return (
    <>
      <div className={`${styles.simple}`}>
        <animated.div ref={ref} style={style} onPointerDown={() => handlePointerMove()}></animated.div>
      </div>
    </>
  )
}
