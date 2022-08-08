import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const NavBar = ({ navigation }) => {

    return (
        <nav className="bg-gray-800 w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



        </nav >
    )
}

export default NavBar;