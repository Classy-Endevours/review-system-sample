import React, { ReactNode } from 'react'
import DefaultLayout from '../layout/DefaultLayout'


const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <DefaultLayout containerCss='flex justify-center mt-16 mb-20 xs:m-0 xs:h-[100vh]'>
            {children}
        </DefaultLayout>
    )
}

export default Layout