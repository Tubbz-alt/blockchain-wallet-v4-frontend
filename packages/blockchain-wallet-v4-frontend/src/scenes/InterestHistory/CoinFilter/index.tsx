import { bindActionCreators, compose, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import styled from 'styled-components'

import { actions } from 'data'
import { Props as OwnProps, SuccessStateType } from '..'
import { Value } from '../model'
import SelectBoxCoin from 'components/Form/SelectBoxCoin'

const FilterText = styled(Value)`
  margin-right: 8px;
  font-size: 16px;
`
const SelectCoinWrapper = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
`

class CoinFilter extends React.PureComponent<InjectedFormProps & Props> {
  onChange = (e, val) => {
    this.props.interestActions.fetchInterestTransactions(true, val)
  }
  render () {
    const { txPages } = this.props
    return txPages ? (
      <SelectCoinWrapper>
        <FilterText>
          <FormattedMessage
            id='scenes.interest.history.filter'
            defaultMessage='Filter by:'
          />
        </FilterText>
        <Field
          additionalOptions={[{ text: 'All Coins', value: 'ALL' }]}
          component={SelectBoxCoin}
          height='32px'
          label='Select Coin'
          name='coin'
          onChange={this.onChange}
          type='request'
        />
      </SelectCoinWrapper>
    ) : null
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  formActions: bindActionCreators(actions.form, dispatch)
})

const connector = connect(null, mapDispatchToProps)
type Props = ConnectedProps<typeof connector> & OwnProps & SuccessStateType

const enhance = compose<any>(
  reduxForm({
    form: 'interestHistoryCoin',
    initialValues: { coin: 'ALL' }
  }),
  connector
)

export default enhance(CoinFilter)