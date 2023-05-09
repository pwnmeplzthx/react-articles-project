import { classNames } from "shared/lib/classNames/classNames"
import { Navbar } from "widgets/Navbar"
import { useTheme } from "./providers/ThemeProvider"
import { AppRouter } from "./providers/router"
import './styles/index.scss'

type Props = {}

const App = (props: Props) => {

    const {theme} = useTheme()

    return (
        <div className={classNames('app', [theme])}>
            <Navbar />
            <AppRouter />
        </div>
    )
}

export default App