import { currentAccount } from '../../utils/account'

export default defineEventHandler(async event => ({ user: await currentAccount(event) }))
