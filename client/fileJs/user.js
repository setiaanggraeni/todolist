let vw = new Vue({
    el: '#app',
    data: {
        name: '',
        email: '',
        password: '',
        tasks: [],
        task: '',
        dueDate: null,
        taskId: '',
        createdAt: '',
        taskWillEdit: [],
        seen: false,
        status: ''

    },
    mounted() {
        this.getTasks()
    },
    methods: {
        getTasks() { // profile user
            let token = localStorage.getItem('token')
            if(token){
                axios.get('http://localhost:3000/users/tasks', {
                    headers: {
                        token : localStorage.getItem("token")
                    }
                })
                .then(response => {
                    // console.log("========",response.data)
                    this.tasks = response.data
                })
                .catch(function (error) {
                    console.log(error)
                })
            } else{
                alert('Please login to view your profile!');
                location.replace("index.html");
            }
        },
        createTask(){
            let token = localStorage.getItem('token')
            if(token){
                axios.post('http://localhost:3000/tasks/addtask', {
                    task : this.task,
                    dueDate: this.dueDate
                }, {
                    headers : {
                        token: localStorage.getItem("token")
                    }
                })
                .then(newTask => {
                    // console.log('berhasil masuk data baru g?', newTask)
                    alert('Successfully created new task!')
                    this.getTasks()
                    this.task = ''
                    this.dueDate= null
                })
                .catch(err => {
                    console.log('Failed to submit new task!')
                })
            }
        },
        edit(task){
            this.taskWillEdit.push({taskId: task.taskId, task: task.task, dueDate: task.dueDate, status: task.status})
            this.seen = true 
        },
        deleteTask(taskId){
            let token = localStorage.getItem('token')
            if(token){
                axios.delete(`http://localhost:3000/tasks/delete/${taskId}`, {
                    headers : {
                        token: localStorage.getItem("token"),
                    }
                })
                .then(deleteTask => {
                    // console.log('Successfully delete task!', deleteTask)
                    this.getTasks()
                })
                .catch(err => {
                    console.log('Failed to delete this task!')
                })
            }            
        },
        logout(){
            FB.logout(function(response){
                statusChangeCallback(response)
                localStorage.clear()
            })
            localStorage.clear()
            window.location="index.html"  
        },
        updateTask(taskId, task, dueDate, status){
            let token = localStorage.getItem('token')
            if(token){
                axios.put(`http://localhost:3000/tasks/edit/${taskId}`, {
                    task : task,
                    dueDate: dueDate,
                    status: status
                }, {
                    headers : {
                        token: localStorage.getItem("token"),
                    }
                })
                .then(editTask => {
                    // console.log('berhasil edit data kah?', editTask)
                    alert('Update successfully!')
                    this.getTasks()
                })
                .catch(err => {
                    console.log('Failed to edit this task!')
                })
            }
        }

    }
})