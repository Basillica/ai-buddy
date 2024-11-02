import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
// create a nice not allowed page with tailwind styling

export const NotAllowed: Component = () => {
    const navigate = useNavigate();
    return (
        <div class="flex flex-col  items-center pt-20">
            <h1 class="text-3xl font-bold text-center mb-4">Access Restricted</h1>
            <p class="text-lg leading-loose mb-8">
                Unfortunately, you don't have permission to access this page at this time.
            </p>
            <p class="text-lg leading-loose">
                Here are some possible reasons why you might not be able to access this page:
            </p>
            <ul class="list-disc pl-4 mb-8">
                <li>You may need to log in to view this page.</li>
                <li>This page may be reserved for specific user roles or permissions.</li>
                <li>This page may be unavailable temporarily due to maintenance or other reasons.</li>
                <button
                    onClick={() => {
                        navigate("/home", {
                            replace: true,
                        });
                    }}
                />
            </ul>
        </div>
    );
};
