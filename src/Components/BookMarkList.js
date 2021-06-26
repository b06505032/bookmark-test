import { useEffect, useState } from 'react';
import { Modal, List, Tag, message } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { QueryGetGroupBookMarks } from '../graphql/querys';
import { MutationRemoveBookMarks } from '../graphql/mutations';
const { confirm } = Modal;


const LoadMoreList = ({account, groupid, groupID_Name}) => {
    const [list, setList] = useState([])
    
    const { loading, data: getGroupData, refetch } = useQuery(QueryGetGroupBookMarks, {variables: {user: account.name, password: account.password, id: groupid} })
    const [ removeBookMarks, {data: removeBookMarksData}] = useMutation(MutationRemoveBookMarks)

    useEffect(()=>{
        if(getGroupData){
            if (getGroupData.getgroup.msg === "found"){
                setList(getGroupData.getgroup.data.bookMarks)
            }
        }
    }, [getGroupData])
    

    useEffect(()=>{
        if(removeBookMarksData){
            const { msg } = removeBookMarksData.removeBookMarks
            switch(msg) {
                case "delete success": {
                    message.warning('You delete the bookmark!', 3)
                    refetch()
                    break
                }
                case "you are not editor":{
                    message.error('Oops, you are not an editor of the group. You don\'t have the access to delete the bookmark.', 5)
                    break
                }
                default: { }
            }
        }
    }, [removeBookMarksData])


    const handleClickEditDelete = (e) => {
        const { type } = e
        switch(type){
            case "Edit": {
                console.log("gonna edit")
                break
            }
            case "Delete":{
                showDeleteConfirm(e)
                break
            }
        }
    }

    const showDeleteConfirm = (e) => {
        const { bookmarkID, bookmarkName } = e
        confirm({
            title: `Are you sure to delete "${bookmarkName}" from "${groupID_Name[groupid]}"?`,
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be recovered.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                await removeBookMarks({variables:{ user: account.name, password: account.password, group_id: groupid, bookMark_id: bookmarkID}})
            },
            onCancel() {
            },
        });
    }
      
    
    return (
        <List
            size="small"
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={list}
            renderItem={item => {
                const name = item.name.split('@')[0]
                var tags = item.name.split('@')
                tags.splice(0, 1)
                return (
                    <List.Item
                        actions={[
                            // <EditOutlined onClick={()=>{handleClickEditDelete({type: "Edit", bookmarkID: item.id})}}/>, 
                            <DeleteOutlined onClick={()=>{handleClickEditDelete({type: "Delete", bookmarkID: item.id, bookmarkName: item.name})}}/>,
                        ]}
                    >
                        <List.Item.Meta
                            title={<a href={item.url} target="_blank" rel="noopener noreferrer">{name}</a>}
                            key={`ListItemMeta-${groupid}-${item.id}`}
                        />
                        {tags.map(i=>(<Tag key={`ListItemTag-${groupid}-${item.id}-${i}`}>{i}</Tag>))}
                    </List.Item>
                )
            }}
        />
    )
  
}
export default LoadMoreList
