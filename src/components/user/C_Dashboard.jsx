import React from 'react'
import usePennyPincherStore from '../../store/PennyPincher'

const C_Dashboard = () => {
    const user = usePennyPincherStore((state) => state.user)
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">

                <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">
                    Welcome to the Dashboard 
                </h2>
                <p className="text-center text-gray-600">
                    You are  logged in as {user.username}
                </p>

                </div>
            </div>
        </div>
    )
}

export default C_Dashboard