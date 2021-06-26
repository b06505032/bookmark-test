import { Layout } from 'antd';
import styled from '@emotion/styled';
import GroupFilter from '../Components/GroupFilter';
import GroupTitle from '../Components/GroupTitle';
import BookMarkList from '../Components/BookMarkList';
const { Content } = Layout;

const MyContent = (props) => {
    return(
        <Content style={{ overflow: 'auto', height: '100vh', left: 0, background: '#fff', width: '500px'}} >
            <Wrapper>
                {/* <GroupFilter  options = { allGroups.map(i => ({label:i, value: i})) }/> */}
                <GroupFilter  
                    options = { props.allGroupIDs.filter(j => {return !props.selectedGroupIDs.includes(j)}).map(i => {
                        return ({id: i, label: props.groupID_Name[i], value: i})
                    }) }
                    setSelectedGroupIDs = {props.setSelectedGroupIDs}
                />
            </Wrapper>
            {
                (props.selectedGroupIDs.length === 0 ? props.allGroupIDs:props.selectedGroupIDs).map((id)=>{
                    return(
                        <>
                            <GroupTitle
                                account = {props.account}
                                groupid = {id}
                                groupname = {props.groupID_Name[id]}
                                myGroupIDs = {props.myGroupIDs}
                                allUsers = {props.allUsers}
                            />
                            <BookMarkList
                                groupid = {id}
                                account = {props.account}
                                groupID_Name = {props.groupID_Name}
                            />
                        </>
                    )
                })
            }
        </Content>
    )

}

const Wrapper = styled.div`
  max-width: 500px;
  padding: 20px;
  h2 {
    font-weight: 300;
  }
`

export default MyContent