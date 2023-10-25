import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Input,
  InputGroup,
} from "reactstrap";
import Reciept from "./Reciept";
import { useParams, Link } from "react-router-dom";
import { randomHashArray, walletInfo } from "./constants";
import { useBalance } from "../contextApi/BalanceContext";
import Randomstring from "randomstring";
const Transfer = () => {
  const { add } = useParams();
  // console.log(add, add?.includes(randomHashArray));
  const isAddFromData = randomHashArray?.includes(add);
  // address info which will be passed to reciept compinent as prop as it is using that info
  const [addressInfo, setAddressInfo] = useState({
    addFrom: walletInfo?.address,
    addTo: isAddFromData
      ? add
      : "Please Select a correct address from the available list",
    blkHash:
      "0x8a36f255f29545ab110ed6747ca1550a72c432c12c654bf8d869f35b4dcd9837",
    transHash:
      "0x731a3d26bc9719c646f35a8c01a8e9d8f5f151b25bea9de2b07a0f3df647b70e7",
    blk: 15,
    amtVal: 0,
  });

  const [error, setError] = useState(false);

  const [amtVal, setValue] = useState(null);

  //we'll update the state of parent component from child i.e reciept using below state var
  const [doTransfer, setTransfer] = useState(false);

  //getting balance from global state var
  const { balanceAvl, dispatch } = useBalance();

  const onChangeVal = (e) => {
    setValue(+e.target.value);

    // If entered value is zero or lesser then raise error it will go to if condition else it wont go to if and the erro state will remain false
    setError(false);
    console.log(balanceAvl?.balance);
    if (e.target.value <= 0 || balanceAvl?.balance < +e.target.value) {
      setError(
        balanceAvl?.balance < e.target.value
          ? `You dont have enough balance. Your current balance is: ${balanceAvl?.balance}`
          : "Please enter an amount greater than 0"
      );
    }
  };

  const resetTransaction = () => {
    setTransfer(!doTransfer);
    setValue("");
  };

  const submitTransaction = () => {
      const currentDate = new Date();
      console.log(amtVal);
      setTransfer(true);
      dispatch({ type: "TRANSFER", amount: +amtVal,transaction:{
        hash:`0x${Randomstring.generate({
          length: 46,
          charset: 'alphanumeric'
        })}`,
        status:"Success",
        time:currentDate.toLocaleString(),
        from:walletInfo?.address,
        to:add,
        amount: +amtVal
      } });
  }

  return (
    <>
      <Card className="my-2">
        <CardHeader className="text-center" tag="h4">
          Transfer Ethers
        </CardHeader>
        <CardBody>
          <CardTitle tag="h6" className="mb-3">
            Your Ether will be transfered to below information
          </CardTitle>
          <CardText className="my-2">
            <strong>From: </strong>
            {addressInfo?.addFrom}
          </CardText>
          <CardText style={{ color: isAddFromData ? "black" : "red" }}>
            <strong>To: </strong>
            {addressInfo?.addTo}
            {!isAddFromData && (
              <>
                <br />
                <Link to="/addresses" className="mb-5">
                  Go to Addresses
                </Link>
              </>
            )}
          </CardText>
          <span className="field">
            <InputGroup>
              <Input
                id="exampleNumber"
                name="number"
                placeholder="Enter Amount"
                type="number"
                min="0"
                step="1"
                onChange={onChangeVal}
                disabled={doTransfer || !isAddFromData}
                value={amtVal}
              />
              <Button
                disabled={amtVal < 1 || doTransfer || error}
                color="success"
                onClick={submitTransaction}
              >
                Transfer
              </Button>
            </InputGroup>
            {/* if error is true show error msg */}
            {error && (
              <span style={{ fontSize: "12px", color: "red" }}>{error}</span>
            )}
            {doTransfer && (
              <span style={{ fontSize: "12px", color: "blue" }}>
                Please clear the reciept to Intitate a new transaction
              </span>
            )}
          </span>
        </CardBody>
      </Card>
      {doTransfer && (
        <Reciept
          resetTransaction={resetTransaction}
          addressInfo={addressInfo}
          amtVal={amtVal}
          remBalance={balanceAvl?.balance}
        />
      )}
    </>
  );
};

export default Transfer;
