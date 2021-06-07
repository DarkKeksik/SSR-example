import React from 'react';


const MainLayout = ({ children = '' }) => {
    return (
        <>
            <header />
            <main>
                { children }
            </main>
            <footer />
        </>
    )
}

export default MainLayout;