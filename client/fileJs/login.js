let vm = new Vue({
    el: '#app',
    data: {
        name: '',
        email: '',
        password: '',
        userLogin: '',
        username: ''
    },
    created (){
        let token = localStorage.getItem('token')
        // this.username = localStorage.getItem("name")
        // console.log(this.username)
        if(token){
            window.location.href ="user.html"
        }
    },
    methods: {
        register(){
            localStorage.removeItem('token')
            window.location='register.html'
        },
        login(){
            localStorage.removeItem('token')
            axios.post('http://35.198.242.177/users/login', {
                email: this.email,
                password: this.password
            })
            .then(user => {
                // console.log("=====user di login axios ",user)
                if(user !== null){
                    this.userLogin = user 
                    // console.log("------ ini user login",this.userLogin);
                    
                    localStorage.setItem('token', user.data.token)
                    // localStorage.setItem('name', user.data.name)
                    // this.username = localStorage.getItem('name')
                    // console.log("-------> username",this.username);
                    
                    window.location='user.html'
                } else {
                    console.log('Wrong email/password!')
                }
            })
            .catch(err => [
                console.log(err)
            ])
        }
    }
})