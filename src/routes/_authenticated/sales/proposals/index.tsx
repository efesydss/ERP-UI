import { createFileRoute } from '@tanstack/react-router'
import { ProposalsList } from '@/components/Sales/Proposals/ProposalsList'

export const Route = createFileRoute('/_authenticated/sales/proposals/')({
  component: RouteComponent,
})

const disabledModules = import.meta.env.VITE_DISABLED_MODULES?.split(',') || [];

const isModuleEnabled = (moduleName: string) => !disabledModules.includes(moduleName);

function RouteComponent() {
  {
    console.log("Tüm ENV Değişkenleri:", import.meta.env);
    console.log("VITE_DISABLED_MODULES:", import.meta.env.VITE_DISABLED_MODULES);
    console.log("Parsed Modules:", disabledModules);

  }
  return <div> {isModuleEnabled('sales') && <ProposalsList />}</div>


}
