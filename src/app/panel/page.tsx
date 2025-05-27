import { PanelContent } from "@/components/panelContent";
import { fetchUserData } from "@/services/fetchUserData";
import { use } from "react";

export default function Panel() {
    const user = use(fetchUserData());

    return (
        <>
            <PanelContent user={user} />
        </>
  );
}
