import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'

type Props = {}

const AppRouter = (props: Props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routeConfig).map((routeItem) => {
                    return (<Route 
                        key={routeItem.path}
                        path={routeItem.path} 
                        element={routeItem.element}
                    />)
                })}
            </Routes>
        </Suspense>
    )
}

export default AppRouter