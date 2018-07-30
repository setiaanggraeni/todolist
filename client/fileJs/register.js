let vw = new Vue({
    el: '#app',
    data: {
        name: '',
        email: '',
        password: ''
    },
    methods: {
        register(){
            axios.post('http://localhost:3000/users/register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            .then(user => {
                console.log(user)
                alert('Thank you for register, please login to create your to do list! ')
                window.location='index.html'
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})