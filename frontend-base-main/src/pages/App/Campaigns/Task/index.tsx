import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Button, ConfigProvider, Form, Input, Modal, Radio } from 'antd';
import { useContractWrite, useContract, Web3Button } from "@thirdweb-dev/react";

const defaultData = {
  borderRadius: 6,
  colorPrimary: '#1677ff',
  colorText: "black",
  // Button: {
  //   colorPrimary: '#050b0c',
  // },
  colorBgContainer: "unset",
};

// Your smart contract address
const contractAddress = '0xc34c69774fC80dEB1a951074a0EFAbc3C08f27f2';

export const Task = (props) => {
  const descUrl = new URL('./1.jpg', import.meta.url).href
  const submissionUrl = new URL('./2.jpg', import.meta.url).href

  const [data, setData] = React.useState(defaultData);

  const [open, setOpen] = useState(false);


  const handleSubmission = () => {
    setOpen(true);
  }

  const onCreate = async (values: any) => {
    console.log('Received values of form: ', values);
    // await mutateAsync({[0, "ipfs://test.test"]})
    setOpen(false);
  };

  return(
    <Container>
       <ConfigProvider
        theme={{
          token: {
            ...data,
          },
          components: {
            Button: {
              // colorPrimary: data.Button?.colorPrimary,
            },
          },
        }}
      >
      
        <TaskDescription src={descUrl}/>
        <Submission src={submissionUrl} onClick={handleSubmission}/>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
        </ConfigProvider>
    </Container>
   )
}

const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
}) => {
  const { data: contract } = useContract(contractAddress);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "addNewCompletedTask",
  );
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Submission"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            console.log(values)
            //taskId and ipfslink
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        // <Button key="submit" type="primary" loading={isLoading} onClick={onCreate}>
        <Web3Button
          key="submit"
          contractAddress={contractAddress}
          // Calls the 'INSERT_NAME' function on your smart contract
          // with 'INSERT_ARGUMENT' as the first argument
          action={() => mutateAsync({ args: [0, "ipfs://tstestet.djdj.com"] })}
          // action={() => mutateAsync({ args: [
          //   "Deploy a Yield Farm Protocol on Taiko",
          //   3500,
          //   30
          // ] })}
        >
          Submit
        </Web3Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="ipfsLink"
          label="Video IPFS Link"
          rules={[{ required: true, message: 'Please input your video IPFS Link' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="contractAddress" label="Contract address">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const TaskDescription = styled.img`
  width: 70%;
  margin: 0 auto;
`
const Submission = styled.img`
  width: 70%;
  margin: 0 auto;
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  overflow: scroll;
`
