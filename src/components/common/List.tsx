import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { DataType } from '@/interface/list';

const { Title } = Typography;

const columns: ColumnsType<DataType> = [
  {
    key: 'sort',
    width: 20,
  },
  {
    title: 'Thumbnails',
    dataIndex: 'thumbnails',
    render: (text, record, index) => (
      <Image
        src={record.thumbnails}
        alt="thumbnails"
        width={'256'}
        height={'144'}
        style={{ borderRadius: '8px' }}
      ></Image>
    ),
    width: 320,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    render: (text, record, index) => {
      return (
        <>
          <Title level={3}>{text}</Title>
          <Title level={4}>{record.videoOwnerChannelTitle}</Title>
        </>
      );
    },
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && { ...transform, scaleY: 1 }
    )?.replace(/translate3d\(([^,]+),/, 'translate3d(0,'),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

interface Props {
  data: any[];
  from: string;
}

const List: React.FC<Props> = ({ data, from }) => {
  const [dataSource, setDataSource] = useState(data);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };
  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={dataSource.map((i: any) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={{
            body: {
              row: Row,
            },
          }}
          rowKey="key"
          columns={columns}
          dataSource={dataSource}
          showHeader={false}
        />
      </SortableContext>
    </DndContext>
  );
};

export default List;
