import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { signIn, useSession } from 'next-auth/react';
import { Session } from '@/interface/list';
const apiPath = process.env.API_PATH;

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const CreateListForm: React.FC<any> = ({ onCreated }) => {
  const { data: session } = useSession() as { data: Session | null };
  const [title, setTitle] = useState('Yarty Playlist');
  const [descrietion, setDescrietion] = useState(
    'a mix playlist created by Yarty'
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClearTitle = () => {
    setTitle('');
  };

  const handleClearDesc = () => {
    setDescrietion('');
  };

  const createList = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiPath}/api/list`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          descrietion: values.descrietion,
        }),
      });
      setLoading(false);
      if (res.ok) {
        const data = await res.json();
        onCreated(data);
      } else {
        setError(`${res.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {error && (
        <div style={{ width: 800, margin: 'auto' }}>
          <p> {error}</p>
          {error === 'Unauthorized' && <p>尚未登入或是權限到期，請重新登入</p>}
        </div>
      )}

      {!error && (
        <Form
          name="新建播放清單"
          size={'large'}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 800, margin: 'auto' }}
          initialValues={{ remember: true }}
          onFinish={createList}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="標題"
            name="title"
            rules={[{ required: true, message: '請輸入播放清單名稱' }]}
          >
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              suffix={<CloseCircleOutlined onClick={handleClearTitle} />}
            />
          </Form.Item>

          <Form.Item
            label="描述"
            name="descrietion"
            rules={[{ required: false, message: '描述' }]}
          >
            <Input
              value={descrietion}
              onChange={(e) => setDescrietion(e.target.value)}
              suffix={<CloseCircleOutlined onClick={handleClearDesc} />}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default CreateListForm;
