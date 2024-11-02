import type { Component } from "solid-js";

const App: Component<{ message: string }> = (props) => {
    return (
        <>
            <div
                style="width: 100%; height: 40%; padding-left: 12px; padding-right: 12px; 
            padding-top: 8px; padding-bottom: 8px; justify-content: flex-start;
            align-items: center; gap: 12px; display: inline-flex;"
            >
                <div style="flex: 1 1 0; height: 15px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                    <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.29688 9.86719C1.25 9.9375 1.25 10.0078 1.25 10.0781C1.25 10.3125 1.4375 10.5234 1.67188 10.5234H11.3047C11.5391 10.5234 11.75 10.3125 11.75 10.0781C11.75 10.0078 11.7266 9.9375 11.6797 9.86719L6.96875 1.78125C6.875 1.61719 6.6875 1.5 6.5 1.5C6.28906 1.5 6.10156 1.61719 6.00781 1.78125L1.29688 9.86719ZM0.640625 9.49219L5.35156 1.40625C5.58594 1.00781 6.03125 0.75 6.5 0.75C6.94531 0.75 7.39062 1.00781 7.625 1.40625L12.3359 9.49219C12.4297 9.65625 12.5 9.86719 12.5 10.0781C12.5 10.7344 11.9609 11.25 11.3047 11.25H1.67188C1.01562 11.25 0.5 10.7344 0.5 10.0781C0.5 9.86719 0.546875 9.65625 0.640625 9.49219ZM6.5 3.75C6.6875 3.75 6.875 3.9375 6.875 4.125V7.125C6.875 7.33594 6.6875 7.5 6.5 7.5C6.28906 7.5 6.125 7.33594 6.125 7.125V4.125C6.125 3.9375 6.28906 3.75 6.5 3.75ZM5.9375 9C5.9375 8.69531 6.17188 8.4375 6.5 8.4375C6.80469 8.4375 7.0625 8.69531 7.0625 9C7.0625 9.32812 6.80469 9.5625 6.5 9.5625C6.17188 9.5625 5.9375 9.32812 5.9375 9Z"
                                fill="#ffffff"
                            />
                        </svg>
                    </div>
                    <p style=" font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                        {props.message}
                    </p>
                </div>
            </div>
        </>
    );
};

export default App;
