import { Suspense } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async"
import { MainPageAsync } from "./pages/MainPage/MainPage.async"
import './styles/index.scss'
import { useTheme } from "./theme/useTheme"
import { classNmaes } from "./helpers/classNames/classNames"

type Props = {}

const App = (props: Props) => {

    const {theme, toggleTheme} = useTheme()

    return (
        <div className={classNmaes('app', [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPageAsync />}/>
                    <Route path={'/'} element={<MainPageAsync />}/>
                </Routes>
            </Suspense>
        </div>
    )
}

export default App