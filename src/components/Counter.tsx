import { useState } from "react"
import classes from './Counter.module.scss'

type Props = {}

export const Counter = (props: Props) => {
    const [count, setCount] = useState(0)

    const increament = () => {
        setCount(count + 1)
    }

    return (
        <div className={classes.btn}>
            <h1>{count}</h1>
            <button onClick={increament}>increament</button>
        </div>
    )
}