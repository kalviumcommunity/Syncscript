import React from 'react'
import Editor from '../components/Editor'
import Header from '../components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const Code_editor = () => {
    return (
        <div>
            <Header>
                <div className='flex w-fit items-center justify-center gap-2'>
                    <p className='document-title'>Document Title</p>
                </div>
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            </Header>
            <Editor />
        </div>
    )
}

export default Code_editor