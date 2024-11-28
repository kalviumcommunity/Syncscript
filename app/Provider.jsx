"use client"

import Loader from '@/components/Loader'
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react'
import React from 'react'

const Provider = ({ children }) => {
    return (
        <div>
            <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
                <ClientSideSuspense fallback={<Loader />}>
                    {children}
                </ClientSideSuspense>
            </LiveblocksProvider>
        </div>
    )
}

export default Provider