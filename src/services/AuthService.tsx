import axios from 'axios';

const baseUrl = 'http://10.0.2.2:8080/';

const getUserProfile = async (email: string) => {
  const url = baseUrl + 'signin'

  const response = await axios.post(url, {email:email});
  if (response.status === 200) {
    return response.data;
  } else {

    if (response.status == 400){
      return response;
    }else{
      throw new Error("Fallo al busacar cuenta");
    }
  }
}

export default { getUserProfile }
