import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

export const NotFoundPage: Component = (props) => {
    const navigate = useNavigate();
    navigate("/home", {
        replace: true,
    });
    console.log(window.location.pathname, "right here");
    return (
        <div class="flex flex-col  items-center pt-20">
            <h1 class="text-3xl font-bold text-center mb-4">404 Not Found</h1>
            <p class="text-lg leading-loose mb-8">Unfortunately, no page was found at this location.</p>
        </div>
    );
};
