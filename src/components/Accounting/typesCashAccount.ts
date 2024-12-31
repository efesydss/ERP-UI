import { Currency } from '../Hr/Employees/typesEmployee'

export interface CashAccount {
    code: string
    name: string
    currency: Currency
}

export interface CashAccountBaseProps {
    id?: number
    code: string
    name: string
    currency: Currency
}

export interface CashAccountResponse {
    id?: number
    code: string
    name: string
    currency: Currency
}