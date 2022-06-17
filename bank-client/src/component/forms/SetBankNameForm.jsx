import { Button, Form, Input } from "antd";
import { useContext } from "react";
import { BankContext } from "../../context/bankContext";



export default function SetBankNameForm(){

    const {setBankName, bankNameLoading, currentBankName} = useContext(BankContext);

    const handleSubmit = (values) => {
        // e.preventDefault();
        if(!values.bankname){
            return;
        }
        setBankName(values.bankname);
    }
    return(
        <Form
            onFinish={handleSubmit}
            initialValues={{bankname: currentBankName}}
            >
            <Form.Item
                name="bankname"
                rules={[{ required: true, message: 'Please input your bank name' }]}
            >
                <Input placeholder="Type Bank Name ex: CRYPTO EXIM Bank" style={{width: '100%'}}  size="large"/>
            </Form.Item>
                <Button type="primary" htmlType="submit" loading={bankNameLoading} size="large" block>Set Bank Name</Button>
            
        </Form>
    )
}