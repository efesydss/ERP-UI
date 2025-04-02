import { createFileRoute } from '@tanstack/react-router'
import { FixtureGroupList } from '@/components/Storage/FixtureGroup/FixtureGroupList'
export const Route = createFileRoute('/_authenticated/storage/fixtureGroups/')({
  component: () => <FixtureGroupList />
})