import React from 'react'
// import { Card } from 'antd';
import { styled } from 'styled-components';
import { Avatar, List, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router';

const data = Array.from({ length: 23 }).map((_, i) => ({
  url: '/task',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const CampaignList = (props) => {
  const navigate = useNavigate()
  const location = useLocation();
  return(
    <Container>
      <ListContainer
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://tribegroup.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fc3d8d698-58f3-4e25-a744-0c8c720ccffc%2Ff381fc5c-7584-45c9-b370-5ae0204a281d%2FPQqjN39Xe1pg25419QQg8ZGEis8.png?id=4d88e552-56e9-4ee9-b87b-87782c31358c&table=block&spaceId=c3d8d698-58f3-4e25-a744-0c8c720ccffc&width=2000&userId=&cache=v2"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a onClick={() => navigate(location.pathname+item.url)}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
    <Outlet/>
  </Container>
  )
}

const ListContainer = styled(List)`

    color: white;
`

const Container = styled.div`
  padding: 1rem;
`