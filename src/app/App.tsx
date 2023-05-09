import { classNames } from "shared/lib/classNames/classNames"
import { Navbar } from "widgets/Navbar"
import { useTheme } from "./providers/ThemeProvider"
import { AppRouter } from "./providers/router"
import './styles/index.scss'
import { Sidebar } from "widgets/Sidebar"
import { Suspense } from "react"

const App = () => {

    const {theme} = useTheme()

    return (
        <div className={classNames('app', [theme])}>
            {/* Глобальное оборачивание компонентов, т.к. переводы будут подгружаться асинхронно */}
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App