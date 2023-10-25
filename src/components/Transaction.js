import React from "react";
import { useBalance } from "../contextApi/BalanceContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
} from "reactstrap";
const Transaction = ({ addressInfo }) => {
  const { balanceAvl } = useBalance();
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h5>Transaction History - Balance: {balanceAvl?.balance}</h5>
      </div>
      {balanceAvl?.transactions?.length > 0 ? (
        balanceAvl?.transactions.map((item, key) => (
          <Card className="my-2">
            <CardHeader className="text-center" tag="h4">
              Transaction #{key + 1}
            </CardHeader>
            <CardBody>
              <CardText className="my-2">
                <strong>From: </strong>
                {item?.from}
              </CardText>
              <CardText>
                <strong>To: </strong>
                {item?.to}
              </CardText>
              <CardText className="my-2">
                <strong>Transaction Hash: </strong>
                {item?.hash}
              </CardText>
              <CardText className="my-2">
                <strong>Time: </strong>
                {item?.time}
              </CardText>
              <CardText className="my-2">
                <strong>Amount Transfered: </strong>
                {item?.amount}
              </CardText>
            </CardBody>
          </Card>
        ))
      ) : (
        <Card className="my-2">
          <CardHeader className="text-center" tag="h4">
            Transaction
          </CardHeader>
          <CardBody>
            <CardText className="my-2">
              <strong>No Transaction to display :/ </strong>
            </CardText>{" "}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Transaction;
