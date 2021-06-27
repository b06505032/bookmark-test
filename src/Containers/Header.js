import { Modal, Layout, Row, Button, Col, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import GroupSort from '../Components/GroupSort';
import SearchBar from '../Components/SearchBar';
const { Header } = Layout;
const { Title } = Typography;
const { confirm } = Modal;



const MyHeader = ({groupSortBy, setGroupSortBy, account, signIn, setSignIn, findUser, findGroups, allUsers, allGroups, setAccount, removeUserCookie, removeLoginCookie}) => {

    const handleClickLogout = () => {
        showLogoutConfirm()
    }

    const handleClickAccount = () => {
        findUser({variables:{name: account.name, type: "all"}})
    }

    const showLogoutConfirm = () => {
        confirm({
            title: `${account.name}, are you sure to log out?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                console.log('logout')
                setSignIn('false')
                const loginAccount = {name: "", password: ""}
                setAccount(loginAccount)
                localStorage.clear()
                removeUserCookie('account')
                removeLoginCookie('login')
            },
            onCancel() {
            },
        })
    }

    return (
        <Header  style={{background: '#C4E1FF'}}>
            {signIn === 'true' ?
            (<Row>
                <Col span={6} order={1}>
                    <GroupSort
                        groupSortBy = {groupSortBy}
                        setGroupSortBy = {setGroupSortBy}
                    />
                </Col>
                <Col span={6} order={2}>
                    <SearchBar
                        account = {account}
                        groups = {allGroups}
                        users = {allUsers}
                        bookmarks = {[]}
                        findUser = {findUser}
                        findGroups = {findGroups}
                    />
                </Col>
                <Col span={6} order={3}>

                </Col>
                 <Col span={6} order={4}>
                    <Button size="middle" onClick={()=>{handleClickAccount()}}>
                        {account.name}
                    </Button>
                    <Button size="middle" onClick={()=>{handleClickLogout()}}>
                        Logout
                    </Button>
                </Col>
            </Row>) :
            (<Row align="middle" justify="center">
                <Title>Bookmark Manager</Title>
            </Row>)
            }
        </Header>
    )
}
export default MyHeader