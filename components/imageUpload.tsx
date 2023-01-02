import Image from 'next/image'

export const ImageUpload = ({ handleChange, preview, setPreview }: { handleChange: any, preview: string | null, setPreview: any }) => {

    return (
        <>
            {preview

                ? <div className="relative block w-40 h-40 bg-gray-100 rounded-full shadow-xl">
                    <Image src={preview} layout="fill" className="rounded-full" alt={preview} />
                    <button
                        className="absolute top-0 right-0 z-10 p-2 text-gray-700 bg-white border rounded-full"
                        onClick={() => setPreview(null)}
                    >
                        <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 448 512">
                            <path
                                d="M296 432h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8zm-160 0h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8zM440 64H336l-33.6-44.8A48 48 0 00264 0h-80a48 48 0 00-38.4 19.2L112 64H8a8 8 0 00-8 8v16a8 8 0 008 8h24v368a48 48 0 0048 48h288a48 48 0 0048-48V96h24a8 8 0 008-8V72a8 8 0 00-8-8zM171.2 38.4A16.1 16.1 0 01184 32h80a16.1 16.1 0 0112.8 6.4L296 64H152zM384 464a16 16 0 01-16 16H80a16 16 0 01-16-16V96h320zm-168-32h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8z">
                            </path>
                        </svg>
                    </button>
                </div>

                : <div>
                    <label
                        className="flex flex-col items-center justify-center w-40 h-40 tracking-wide text-gray-700 uppercase bg-white border rounded-full shadow cursor-pointer dark:text-gray-200 custom-file dark:bg-gray-800 dark:border-gray-800">
                        <svg className="w-10 h-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z">
                            </path>
                        </svg>
                        <span className="mt-2 text-xs font-semibold leading-normal">
                            Upload Photo
                        </span>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg, .gif"
                            className="hidden"
                            onChange={handleChange}
                        />
                    </label>
                </div>
            }
        </>
    )
}
