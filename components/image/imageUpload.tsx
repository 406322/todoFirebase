import { useAtom } from "jotai";
import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import { imageAtom, showImageUploadAtom } from "../../atoms";
// import Slider from "@material-ui/core/Slider";
// import * as api from "planet9-internal/cvAPI";
import getCroppedBase64Img from './crop'
// import ButtonCancel from '../../reusableComp/ButtonCancel'


const ImageUpload = () => {
    const inputRef: any = useRef();

    const triggerFileSelectPopup = () => inputRef.current!.click();

    const [image, setImage] = useAtom(imageAtom);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showImageUpload, setShowImageUpload] = useAtom(showImageUploadAtom)


    const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: any) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                if (typeof reader.result === 'string') {
                    setImage(reader.result);
                }
            });
        }
    }

    const cropAndSave = async () => {
        let croppedBase64Img = await getCroppedBase64Img(image, croppedArea);
        if (typeof croppedBase64Img !== 'undefined') {
            setImage(croppedBase64Img)
            setShowImageUpload(false)
            return
        }
    }

    return (
        <>
            {showImageUpload &&
                <div
                    // onClick={() => setShowUploadModal(false)}
                    className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-opacity-50 bg-slate-800"
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className='w-10/12 px-16 text-center bg-white rounded-md py-14 h-4/5'
                    >
                        <div
                            className='h-full'
                        >
                            {image ? (
                                <>
                                    <div
                                        className='relative h-4/5'
                                    >
                                        <Cropper
                                            image={image}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1}
                                            onCropChange={setCrop}
                                            onZoomChange={setZoom}
                                            onCropComplete={onCropComplete}
                                        />
                                    </div>

                                    <div
                                        className='flex items-center w-3/5 m-auto h-2/10'
                                    >
                                        {/* <Slider
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e, zoom: any) => setZoom(zoom)}
                                /> */}
                                    </div>
                                </>
                            ) : null}
                        </div>

                        <div
                        >
                            <input
                                type='file'
                                accept='image/*'
                                ref={inputRef}
                                onChange={onSelectFile}
                                className='hidden'
                            />
                            <button
                                onClick={triggerFileSelectPopup}
                                className='px-4 py-2 mr-10 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-400'
                            >
                                Velg
                            </button>
                            <button
                                onClick={cropAndSave}
                                className='px-4 py-2 mr-10 text-white bg-green-500 rounded cursor-pointer hover:bg-green-400'
                            >
                                Lagre
                            </button>
                            <button
                                // onClick={() => setShowUploadModal(false)}
                                className='px-4 py-2 mr-10 text-white bg-gray-500 rounded cursor-pointer hover:bg-gray-400'
                            >
                                Avbryt
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default ImageUpload;