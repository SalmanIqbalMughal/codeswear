'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const Loadingbar = () => {

    const [progress, setProgress] = useState(0)
    const pathname = usePathname();

    useEffect(() => {
        setProgress(30);
        setTimeout(() => {
             setProgress(100);
        }, 250);       
    }, [pathname])

    return (
        <div>
            <LoadingBar
                color='#f11946'
                progress={progress}
                waitingTime={400}
                onLoaderFinished={() => setProgress(0)}
            />
        </div>
    )
}

export default Loadingbar
