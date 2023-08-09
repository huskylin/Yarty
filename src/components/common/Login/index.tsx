import { useSession, signIn, signOut } from 'next-auth/react';
import { FlexDiv, StyledButton } from './style';
import { Session } from '@/interface/list';
import { FcGoogle } from 'react-icons/fc';

export default function Component() {
  const { data: session } = useSession() as { data: Session | null };
  if (session) {
    return (
      <>
        <FlexDiv>
          <StyledButton
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => signOut()}
            size="large"
          >
            <FcGoogle
              style={{ marginRight: '10px', fontSize: '24px' }}
            ></FcGoogle>
            登出
          </StyledButton>
        </FlexDiv>
      </>
    );
  }
  return (
    <>
      <FlexDiv>
        <StyledButton
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => signIn('google')}
          size="large"
        >
          <FcGoogle
            style={{ marginRight: '10px', fontSize: '24px' }}
          ></FcGoogle>
          使用 Google 登入
        </StyledButton>
      </FlexDiv>
    </>
  );
}
