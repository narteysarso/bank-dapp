import { Layout, Typography } from "antd";

export default function HomeLayout({children,...props}){

    return(
        <Layout className="site-layout transparent-bg">
           
            <Layout.Content className="container" >
                {children}
            </Layout.Content>
            <Layout.Footer className="transparent-bg text-white">
                <Typography.Title level={5} className="center-text text-white">Bank Dapp &copy; {(new Date()).getFullYear()} | Hire Me: <a target="_blank" href="https://linkedin.com/in/narteykodjosarso" rel="noreferrer">Nartey Kodjo-Sarso</a></Typography.Title>
            </Layout.Footer>
        </Layout>
    )
}