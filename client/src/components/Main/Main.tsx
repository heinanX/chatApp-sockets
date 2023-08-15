import { Route, Routes } from 'react-router-dom';
import Entry from '../../pages/Entry/Entry'
import Chat from '../../pages/Chat/Chat';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Entry />}></Route>
            <Route path='/chat' element={<Chat />}></Route>
        </Routes>
    )
}

export default Main