import { HistoricContent } from "@/components/historicContent";
import { fetchUserData } from "@/services/fetchUserData";
import { use } from "react";

export default function Historic() {
    const user = use(fetchUserData());

    return (
        <>
            <HistoricContent user={user} />
        </>
    )
}