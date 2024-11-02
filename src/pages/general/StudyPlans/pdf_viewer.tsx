import { Accessor, Component, createSignal, onMount, Setter } from "solid-js";
import * as pdfjsLib from "pdfjs-dist";
import { PrimaryButton, SecondaryButton } from "../../../components/utils";
import { BucketAPIHandler, FileObject } from "../../../supabase/bucket";
import { UserAPIHandler } from "../../../supabase";

export const PdfViewer: Component<{
    currentDocument: Accessor<FileObject | undefined>;
    category: string;
    setShowDocument: Setter<boolean>;
}> = (props) => {
    const [pdfDoc, setPdfDoc] = createSignal<pdfjsLib.PDFDocumentProxy>();
    const [pageNum, setPageNum] = createSignal(1);
    const [pageRendering, setPageRendering] = createSignal(false);
    const [pageCount, setPageCount] = createSignal(0);
    const [pageNumPending, setPageNumPending] = createSignal(0);
    const bucketApi = new BucketAPIHandler();
    const api = new UserAPIHandler();

    let canvas;
    const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>();
    const [canvasCtx, setCanvasCtx] = createSignal<CanvasRenderingContext2D>();

    onMount(async () => {
        const ctx = canvas!.getContext("2d");
        setCanvasCtx(ctx);
        setCanvasRef(canvas);
        const res = await api.getSession();
        if (!res?.user) {
            return;
        }

        let filePath = `${res.user.id}/${props.category}/${props.currentDocument()?.name}`;
        let url = await bucketApi.getSignedUrl("documents", filePath);
        if (url) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = "../../../../node_modules/pdfjs-dist/build/pdf.worker.mjs";
            pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
                setPdfDoc(pdfDoc_);
                setPageCount(pdfDoc_.numPages);
                renderPage(pageNum());
            });
        }
    });

    const renderPage = (num: number) => {
        setPageRendering(true);
        pdfDoc()!
            .getPage(num)
            .then((page) => {
                const viewport = page.getViewport({ scale: 0.8 });
                if (canvasRef()) {
                    canvasRef()!.height = viewport.height;
                    canvasRef()!.width = viewport.width;

                    const renderContext = {
                        canvasContext: canvasCtx()!,
                        viewport,
                    };

                    page.render(renderContext).promise.then(() => {
                        setPageRendering(false);
                        if (pageNumPending() !== 0) {
                            renderPage(pageNumPending());
                            setPageNumPending(0);
                        }
                    });
                }
            });

        setPageNum(num);
    };

    const queueRenderPage = (num: number) => {
        if (pageRendering()) {
            setPageNumPending(num);
        } else {
            renderPage(num);
        }
    };

    const onPrevPage = () => {
        if (pageNum() <= 1) return;
        setPageNum(pageNum() - 1);
        queueRenderPage(pageNum());
    };

    const onNextPage = () => {
        if (pageNum() >= pageCount()) return;
        setPageNum(pageNum() + 1);
        queueRenderPage(pageNum());
    };

    return (
        <div style={"width: 100%;"}>
            <div style={"display: flex; column-gap: 0.5rem; justify-content: center; align-self: stretch; "}>
                {pageNum()} / {pageCount()}
            </div>

            <div style={"display: flex; column-gap: 0.5rem; justify-content: center; align-self: stretch; "}>
                <canvas ref={canvas} id="canvas" width="256" height="256" />
            </div>

            <div
                style={
                    "display: flex; column-gap: 0.5rem; justify-content: center; align-self: stretch; padding-top: 10px"
                }
            >
                <PrimaryButton active onClick={() => props.setShowDocument(false)} text={"Back"} />
                <div style="width: 396px; padding: 8px; border-radius: 4px"></div>
                <SecondaryButton active={pageNum() > 1} onClick={onPrevPage} text={"Previous"} />
                <PrimaryButton active={pageNum() !== pageCount()} onClick={onNextPage} text={"Next"} />
            </div>
        </div>
    );
};
