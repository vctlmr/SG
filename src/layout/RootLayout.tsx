import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    {/* <Navlink></Navlink> */}
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}