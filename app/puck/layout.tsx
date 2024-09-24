import React, { ReactNode } from 'react'
import DefaultLayout from '../layout/DefaultLayout'


const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <DefaultLayout>
            <div className="puck-container mt-12">
                {children}
            </div>
        </DefaultLayout>
    )
}

export default Layout