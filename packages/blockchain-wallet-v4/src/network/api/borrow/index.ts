import { CoinType } from 'core/types'
import { LoanType, MoneyType, OfferType } from './types'

export default ({ nabuUrl, authorizedGet, authorizedPost }) => {
  const closeLoanWithPrincipal = (
    loan: LoanType,
    collateralWithdrawAddresses: { [key in CoinType]?: string }
  ): { loan: LoanType } =>
    authorizedPost({
      url: nabuUrl,
      endPoint: `/user/loans/${loan.loanId}/close_with_principal`,
      data: {
        collateralWithdrawAddresses
      }
    })

  const createLoan = (
    offerId: string,
    principalAmount: MoneyType,
    principalWithdrawAddresses: { [key in CoinType]?: string }
  ): { loan: LoanType } =>
    authorizedPost({
      url: nabuUrl,
      endPoint: '/user/loans',
      contentType: 'application/json',
      data: {
        offerId,
        principalAmount,
        principalWithdrawAddresses
      }
    })

  const getLoanFinancials = (loanId: string) =>
    authorizedGet({
      url: nabuUrl,
      endPoint: `/user/loans/${loanId}/financials`
    })

  const getOffers = (): Array<OfferType> =>
    authorizedGet({
      url: nabuUrl,
      endPoint: '/lending/offers'
    })

  const getUserBorrowHistory = (): Array<LoanType> =>
    authorizedGet({
      url: nabuUrl,
      endPoint: '/user/loans'
    })

  const notifyLoanDeposit = (
    loanId: string,
    amount: MoneyType,
    dstAddress: string,
    status: 'REQUESTED' | 'FAILED',
    type: 'COLLATERAL_DEPOSIT' | 'PRINCIPAL_DEPOSIT'
  ): { loan: LoanType } =>
    authorizedPost({
      url: nabuUrl,
      endPoint: `/users/loans/${loanId}/deposit`,
      data: {
        amount,
        dstAddress,
        status,
        type
      }
    })

  return {
    closeLoanWithPrincipal,
    createLoan,
    getLoanFinancials,
    getOffers,
    getUserBorrowHistory,
    notifyLoanDeposit
  }
}
