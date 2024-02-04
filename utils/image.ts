const getBase64UrlFromImage = async (image: File): Promise<string | ArrayBuffer | null> => new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
        const srcData = fileReader.result;
        resolve(srcData);
    };
    fileReader.readAsDataURL(image);
});


export {
    getBase64UrlFromImage,
};
