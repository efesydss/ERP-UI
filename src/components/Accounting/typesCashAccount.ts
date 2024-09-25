//code	string
//name	string
//currency
import { NamedEntity } from '@/utils/sharedTypes'
import { Currency } from "../Hr/Finances/typesFinance"

export interface CashAccount{
    code: string
    name: string
    currency: Currency
}