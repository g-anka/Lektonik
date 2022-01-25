import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div style={{marginTop: "20%", textAlign: "center"}}>
            Такая страница не существует. Перейти на <Link to="/">главную.</Link>
        </div>
    )
};