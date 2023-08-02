import { useState, useEffect } from 'react';
import { IconButton, TextField, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

interface WebContainerProps {
  isWebApp: boolean;
}

const WebContainer = styled.div<WebContainerProps>`
  display: ${props => (props.isWebApp ? '' : 'flex')};
  width: ${props => (props.isWebApp ? '' : '600px')};
  border: ${props => (props.isWebApp ? '' : '1px solid black')};
  flex-direction: ${props => (props.isWebApp ? '' : 'column')};
  min-height: 99vh;
  position: ${props => (props.isWebApp ? '' : 'absolute')};
  top: ${props => (props.isWebApp ? '' : '50%')};
  left: ${props => (props.isWebApp ? '' : '50%')};
  transform: ${props => (props.isWebApp ? '' : 'translate(-50%, -50%)')};
`;

const Container = styled.div`
  padding: 3%;
  flex: 1;
`;

const FormButtonContainer = styled(Button)`
  display: flex;
  bottom: 0;
  height: 50px;
  left: 0;
  width: 100%;
`;

const SignupForm = styled(TextField)`
  width: 100%;
`;

const NowContainer = styled.div`
  width: 18px;
  height: 18px;
  background-color: #4b8346;
  font-family: 'Pretendard';
  font-style: normal;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const IconContainer = styled.div`
  width: 18px;
  height: 18px;
  background-color: gray;
  font-family: 'Pretendard';
  font-style: normal;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const Announce = styled.div`
  display: flex;
  justify-content: center;
`;

const AnnounceText = styled.div`
  display: flex;
  font-size: 12px;
  margin: 0;
`;

const NowText = styled.div`
  display: flex;
  margin: 0;
  font-weight: bold;
  font-size: 12px;
`;

type FormData = {
  MemberName: string;
  email: string;
  password1: string;
  password2: string;
};

const AuthButton = styled(Button)`
  width: 20%;
  height: 56px;
`;

interface BackButtonProps {
  onGoBack: () => void;
}

const isEmailValid = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

function isPasswordValid(password: string): boolean {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,15}$/;
  return passwordRegex.test(password);
}

const isNameValid = (name: string) => {
  const nameRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/;
  return nameRegex.test(name);
};

function BackButton({ onGoBack }: BackButtonProps) {
  return (
    <div style={{ marginTop: '10px', marginLeft: '5px' }}>
      <Link to="/login">
        <IconButton
          aria-label="back"
          onClick={onGoBack}
          style={{ color: 'gray', fontSize: '14px' }}>
          <ArrowBackIcon /> 돌아가기
        </IconButton>
      </Link>
    </div>
  );
}

function Signup() {
  const [MemberName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isWebApp, setIsWebApp] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPassword2, setInvalidPassword2] = useState(false);
  const [InvalidName, setInvalidName] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    setIsWebApp(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsWebApp(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = event.target.value;
    setName(nameValue);
    if (!isNameValid(nameValue)) {
      setInvalidName(true);
    } else {
      setInvalidName(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (!isEmailValid(emailValue)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (!isPasswordValid(newPassword)) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  };

  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPassword2 = event.target.value;
    setPassword2(newPassword2);

    if (password1 !== newPassword2) {
      setInvalidPassword2(true);
    } else {
      setInvalidPassword2(false);
    }
  };

  const handleSubmit = () => {
    if (!emailExists) {
      // 중복 확인을 하지 않은 경우 알람을 띄우기
      alert('중복 여부를 체크해주세요');
      return;
    }
    if (
      isNameValid(MemberName) &&
      isEmailValid(email) &&
      isPasswordValid(password1) &&
      password1 === password2
    ) {
      const formData: FormData = {
        MemberName,
        email,
        password1,
        password2,
      };
      localStorage.setItem('signupData', JSON.stringify(formData));

      axios
        .post('http://localhost:8080/api/auth/send-email', { email })
        .then(response => {
          console.log('이메일이 성공적으로 보내졌습니다.');
          window.location.href = '/signup/emailcheck';
          console.log(response);
        })
        .catch(error => {
          console.error('이메일 전송에 실패했습니다.', error);
        });
    } else {
      alert('유효하지 않은 입력이 있습니다.');
    }
  };

  const handleGoBack = () => {
    console.log('뒤로');
  };

  const handleVerify = () => {
    setEmailExists(true);
    alert('중복확인 성공');
    //   axios
    //   	.get(`http://local:8080/user?nickname=${email}`)
    //   	.then(response => {
    //       if (response.status >= 200 && response.status <= 299) {
    //         setEmailExists(true);
    //         console.log('인증 성공');
    //       } else {
    //         setEmailExists(false);
    //         console.log('인증 실패');
    //       }
    //     })
    //   	.catch(error => {
    //   		console.error('중복 확인 실패:', error);
    //   	});
  };

  return (
    <WebContainer isWebApp={isWebApp}>
      <BackButton onGoBack={handleGoBack} />
      <Container>
        <h1>회원가입</h1>
        <h3>리디드에 오신 것을 환영합니다.</h3>
        <br />
        <br />
        <Announce>
          <NowContainer>1</NowContainer>&nbsp;
          <NowText> 기본 정보 입력 &nbsp;─&nbsp;</NowText>
          <IconContainer>2</IconContainer>&nbsp;
          <AnnounceText> 이메일 인증 &nbsp;─&nbsp;</AnnounceText>
          <IconContainer>3</IconContainer>&nbsp;
          <AnnounceText> 프로필 입력</AnnounceText>
        </Announce>
        <br />
        <br />
        <div>
          <SignupForm
            label="*이름"
            variant="outlined"
            value={MemberName}
            onChange={handleNameChange}
            margin="dense"
            helperText={(() => {
              if (InvalidName) {
                return '유효한 이름을 입력해주세요';
              }
              if (isNameValid(MemberName)) {
                return ' ';
              }
              return '2글자 이상의 한글 이름을 입력해주세요.';
            })()}
            InputProps={{
              style: {
                backgroundColor: '#f5f5f5',
              },
              endAdornment: isNameValid(MemberName) && (
                <CheckIcon style={{ color: 'green' }} />
              ),
            }}
            error={InvalidName}
          />
        </div>

        <Grid container alignItems="center">
          <Grid item xs={10.2}>
            <SignupForm
              label="*이메일"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              margin="dense"
              InputProps={{
                style: {
                  backgroundColor: '#f5f5f5',
                },
                endAdornment: isEmailValid(email) && (
                  <CheckIcon style={{ color: 'green' }} />
                ),
              }}
              helperText={(() => {
                if (invalidEmail) {
                  return '유효한 이메일을 입력해주세요';
                }
                if (isEmailValid(email)) {
                  return ' ';
                }
                return '이메일을 입력해주세요';
              })()}
              error={invalidEmail}
            />
          </Grid>
          <Grid item xs={1}>
            <AuthButton
              variant="contained"
              color="primary"
              onClick={handleVerify}
              style={{
                marginLeft: '10px',
                marginBottom: '18px',
                background: '#4B8346',
              }}>
              중복 확인
            </AuthButton>
          </Grid>
        </Grid>

        <div>
          <SignupForm
            label="*비밀번호"
            type="password"
            variant="outlined"
            value={password1}
            onChange={handlePasswordChange}
            margin="dense"
            helperText={(() => {
              if (invalidPassword) {
                if (password1.length < 8) {
                  return '비밀번호가 너무 짧습니다.';
                }
                if (password1.length > 15) {
                  return '비밀번호가 너무 깁니다.';
                }
                return '숫자, 특수문자를 조합한 8~15자리로 작성해주세요';
              }
              if (isPasswordValid(password1)) {
                return ' ';
              }
              return '알파벳, 숫자, 특수문자를 조합한 8~15자리로 작성해주세요';
            })()}
            InputProps={{
              style: {
                backgroundColor: '#f5f5f5',
              },
              endAdornment: isPasswordValid(password1) && (
                <CheckIcon style={{ color: 'green' }} />
              ),
            }}
            error={invalidPassword}
          />
        </div>

        <div>
          <SignupForm
            label="*비밀번호 확인"
            type="password"
            variant="outlined"
            value={password2}
            onChange={handlePassword2Change}
            margin="dense"
            helperText={(() => {
              if (invalidPassword2) {
                return '비밀번호가 일치하지 않습니다';
              }
              if (password2 && !invalidPassword2) {
                return ' ';
              }
              return '동일한 비밀번호를 입력해주세요';
            })()}
            InputProps={{
              style: {
                backgroundColor: '#f5f5f5',
              },
              endAdornment: !invalidPassword2 && password2.length > 1 && (
                <CheckIcon style={{ color: 'green' }} />
              ),
            }}
            error={invalidPassword2}
          />
        </div>
      </Container>
      {isWebApp ? (
        <FormButtonContainer
          variant="contained"
          style={{
            backgroundColor: '#4b8346',
            color: '#ffffff',
            position: 'fixed',
          }}
          onClick={handleSubmit}
          disabled={!emailExists}>
          이메일 인증하기
        </FormButtonContainer>
      ) : (
        <FormButtonContainer
          variant="contained"
          style={{
            backgroundColor: '#4b8346',
            color: '#ffffff',
          }}
          onClick={handleSubmit}
          disabled={!emailExists}>
          이메일 인증하기
        </FormButtonContainer>
      )}
    </WebContainer>
  );
}

export default Signup;
