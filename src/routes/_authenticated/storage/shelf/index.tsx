import { createFileRoute } from '@tanstack/react-router'
import { ShelfList } from '@/components/Storage/shelf/ShelfList'

const disabledModules = import.meta.env.VITE_DISABLED_MODULES?.split(',') || [];

const isModuleEnabled = (moduleName: string) => !disabledModules.includes(moduleName);

export const Route = createFileRoute('/_authenticated/storage/shelf/')({
  component: () => <div> {isModuleEnabled('sales') && <ShelfList />}</div>
})