import { onCleanup, createEffect } from "solid-js";
import lottie, { AnimationItem } from "lottie-web";

function LottieAnimation({ animationData }: { animationData: any }) {
    let animationContainer: HTMLDivElement | null = null;
    let animationInstance: AnimationItem | null = null;

    onCleanup(() => {
        // Cleanup the animation when the component unmounts
        // @ts-ignore
        if (animationInstance) animationInstance.destroy();
    });

    // Initialize the animation when the component mounts
    createEffect(() => {
        if (animationContainer) {
            lottie.loadAnimation({
                container: animationContainer,
                animationData: animationData, // The JSON animation data
                renderer: "svg", // You can choose "canvas" or "svg" as the renderer
                loop: true, // Set to true if you want the animation to loop
                autoplay: true, // Set to true if you want the animation to start automatically
            });
        }
    });

    // @ts-ignore
    return <div ref={animationContainer} />;
}

export default LottieAnimation;
