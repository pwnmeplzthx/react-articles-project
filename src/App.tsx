import { Counter } from "./components/Counter"
import './index.scss'

type Props = {}

const App = (props: Props) => {
    return (
        <div className="app">
            someone text
            <Counter />
        </div>
    )
}

export default App