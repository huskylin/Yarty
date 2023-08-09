import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid } from 'antd';
import { ListColumn } from '@/interface/list';
import type { DragEndEvent } from '@dnd-kit/core';
import type { ColumnsType } from 'antd/es/table';
import {
  StyledImage,
  StyledTable,
  StyledText,
  StyledTitle,
  TitleContainer,
} from './style';

const { useBreakpoint } = Grid;

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
    ...(isDragging ? { position: 'relative', zIndex: 2 } : {}),
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

const List: React.FC<Props> = ({ data }) => {
  const [dataSource, setDataSource] = useState(data);
  const screens = useBreakpoint();
  const columns: ColumnsType<ListColumn> = [
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
          <StyledImage
            src={record.thumbnails}
            alt="thumbnails"
            width={width}
            height={height}
          ></StyledImage>
        );
      },
      responsive: ['sm'],
    },
    {
      title: 'Thumbnails',
      dataIndex: 'thumbnails',
      render: (text, record, index) => (
        <StyledImage
          src={record.thumbnails}
          alt="thumbnails"
          width={112}
          height={63}
        ></StyledImage>
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
              <StyledTitle level={5} lines={'3'}>
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
              <StyledTitle level={4} lines={'2'}>
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
              <StyledTitle level={3} lines={'2'}>
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
