import React, { useState, useEffect, useCallback } from 'react';
import { Button, message, Steps } from 'antd';
import { useSession } from 'next-auth/react';
const apiPath = process.env.API_PATH;

import { Content } from './style';
import { ListColumn, ListResponse, Session } from '@/interface/list';
import { useQuery } from 'react-query';
import { step1 } from './Step1';
import { step2Create, step2Load } from './Step2';
import { fetchPlaylist } from '@/utils/fetch';
import { Step3 } from './Step3';
import Login from '../common/Login';

function createSteps(create: any, load: any, onCreated: any) {
  return [
    // {
    //   title: '新建清單或選擇已有清單',
    //   content: step1(create, load),
    // },
    {
      title: '創建播放清單',
      content: step2Create(onCreated),
    },
    {
      title: '完成',
      content: <Step3 />,
    },
  ];
}

function loadSteps(create: any, load: any) {
  return [
    // {
    //   title: '新建清單或選擇已有清單',
    //   content: step1(create, load),
    // },
    {
      title: '讀取播放清單',
      content: step2Load(),
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];
}

const updateList = async (
  playlistId: string,
  resourceId: string[],
  session: any
) => {
  try {
    const res = await fetch(`${apiPath}/api/listItems`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playlistId,
        resourceId,
      }),
    });
    if (!res.ok) {
      throw new Error('Failed to export playlist');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const App: React.FC<{
  playlist: ListColumn[];
  playlistKey: string;
  setIsStepsOpen: any;
}> = ({ playlist, playlistKey, setIsStepsOpen }) => {
  const [current, setCurrent] = useState(0);
  const [mode, setMode] = useState('create');
  const { data: session } = useSession() as { data: Session | null };
  const [playlistId, setPlaylistId] = useState();
  const [playlistRaw, setPlaylistRaw] = useState<ListResponse>();
  const [stepContent, setStepContent] = useState<any>({
    create: null,
    load: null,
  });

  // const { refetch, isLoading } = useQuery(
  //   ['createdPlayListId', playlistId],
  //   async () => {
  //     if (playlistId) {
  //       return fetchPlaylist(playlistId);
  //     } else {
  //       return Promise.resolve();
  //     }
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: !!playlistId,
  //     onSuccess: (data: ListResponse) => {
  //       if (data?.listName?.items?.length > 0) {
  //         setPlaylistRaw(data);
  //       } else {
  //         refetch();
  //       }
  //     },
  //   }
  // );

  const prev = () => {
    setCurrent(current - 1);
  };

  const create = useCallback(() => {
    setMode('create');
    setCurrent(current + 1);
  }, [current]);

  const load = useCallback(() => {
    setMode('load');
    setCurrent(current + 1);
  }, [current]);

  const onCreated = useCallback(
    async (values: any) => {
      if (values) {
        const id = values.id;
        setPlaylistId(id);
        await updateList(
          id,
          playlist.map((e) => e.videoId),
          session
        );
        setCurrent(current + 1);
        setTimeout(() => setIsStepsOpen(false), 1000);
      } else {
        console.log('error');
      }
    },
    [playlist, session, current, setIsStepsOpen]
  );

  useEffect(() => {
    setStepContent({
      create: createSteps(create, load, onCreated),
      load: loadSteps(create, load),
    });
  }, [create, load, onCreated]);

  useEffect(() => {
    if (mode === 'load') {
      setSteps(stepContent.load);
    }
    if (mode === 'create') {
      setSteps(stepContent.create);
    }
  }, [current, mode, stepContent.create, stepContent.load]);

  const onUpDated = () => {};

  useEffect(() => {
    const stepObj = [
      {
        title: '新建清單',
        content: step1(create, load),
      },
      {
        title: '新增播放清單',
        content: step2Create(onCreated),
      },
      // {
      //   title: '確認當前清單',
      //   content: (
      //     <Step3
      //       playlistRaw={playlistRaw}
      //       playlist={playlist}
      //       playlistKey={playlistKey}
      //       onUpdated={onUpDated}
      //     ></Step3>
      //   ),
      // },
    ];
    setSteps(stepObj);
  }, [mode, playlist, playlistKey, playlistRaw, create, load, onCreated]);

  const [steps, setSteps] = useState([
    // {
    //   title: '新建清單或選擇已有清單',
    //   content: step1(create, load),
    // },
    {
      title: '',
      content: <></>,
    },
    {
      title: '',
      content: <></>,
    },
  ]) as any;

  return (
    <>
      {!session && <Login></Login>}
      {session && session.accessToken && steps.length > 0 && (
        <>
          <Steps
            current={current}
            items={steps.map((item: any) => ({
              key: item.title,
              title: item.title,
            }))}
          />
          <Content>{steps[current].content}</Content>
          {/* <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && current > 0 && (
              <Button type="primary" onClick={() => setCurrent(current + 1)}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div> */}
        </>
      )}
    </>
  );
};

export default App;
