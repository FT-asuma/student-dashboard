"use client"
import { Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState } from 'react'
const Form = () => {
    const [eyeOpen, setEyeOpen] = useState(false);
    return (
        <form action="#" className='flex flex-col w-full items-center space-y-4 mt-8'>
            <div className="w-full">
                <div className="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7">
                        </path>
                        <rect x="2" y="4" width="20" height="16" rx="2">
                        </rect>
                    </svg>
                    <input type="text" required placeholder='Talaba ID' className="pl-12 bg-[var(--input-grey)] pr-4 py-3 w-full text-gray-700 border border-none transition rounded-2xl ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]" />
                </div>
            </div>
            <div className="w-full">
                <div className="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2">
                        </rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input type="password" required placeholder='Parol' className="pl-12 bg-[var(--input-grey)] pr-4 py-3 w-full text-gray-700 border border-none transition rounded-2xl ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]" />
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            setEyeOpen(!eyeOpen);
                        }}>
                        {eyeOpen ? <><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye w-5 h-5" aria-hidden="true">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg></> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off w-5 h-5" aria-hidden="true"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path><path d="m2 2 20 20"></path></svg>}
                    </button>
                </div>
            </div>
            <div className="w-full flex justify-center items-center flex-row">
                <FormControlLabel
                    className='text-sm text-gray-700'
                    control={<Checkbox size='small' defaultChecked />}
                    label="Eslab qolish"
                />

                <Button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="ml-4 max-w-full w-1/3"
                >
                    Kirish
                </Button>
            </div>

        </form>
    )
}

export default Form