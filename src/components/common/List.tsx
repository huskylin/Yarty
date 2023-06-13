import React, { useEffect, useState } from 'react';
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
import { Table, Typography, Grid } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Image from 'next/image';
import { ListColumn } from '@/interface/list';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
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
interface TitleProps {
  lines?: string;
}

const TitleContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 40px;
  }
`;

const StyledTitle = styled(Title)<TitleProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.lines ? props.lines : '2')};
  -webkit-box-orient: vertical; /* 配合 -webkit-line-clamp 使用垂直排列 */
`;

const StyledText = styled(Text)<TitleProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.lines ? props.lines : '2')};
  -webkit-box-orient: vertical; /* 配合 -webkit-line-clamp 使用垂直排列 */
`;

const StyledTable = styled(Table)<any>`
  tbody {
    tr {
      td {
        padding: 8px !important;
      }
    }
  }
`;

const List: React.FC<Props> = ({ data, from }) => {
  const [dataSource, setDataSource] = useState(data);
  const screens = useBreakpoint();
  const columns: ColumnsType<ListColumn> = [
    // {
    //   key: 'sort',
    //   width: 20,
    // },
    {
      title: 'Thumbnails',
      dataIndex: 'thumbnails',
      render: (text, record, index) => {
        let width, height;
        if (!screens.xl) {
          width = 128;
          height = 72;
        } else {
          width = 205;
          height = 115;
        }
        return (
          <Image
            src={record.thumbnails}
            alt="thumbnails"
            width={width}
            height={height}
            style={{ borderRadius: '8px', objectFit: 'cover' }}
          ></Image>
        );
      },
      responsive: ['sm'],
    },
    {
      title: 'Thumbnails',
      dataIndex: 'thumbnails',
      render: (text, record, index) => (
        <Image
          src={record.thumbnails}
          alt="thumbnails"
          width={112}
          height={63}
          style={{ borderRadius: '4px', objectFit: 'cover' }}
        ></Image>
      ),
      responsive: ['xs'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record, index) => {
        if (screens.xs) {
          return (
            <TitleContainer>
              <StyledTitle level={5} style={{ margin: 0 }} lines={'3'}>
                {text}
              </StyledTitle>
              <StyledText lines={'1'}>
                {record.videoOwnerChannelTitle}
              </StyledText>
            </TitleContainer>
          );
        }
        if (screens.sm && !screens.xl) {
          return (
            <TitleContainer>
              <StyledTitle level={4} style={{ margin: 0 }} lines={'2'}>
                {text}
              </StyledTitle>
              <StyledText lines={'1'}>
                {record.videoOwnerChannelTitle}
              </StyledText>
            </TitleContainer>
          );
        } else {
          return (
            <TitleContainer>
              <StyledTitle level={3} style={{ margin: 0 }} lines={'2'}>
                {text}
              </StyledTitle>
              <StyledText lines={'1'}>
                {record.videoOwnerChannelTitle}
              </StyledText>
            </TitleContainer>
          );
        }
      },
    },
  ];

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
        <StyledTable
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
