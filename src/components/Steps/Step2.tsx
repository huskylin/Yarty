import CreateListForm from '../CreateListForm';

export const step2Load = () => {
  return <>讀取</>;
};

export const step2Create = (onCreated: any) => {
  return (
    <>
      <CreateListForm onCreated={onCreated}></CreateListForm>
    </>
  );
};
