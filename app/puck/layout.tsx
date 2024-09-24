import React, { ReactNode } from 'react'
import DefaultLayout from '../layout/DefaultLayout'


const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <DefaultLayout>
            <div className="outer-div transform translate-y-16">
                {children}
            </div>
        </DefaultLayout>
    )
}

export default Layout