interface SkeletonTasksProps {
    numberOfItems: number;
}

export function SkeletonTasks({ numberOfItems }: SkeletonTasksProps) {
    return (
        <>
            {Array.from({ length: numberOfItems }).map((_, index) => (
                <div
                    key={index}
                    className="relative w-full p-3 bg-gray-200 rounded-md flex flex-col gap-3 animate-pulse"
                >
                    <div className="h-5 w-2/3 bg-gray-300 rounded"></div>

                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-300 rounded"></div>

                    <div className="bg-gray-300 w-20 h-6 rounded-lg"></div>

                    <div className="w-7 h-7 rounded-full bg-gray-300 absolute top-2 right-2"></div>

                    <div className="w-7 h-7 rounded-md bg-gray-300 absolute bottom-2 right-2"></div>
                </div>
            ))}
        </>
    );
}