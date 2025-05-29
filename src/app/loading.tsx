import Image from "next/image";

export default function Loading() {
    return (
        <>
            <div className="z-50 bg-[#89D8FC] w-full min-h-screen flex justify-center items-center">
                <Image className="w-32 h-32 object-cover" src="/images/loading.gif" width={400} height={400} alt="imagem de loading" />
            </div>
        </>
    )
}