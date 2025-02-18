import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

function InputBox({ onAddTask }) {
    const [task, setTask] = useState('');

    const handleAddTask = () => {
        if (task.trim()) {
            onAddTask(task);
            setTask('');
        }
    };

    return (
        <Box sx={{
            width: '100%',
            height: '80px',
            bgcolor: 'white',
            borderRadius: 10,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2
        }}>
            <TextField
                fullWidth
                placeholder='Add Task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                sx={{
                    borderColor: '#9D8065',
                    borderBottom: 1
                }}
            />
            <Button onClick={handleAddTask}>Add</Button>
        </Box>
    );
}

export default InputBox;


// import { Avatar, Button, TextField } from '@mui/material'
// import { Box } from '@mui/system'
// import React, { useState } from 'react'

// function InputBox({ onAddTask }) {
//     const [task, setTask] = useState('');

//     return (
//         <Box sx={{ width: '100%', height: '80px', bgcolor: 'white', borderRadius: 10, p: 2, display: 'flex', alignItems: 'center' }}>
//             <TextField
//                 fullWidth
//                 placeholder='Add Task'
//                 value={task}
//                 onChange={(e) => setTask(e.target.value)}
//                 sx={{
//                     borderColor: '#9D8065',
//                     borderBottom: 1
//                 }} />
//             <Button onClick={() => {
//                 setTask("");
//                 onAddTask(task)
//             }}>Add</Button>
//         </Box>
//     );
// }

// export default InputBox
