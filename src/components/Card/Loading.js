"use client"
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
    return <>
        <div className="gap-4">
            {/* <div className={styles.imageContainer}> */}
            <Skeleton className='w-44 h-44 bg-slate-200 mb-2 mt-4 rounded-none' />
            {/* </div> */}

            <div className="content">
                <Skeleton className='w-20 h-4 bg-slate-200 mt-2 rounded-none' />
                <div className="text-gray400">
                    <Skeleton className='w-24 h-4 bg-slate-200 mt-2 rounded-none' />
                </div>
                <Skeleton className='w-44 h-4 bg-slate-200 mt-2 rounded-none' />
            </div>
        </div>

    </>;
};

export default LoadingCard;
