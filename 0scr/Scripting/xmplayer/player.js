if (!Module) Module = {};
Module.locateFile = (path) => "/0scr/Scripting/xmplayer/" + path;

Module.onRuntimeInitialized = async () => {
    const audioElement = document.getElementById("xmplayer");

    console.log("Fetching XM…");
    console.log("Path:", "/0scr/audio/CORE_ConceptDraw_Pro.xm");

    const response = await fetch("/0scr/audio/CORE_ConceptDraw_Pro.xm");
    const array = new Uint8Array(await response.arrayBuffer());

    const modPtr = Module._malloc(array.length);
    Module.HEAPU8.set(array, modPtr);       // <- this will now work

    const mod = new Module.OpenMPT.Module(modPtr, array.length);

    const ctx = new AudioContext();
    const node = ctx.createScriptProcessor(4096, 0, 2);

    node.onaudioprocess = (e) => {
        const L = e.outputBuffer.getChannelData(0);
        const R = e.outputBuffer.getChannelData(1);
        const buf = Module.HEAPF32.subarray(0, 4096 * 2);

        mod.read_interleaved_stereo(48000, 4096, buf);

        for (let i = 0; i < 4096; i++) {
        L[i] = buf[i * 2];
        R[i] = buf[i * 2 + 1];
        }
    };

    audioElement.addEventListener("play", () => {
        ctx.resume();
        node.connect(ctx.destination);
    });

    audioElement.addEventListener("pause", () => {
        node.disconnect();
    });
};
