import { Route, Routes } from 'react-router-dom';
import LogIn from '../../pages/LogIn/LogIn'
import Chat from '../../pages/Chat/Chat';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<LogIn />}></Route>
            <Route path='/chat' element={<Chat />}></Route>
        </Routes>
    )
}

export default Main