import { Button, Form, InputNumber } from "antd";
import { useContext } from "react";
import { BankContext } from "../../context/bankContext";



export default function DepositeForm(){

    const {depositMoney, depositLoading} = useContext(BankContext);

    const MIN_VALUE = 0.000000001;

    const handleSubmit = (values) => {

        if(!values.amountInEther || values.amountInEther < MIN_VALUE){
            return;
        }
        depositMoney(values.amountInEther.toFixed(10))

        

    }
    return(
        <Form
            
            onFinish={handleSubmit}
            initialValues={{amountInEther: MIN_VALUE}}
            >
            <Form.Item 
                name="amountInEther"
                rules={[{
                    required: true, 
                    message: 'Please input amount in ether' 
                   }]}
                
            >
                <InputNumber style={{width: '100%'}} name="amountInEther" size="large" min={MIN_VALUE} step={MIN_VALUE}/>
            </Form.Item>
                <Button type="primary" htmlType="submit"  loading={depositLoading} size="large" block>Deposite Money In ETH</Button>
            
        </Form>
    )
}