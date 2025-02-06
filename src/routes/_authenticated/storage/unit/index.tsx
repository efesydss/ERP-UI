import { createFileRoute } from '@tanstack/react-router'
import { UnitList } from '@/components/Storage/unit/UnitList'

const disabledModules = import.meta.env.VITE_DISABLED_MODULES?.split(',') || [];

const isModuleEnabled = (moduleName: string) => !disabledModules.includes(moduleName);

export const Route = createFileRoute('/_authenticated/storage/unit/')({
  component: () => <div> {isModuleEnabled('sales') && <UnitList />}</div>
})