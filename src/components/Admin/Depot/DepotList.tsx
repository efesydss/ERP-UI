import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { DepotResponse } from "./typesDepot"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@mui/material"
import { PersonAddAlt1Sharp } from "@mui/icons-material"
import { Route } from "@/routes/_authenticated/admin"

export const DepotList = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  const columns = useMemo<ColumnDef<DepotResponse>[]>(
    () => [
      {
        header: t('name'),
        accessorKey: 'name'
      }
    ],
    [t]
  )

  const DepotListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Sharp />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newDepot')}
        </Button>
      </>
    )
  }

  ///Buradan devam edecek  // EmployeeList.tsx satır:66
}