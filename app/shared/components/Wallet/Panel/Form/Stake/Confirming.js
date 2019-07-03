// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

import StatsFetcher from '../../../../../utils/StatsFetcher';

class WalletPanelFormStakeConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      account,
      accountName,
      balance,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      netOriginal,
      onBack,
      settings,
      t
    } = this.props;

    const cpuAmount = decimalCpuAmount.toNumber();
    const netAmount = decimalNetAmount.toNumber();

    const cpuDifference = cpuAmount - cpuOriginal.toNumber();
    const netDifference = netAmount - netOriginal.toNumber();

    const lessThanOneEosStaked = (cpuAmount < 1 || netAmount < 1);

    const statsFetcher = new StatsFetcher(account, balance, settings);

    const refundDate = statsFetcher.refundDate();

    const unstaking = (cpuDifference < 0 || netDifference < 0);

    const unstakingWhenAmountBeingUnstaked = refundDate && unstaking;

    return (
      <div>
        {(accountName !== account.account_name)
        ? (
          <Header textAlign="center">
            <p>{t('stake_confirming_header_one')} {accountName}</p>
          </Header>
        ) : ''}

        <Segment padding="true" basic>
          {(unstaking) ? (
            <Header textAlign="center">
              {t('about_to_unstake_tokens')}
            </Header>
          ) : ''}
          <Segment.Group>
            {(netDifference > 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="green">
                    <Icon name="wifi" />{t('about_to_stake_to_net')} {netDifference.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
                  </font>
                  <Header.Subheader>
                    ({t('you_will_have')} {netAmount.toFixed(settings.tokenPrecision)} {t('eos_in_net_after', {tokenSymbol:settings.blockchain.tokenSymbol})})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(netDifference < 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="red">
                    <Icon name="wifi" />{t('about_to_unstake_from_net')} {(-netDifference).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}
                  </font>
                  <Header.Subheader>
                    ({t('you_will_have')} {netAmount.toFixed(settings.tokenPrecision)} {t('eos_in_net_after', {tokenSymbol:settings.blockchain.tokenSymbol})})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(cpuDifference > 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="green">
                    <Icon name="microchip" />{t('about_to_stake_to_cpu')} <b>{cpuDifference.toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}</b>
                  </font>
                  <Header.Subheader>
                    ({t('you_will_have')} {cpuAmount.toFixed(settings.tokenPrecision)} {t('eos_in_cpu_after', {tokenSymbol:settings.blockchain.tokenSymbol})})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(cpuDifference < 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="red">
                    <Icon name="microchip" />{t('about_to_unstake_from_cpu')} <b>{(-cpuDifference).toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol}</b>
                  </font>
                  <Header.Subheader>
                    ({t('you_will_have')} {cpuAmount.toFixed(settings.tokenPrecision)} {t('eos_in_cpu_after', {tokenSymbol:settings.blockchain.tokenSymbol})})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}
          </Segment.Group>

          {(accountName === account.account_name && lessThanOneEosStaked) ? (
            <Message warning="true">{t('will_have_less_than_one_eos_staked', {tokenSymbol:settings.blockchain.tokenSymbol})}</Message>
          ) : ''}

          {(unstakingWhenAmountBeingUnstaked) ? (
            <Message
              icon="warning sign"
              warning="true"
            >
              {t('have_already_unstaked')} {statsFetcher.totalBeingUnstaked().toFixed(settings.tokenPrecision)} {settings.blockchain.tokenSymbol} {t('unstaking_will_be_reset')}
            </Message>
          ) : ''}

          <Divider />
          <Button
            onClick={onBack}
          >
            <Icon name="arrow left" /> {t('back')}
          </Button>
          <Button
            color="blue"
            floated="right"
            onClick={this.onConfirm}
          >
            <Icon name="check" /> {t('confirm_stake')}
          </Button>
        </Segment>  
      </div>
    );
  }
}

export default translate('stake')(WalletPanelFormStakeConfirming);
