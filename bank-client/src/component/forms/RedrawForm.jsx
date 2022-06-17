import { Button, Form, InputNumber } from "antd";
import { useContext } from "react";
import { BankContext } from "../../context/bankContext";



export default function RedrawForm(){
    const {withdrawMoney, withdrawLoading } = useContext(BankContext);
    const MIN_VALUE = 0.000000001;

    const handleSubmit = (values) => {
        
        if(!values.amountInEther || values.amountInEther < MIN_VALUE){
            return;
        }

        

        withdrawMoney(values.amountInEther.toFixed(10))
    }
    return(
        <Form
            onFinish={handleSubmit}
                initialValues={{amountInEther :MIN_VALUE}}
                >
            <Form.Item
                rules={[{
                     required: true, 
                     message: 'Please input amount in ether' ,
                     
                    }]}
                 name="amountInEther"
            >
                <InputNumber style={{width: '100%'}}  step={ MIN_VALUE} min={MIN_VALUE} size="large"/>
            </Form.Item>
                <Button type="primary" htmlType="submit" loading={withdrawLoading} size="large" block>Redraw Money In ETH</Button>
            
        </Form>
    )
}