import React from "react"; 

function Footer() {
    const d = new Date(); 
    year = d.getFullYear();

    return <footer><p>Copy right {year}</p></footer>; 
} 

export default Footer; 