const createImage = (url: string) =>
    new Promise((resolve, reject) => {
        const image: any = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error: any) => reject(error));
        image.src = url;
    });

const getCroppedBase64Img = async (imageSrc: any, pixelCrop: any) => {
    if (!pixelCrop || !imageSrc) {
        return;
    }

    const image: any = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx!.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );

    const data = ctx!.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx!.putImageData(
        data,
        0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
        0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );

    return canvas.toDataURL("image/jpeg");
}

export default getCroppedBase64Img;