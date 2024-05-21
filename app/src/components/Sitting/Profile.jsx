import React, { useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBSwitch,
  MDBInputGroup,
  MDBInput,
  MDBSpinner
} from 'mdb-react-ui-kit';
import Cookies from "js-cookie";
import { Fitbit } from '@mui/icons-material';
import DefaultAvatar from '../../assets/default_avatar.png'
import PUT from '../../utils/PUT';
import { json } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


export default function Profile() {
  const user = JSON.parse(Cookies.get('user'));
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  console.log(email);
  const [fetch, setFetch] = useState(false);

  const updateUserInfo = async () => {
    setFetch(true)
    const respone = await PUT('users/' + user.id, {
      name, email, id: user.id, password: 'password',
      role_id: 1
    });
    if(respone.status === 'success'){
      toast.success(respone.message);
    }
    Cookies.remove('user');
    Cookies.set("user", JSON.stringify(respone.data.user), { expires: 3 });
    setFetch(false);
  }


  return (
    <section className='w-full ml-12' style={{ backgroundColor: 'white' }}>
      <ToastContainer className="mt-6" />
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center flex flex-col items-center">
                {user.picture === null ? (
                  <MDBCardImage
                    src={DefaultAvatar}
                    alt="avatar"
                    className="rounded-circle mb-4"
                    style={{ width: '150px' }}
                    fluid />

                ) : (
                  <p>there is a profile </p>
                )}
                  <p className="text-gray-800">{user.name}</p>
                {user.roles[0].name === 'admin' ? (
                  <p className=" text-gray-600 mb-3">L'administrateur de l'application</p>
                ) : (
                  <p className="text-gray-600 mb-3">Le sous-administrateur de l'application</p>
                )}
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn outline color='black' className="ms-1">Update Picture</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="p-4 mb-4">
              <form onSubmit={(e) => { e.preventDefault(); updateUserInfo() }}>
                <MDBInputGroup textBefore='@' className='mb-3'>
                  <input className='form-control' onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder="Username" />
                </MDBInputGroup>

                <MDBInputGroup className='mb-3' textAfter='@gmail.com'>
                  <input className='form-control' onChange={(e) => setEmail(e.target.value)} value={email} type='text' placeholder="Email" />
                </MDBInputGroup>

                <MDBInputGroup className='mb-3 cursor-not-allowed bg-gray-200' disabled textAfter='Role'>
                  <input disabled className='form-control cursor-not-allowed' value={user.roles[0].name} type='text' placeholder="Role" />
                </MDBInputGroup>
                <div className='flex justify-end'>
                  {fetch ? (
                    <MDBBtn disabled color='dark'>
                      <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                      Loading...
                    </MDBBtn>
                  ) : (
                    <MDBBtn className='w-20' color='dark'>
                      Save
                    </MDBBtn>

                  )}
                </div>

              </form>

            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="p-4 mb-md-0">
                  <MDBSwitch id='flexSwitchCheckDefault' label='Default switch checkbox input' />
                  <br />
                  <MDBSwitch defaultChecked id='flexSwitchCheckChecked' label='Checked switch checkbox input' />
                  <br />
                  <MDBSwitch disabled id='flexSwitchCheckDisabled' label='Disabled switch checkbox input' />
                  <br />
                  <MDBSwitch
                    defaultChecked
                    disabled
                    id='flexSwitchCheckCheckedDisabled'
                    label='Disabled checked switch checkbox input'
                  />
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}