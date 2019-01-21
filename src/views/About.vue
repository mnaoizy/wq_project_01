<template>
<div class="about">
  <ul>
    <li v-for="user in users">
      {{user}} <button @click="deleteUser(user._id)">Delete</button>
    </li>
  </ul>

  <button @click="addUser">Add</button>
  <input type="text" v-model="input.name">
  <input type="text" v-model="input.age">
  {{message}}
</div>
</template>

<script>


export default { 
    data(){
      return {
        users: [],
        input: {
          name: '',
          age: ''
        },
        message: '',
      }
    },
    methods: {
      fetchUsers(){
        this.$apiService.get('users').then((item)=>{
          this.users = item
        })
      },
      addUser(){
        this.$apiService.add('users', this.input).then((e)=>{
          this.fetchUsers()
          console.log(e)
        }).catch((e)=>{
          console.log(e)
          this.message = e
        })
      },
      deleteUser(user_id){
        this.$apiService.delete('users', user_id).then(()=>{
          this.fetchUsers()
        })
      }
    },
    mounted(){
      this.fetchUsers()
    }
}
</script>

<style>

</style>
