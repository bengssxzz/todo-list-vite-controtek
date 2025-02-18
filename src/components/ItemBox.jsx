import { Box, Button, Checkbox, TextField } from '@mui/material';
import React, { useState } from 'react';

function ItemBox({ editMode, text, isDone, onDeleteItem, onCheckTask, onUpdateTask }) {
    const [itemTask, setItemTask] = useState(text);

    const handleUpdateTask = () => {
        onUpdateTask(itemTask); // Pass the updated task text to the parent
    };

    return (
        <Box sx={{
            width: '100%',
            height: '80px',
            bgcolor: editMode ? '#ffff' : '#B6A08B',
            borderRadius: 10,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2
        }}>
            {editMode ? (
                <>
                    <TextField
                        fullWidth
                        value={itemTask}
                        disabled={!editMode}
                        onChange={(e) => setItemTask(e.target.value)}
                        onBlur={handleUpdateTask} // Save changes when the user leaves the input field
                    />
                    <Button onClick={onDeleteItem} sx={{
                        color: "white",
                        bgcolor: '#9D8065'
                    }}>Delete</Button>
                </>
            ) : (
                <>
                    <Checkbox
                        checked={isDone}
                        onChange={onCheckTask} // Toggle the isDone state
                    />
                    <h4 style={{ textDecoration: isDone ? 'line-through' : 'none' }}>{text}</h4>
                </>
            )}
        </Box>
    );
}

export default ItemBox;


// import { Box, Button, Checkbox, Radio, TextField } from '@mui/material';
// import React, { useState } from 'react'

// function ItemBox({ editMode, text, isDone, onDeleteItem, onCheckTask }) {
//     const [itemTask, setItemTask] = useState(text);

//     return (
//         <Box sx={{
//             width: '100%',
//             height: '80px',
//             bgcolor: editMode ? '#ffff' : '#B6A08B',
//             borderRadius: 10,
//             px: 2,
//             display: 'flex',
//             alignItems: 'center'
//         }}>
//             {editMode ?
//                 (
//                     <>
//                         <TextField fullWidth
//                             value={itemTask}
//                             disabled={!editMode}
//                             onChange={(e) => setItemTask(e.target.value)}
//                         />
//                         <Button onClick={onDeleteItem}>Delete</Button>
//                     </>
//                 ) : (
//                     <>
//                         <Checkbox value={isDone} onChange={onCheckTask} />
//                         <h4>{text}</h4>
//                     </>
//                 )
//             }

//         </Box>
//     );
// }

// export default ItemBox
