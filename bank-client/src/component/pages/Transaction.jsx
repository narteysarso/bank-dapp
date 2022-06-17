import { Button, Card, Col, Divider, Row, Space, Typography } from "antd";
import { useContext } from "react";
import { BankContext } from "../../context/bankContext";
import DepositeForm from "../forms/DepositeForm";
import RedrawForm from "../forms/RedrawForm";
import SetBankNameForm from "../forms/SetBankNameForm";

export default function Transaction() {

    const {error, customerTotalBalance, bankOwnerAddress, isWalletConnected, customerAddress, isBankOwner } = useContext(BankContext);

    return (
        <Row justify="center">
          
            <Col xs={24} lg={16} style={{ padding: '5%' }} >
            {error && <p style={{color: 'tomato', textAlign:'center'}}>{error}</p>}
                <Card
                    style={{ border: '2px solid #555', borderRadius: '10px' }}
                    className="transparent-bg"
                    title={<Typography.Title className="text-white">Bank Contract Project 💰</Typography.Title>}

                >

                    <Row align="center" justify="center" gutter={[16, 64]} >
                        <Col xs={24} md={{ span: 18 }}>
                            <DepositeForm />
                        </Col>
                        <Col xs={24} md={{ span: 18 }}>
                            <RedrawForm />
                        </Col>
                        <Col xs={24} md={{ span: 18 }}>
                            <Typography.Title className="text-white" level={3}>Customer Balance: {customerTotalBalance} </Typography.Title>
                            <Typography.Title className="text-white" level={3}>Bank Owner Address: {bankOwnerAddress}</Typography.Title>
                            {isWalletConnected && <Typography.Title className="text-white" level={3}>Your Wallet Address: {customerAddress}</Typography.Title>}

                            <Space>
                                <Button type="primary" style={{ borderRadius: '5px' }} size="large">
                                    {isWalletConnected ? "Wallet Connected 🔒" : "Connect Wallet 🔑"}
                                </Button>
                            </Space>
                        </Col>
                        {isBankOwner && <Col span={24}>
                            <Divider style={{ borderColor: 'white' }} />
                            <Typography.Title className="text-white" level={3}>Bank Admin Panel</Typography.Title>
                            <SetBankNameForm />
                        </Col>}
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}