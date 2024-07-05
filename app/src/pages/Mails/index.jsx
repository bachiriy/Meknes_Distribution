import { useEffect } from 'react'
import GET from '../../utils/GET';

export const Mails = () => {
    useEffect(()=>{
        const get_mails = async () => {
            const r = await GET('mails');
            console.log(r);
        }
        get_mails();
    }, []);
  return (
    <p className='text-center'>Mails</p>
  )
}

