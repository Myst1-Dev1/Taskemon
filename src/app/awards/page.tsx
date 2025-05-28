import { AwardsContent } from "@/components/awardsContent";
import { fetchUserData } from "@/services/fetchUserData";
import { use } from "react";

export default function Awards() {
    const user = use(fetchUserData());

    return (
        <>
            <AwardsContent user={user} />            
        </>
    )
}