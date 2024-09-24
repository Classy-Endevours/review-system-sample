import React, { ReactNode } from 'react'
import DefaultLayout from './DefaultLayout'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default Layout