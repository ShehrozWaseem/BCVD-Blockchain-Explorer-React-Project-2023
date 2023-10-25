import React from 'react'
import { walletInfo } from './constants'
import { useBalance } from '../contextApi/BalanceContext'
import { Button, Card, CardBody, CardHeader, CardText } from 'reactstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Wallet = () => {
    const {balanceAvl} = useBalance()
    const history = useHistory()
  return (
    <Card
    className="my-2">
    <CardHeader className="text-center" tag="h4">
      Wallet Information
    </CardHeader>
    <CardBody>
      <CardText className="my-2">
        <strong>Address: </strong>
        {walletInfo?.address}
      </CardText>
      <CardText>
        <strong>Balance: </strong>
        {balanceAvl?.balance}
      </CardText>
    <Button color="primary" onClick={()=>history.push('/addresses')}>Transfer Eth</Button>
    </CardBody>
  </Card>
  )
}

export default Wallet