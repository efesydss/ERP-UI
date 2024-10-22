import { DepotList } from "@/components/Admin/Depot/DepotList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/admin/')({
    component: () => <DepotList />
})