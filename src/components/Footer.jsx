import React from "react";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            Copyright ⓒ {year}
        </footer>
    );
}

export default Footer;
