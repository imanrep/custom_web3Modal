import React from "react";

const Layout = (p) => {
    return (
        <div>
            {
                React.cloneElement(p.children,{
                    p
                })
            }
        </div>
    )
}

export default Layout