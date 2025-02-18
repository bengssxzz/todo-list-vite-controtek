import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import InputBox from '../components/InputBox';
import ItemBox from '../components/ItemBox';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const [titleTodo, setTitleTodo] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState(null);

    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            const user = response.data.find(user => user.username === username);

            if (user) {
                setUserId(user.id);
                setTitleTodo(user.taskTitle || '');
                setTaskList(user.taskList || []);
            } else {
                console.log("No tasks found for user:", username);
            }
        } catch (error) {
            console.error('Error fetching tasks: ', error);
        }
    };

    // Add new task
    const addNewTask = async (addTask) => {
        if (!addTask.trim() || !userId) return;

        try {
            const newTask = { task: addTask, isDone: false };
            const updatedTasks = [...taskList, newTask];

            await axios.put(`http://localhost:3000/tasks/${userId}`, {
                username,
                password,
                taskTitle: titleTodo,
                taskList: updatedTasks
            });

            fetchTasks();
        } catch (error) {
            console.error('Error adding task: ', error);
        }
    };

    // Delete by item
    const deleteItem = async (taskIndex) => {
        try {
            const updatedTasks = taskList.filter((_, index) => index !== taskIndex);

            await axios.put(`http://localhost:3000/tasks/${userId}`, {
                username,
                taskTitle: titleTodo,
                taskList: updatedTasks
            });

            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Delete all the finished task
    const deleteAllFinishedTasks = async () => {
        try {
            const updatedTasks = taskList.filter(task => !task.isDone);

            await axios.put(`http://localhost:3000/tasks/${userId}`, {
                username,
                password,
                taskTitle: titleTodo,
                taskList: updatedTasks
            });

            alert("Deleted all finished tasks!");
            fetchTasks();
        } catch (error) {
            console.error("Error deleting tasks:", error);
        }
    };

    //Update task
    const updateTask = async (taskIndex, updatedTask) => {
        try {
            const updatedTasks = [...taskList];
            updatedTasks[taskIndex] = updatedTask;

            await axios.put(`http://localhost:3000/tasks/${userId}`, {
                username,
                password,
                taskTitle: titleTodo,
                taskList: updatedTasks
            });

            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Handle the check task
    const handleCheckTask = async (taskIndex) => {
        const updatedTasks = [...taskList];
        updatedTasks[taskIndex].isDone = !updatedTasks[taskIndex].isDone;
        await updateTask(taskIndex, updatedTasks[taskIndex]);
    };

    // Handle the update task
    const handleUpdateTask = async (taskIndex, newText) => {
        const updatedTasks = [...taskList];
        updatedTasks[taskIndex].task = newText;
        await updateTask(taskIndex, updatedTasks[taskIndex]);
    };

    // Save the changes
    const saveChanges = async () => {
        setEditMode(!editMode);
        if (editMode) {
            try {
                await axios.put(`http://localhost:3000/tasks/${userId}`, {
                    username,
                    password,
                    taskTitle: titleTodo,
                    taskList: taskList
                });

                alert("Tasks updated successfully!");
            } catch (error) {
                console.error('Error updating tasks:', error);
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'start',
                    bgcolor: '#FAF0EF'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    mb: 10,
                }}>
                    <Typography variant="h5" fontWeight="bold">
                        Hello, {username}
                    </Typography>
                    <Button variant="contained" color="error" onClick={() => navigate('/')}>Logout</Button>
                </Box>

                {editMode ? (<TextField
                    fullWidth
                    placeholder='Todo List Title'
                    value={titleTodo}
                    disabled={!editMode}
                    onChange={(e) => setTitleTodo(e.target.value)}
                    sx={{
                        mb: 3,
                        width: "90%"
                    }}
                />) : (
                    <Typography variant="h3" fontWeight="bold" color='#0A1F56' sx={{
                        borderBottom: 1,
                        borderWidth: 5,
                        borderColor: "#9D8065"
                    }}>
                        Title: {titleTodo}
                    </Typography>
                )}

                <Container sx={{ mt: 3 }}>
                    {editMode && <InputBox onAddTask={addNewTask} />}

                    {taskList.length === 0 && !editMode ? (
                        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            There are no tasks yet. Edit to start.
                        </Typography>
                    ) : (
                        taskList.map((task, index) => (
                            <Box key={index} sx={{ mt: 2 }}>
                                <ItemBox
                                    editMode={editMode}
                                    text={task.task}
                                    isDone={task.isDone}
                                    onDeleteItem={() => deleteItem(index)}
                                    onCheckTask={() => handleCheckTask(index)}
                                    onUpdateTask={(newText) => handleUpdateTask(index, newText)}
                                />
                            </Box>
                        ))
                    )}

                    <Box sx={{
                        borderTop: 1,
                        borderColor: '#9D8065',
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        mt: 3,
                        py: 1,
                        px: 4,
                    }}>
                        {!editMode && taskList.some(e => e.isDone) && (
                            <Button onClick={deleteAllFinishedTasks} variant='outlined' color='error'>
                                Delete All Finished Tasks
                            </Button>
                        )}

                        <Button onClick={saveChanges} variant='outlined'>
                            {editMode ? 'Save' : 'Edit'}
                        </Button>
                    </Box>
                </Container>
            </Box>

        </>
    );
}

export default HomePage;