import type { Component } from "solid-js";

const App: Component<{ message: string }> = (props) => {
    return (
        <>
            <div
                style="width: 100%; height: 40%; padding-left: 12px; padding-right: 12px; 
            padding-top: 8px; padding-bottom: 8px; justify-content: flex-start;
            align-items: center; gap: 12px; display: inline-flex;"
            >
                <div style="flex: 1 1 0; height: 10px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                    <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.5 0.75C4.60156 0.75 2.89062 1.75781 1.95312 3.375C0.992188 5.01562 0.992188 7.00781 1.95312 8.625C2.89062 10.2656 4.60156 11.25 6.5 11.25C8.375 11.25 10.0859 10.2656 11.0234 8.625C11.9844 7.00781 11.9844 5.01562 11.0234 3.375C10.0859 1.75781 8.375 0.75 6.5 0.75ZM6.5 12C4.34375 12 2.375 10.875 1.29688 9C0.21875 7.14844 0.21875 4.875 1.29688 3C2.375 1.14844 4.34375 0 6.5 0C8.63281 0 10.6016 1.14844 11.6797 3C12.7578 4.875 12.7578 7.14844 11.6797 9C10.6016 10.875 8.63281 12 6.5 12ZM9.00781 4.78125L6.00781 7.78125C5.86719 7.92188 5.60938 7.92188 5.46875 7.78125L3.96875 6.28125C3.82812 6.14062 3.82812 5.88281 3.96875 5.74219C4.10938 5.60156 4.36719 5.60156 4.50781 5.74219L5.75 6.98438L8.46875 4.24219C8.60938 4.10156 8.86719 4.10156 9.00781 4.24219C9.14844 4.38281 9.14844 4.64062 9.00781 4.78125Z"
                                fill="#ffffff"
                            />
                        </svg>
                    </div>
                    <div style=" font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word; color: white">
                        {props.message}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
